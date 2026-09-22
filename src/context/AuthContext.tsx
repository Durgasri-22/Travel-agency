import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ProfileDB } from '../types/admin';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  checkAdminRole: (user: User) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const isConfigured = isSupabaseConfigured();

  const checkAdminRole = async (currentUser: User): Promise<boolean> => {
    if (!isConfigured || !currentUser) return false;

    try {
      // 1. Retrieve the user's admin profile from the Supabase profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, email, role')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching admin profile from Supabase:', error.message);
        // If profiles table query fails, also verify if app_metadata/user_metadata contains role: 'admin'
        if (currentUser.app_metadata?.role === 'admin' || currentUser.user_metadata?.role === 'admin') {
          return true;
        }
        return false;
      }

      // 2. Strict verification that profile role === 'admin'
      if (profile && (profile as ProfileDB).role === 'admin') {
        return true;
      }

      // 3. Fallback check on user app_metadata if set in Supabase Auth
      if (currentUser.app_metadata?.role === 'admin') {
        return true;
      }

      return false;
    } catch (err) {
      console.error('Unexpected error checking admin role:', err);
      return false;
    }
  };

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Check active session on initial load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const adminStatus = await checkAdminRole(session.user);
        if (isMounted) {
          setIsAdmin(adminStatus);
        }
      } else {
        if (isMounted) {
          setIsAdmin(false);
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const adminStatus = await checkAdminRole(session.user);
        if (isMounted) {
          setIsAdmin(adminStatus);
        }
      } else {
        if (isMounted) {
          setIsAdmin(false);
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!isConfigured) {
      return {
        error: 'Supabase credentials are not configured. Please check your .env file.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (!data.user) {
        return { error: 'Authentication failed. Please check your credentials.' };
      }

      // Check admin authorization via profiles table
      const adminStatus = await checkAdminRole(data.user);
      if (!adminStatus) {
        // Sign out unauthorized user
        await supabase.auth.signOut();
        setIsAdmin(false);
        setUser(null);
        setSession(null);
        return {
          error: 'Access Denied: Your account is not authorized as an Administrator for Sri Guru Tours and Travels.',
        };
      }

      setUser(data.user);
      setSession(data.session);
      setIsAdmin(true);
      return { error: null };
    } catch (err: unknown) {
      const authErr = err as AuthError;
      return { error: authErr?.message || 'An unexpected error occurred during sign in.' };
    }
  };

  const signOut = async () => {
    if (isConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        isConfigured,
        signIn,
        signOut,
        checkAdminRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
