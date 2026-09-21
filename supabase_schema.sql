-- ==========================================================
-- SRI GURU TOURS AND TRAVELS - SUPABASE DATABASE SCHEMA
-- ==========================================================

-- 1. Create Profiles table for Role-Based Authorization
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. RLS Policies
-- Allow users to view their own profile
create policy "Users can read own profile" 
  on public.profiles 
  for select 
  using (auth.uid() = id);

-- Allow admins full read access
create policy "Admins can view all profiles"
  on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 4. Trigger to automatically create a profile entry on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================================
-- HOW TO MAKE A USER AN ADMIN:
-- Replace 'admin@srigurutoursandtravels.com' with your actual Supabase auth user email
-- ==========================================================
-- update public.profiles
-- set role = 'admin'
-- where email = 'your-admin-email@example.com';
