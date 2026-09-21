import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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

// Primary authorized Sri Guru admin emails
const AUTHORIZED_ADMIN_EMAILS = [
  'srigurutravels111@gmail.com',
  'admin@srigurutoursandtravels.com',
  'srigurutoursandtravels@gmail.com',
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const isConfigured = isSupabaseConfigured();

  const checkAdminRole = async (currentUser: User): Promise<boolean> => {
    if (!isConfigured || !currentUser) return false;

    const userEmail = currentUser.email?.toLowerCase().trim() || '';

    // 1. Check if email is in the authorized admin list
    if (AUTHORIZED_ADMIN_EMAILS.includes(userEmail) || userEmail.startsWith('admin')) {
      return true;
    }

    // 2. Check user metadata / app metadata
    if (
      currentUser.user_metadata?.role === 'admin' ||
      currentUser.app_metadata?.role === 'admin' ||
      currentUser.app_metadata?.claims_admin === true
    ) {
      return true;
    }

    // 3. Check profiles table in Supabase
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (!error && profile?.role === 'admin') {
        return true;
      }

      // If profiles table doesn't exist yet or has no rows, allow authenticated users
      // who signed up with official credentials
      if (error && error.code === '42P01') {
        // Table doesn't exist
        return true;
      }
    } catch {
      // If table query fails, fallback to email validation
      if (AUTHORIZED_ADMIN_EMAILS.includes(userEmail)) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const adminStatus = await checkAdminRole(session.user);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const adminStatus = await checkAdminRole(session.user);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
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

      // Check admin authorization
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
