-- ==========================================================
-- SRI GURU TOURS AND TRAVELS - COMPLETE SUPABASE DATABASE SCHEMA
-- ==========================================================

-- 1. Profiles Table (for Role-Based Authorization)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Policy: Authenticated users can read their own profile
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" 
  on public.profiles for select 
  to authenticated
  using (auth.uid() = id);

-- Policy: Admins can view all profiles
drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select 
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Auto-create/update profile trigger on user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    case 
      when lower(new.email) in ('srigurutravels111@gmail.com', 'admin@srigurutoursandtravels.com') then 'admin' 
      else 'user' 
    end
  )
  on conflict (id) do update 
    set email = excluded.email,
        role = case 
          when lower(excluded.email) in ('srigurutravels111@gmail.com', 'admin@srigurutoursandtravels.com') then 'admin' 
          else public.profiles.role 
        end,
        updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Ensure existing auth.users record for srigurutravels111@gmail.com has an admin profile
insert into public.profiles (id, email, role)
select id, email, 'admin'
from auth.users
where lower(email) = 'srigurutravels111@gmail.com'
on conflict (id) do update set role = 'admin', updated_at = now();

-- ==========================================================
-- 2. Tour Packages Table
-- ==========================================================
create table if not exists public.tour_packages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  state text not null,
  subtitle text,
  description text,
  places text[],
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tour_packages enable row level security;

create policy "Public can view active tour packages"
  on public.tour_packages for select
  using (is_active = true);

create policy "Admins can manage all tour packages"
  on public.tour_packages for all
  using (auth.role() = 'authenticated');

-- ==========================================================
-- 3. Vehicles & Fleet Table
-- ==========================================================
create table if not exists public.vehicles (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null,
  description text,
  image_url text,
  seating_capacity text,
  status text not null default 'Available', -- 'Available', 'Booked', 'Maintenance'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.vehicles enable row level security;

create policy "Public can view vehicles"
  on public.vehicles for select
  using (true);

create policy "Admins can manage vehicles"
  on public.vehicles for all
  using (auth.role() = 'authenticated');

-- ==========================================================
-- 4. Bookings Table (Supports Manual Admin Entry & Web Bookings)
-- ==========================================================
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  booking_reference text not null unique,
  customer_name text not null,
  phone text not null,
  email text,
  pickup_location text not null,
  destination text not null,
  travel_date text not null,
  return_date text,
  vehicle text,
  package_name text,
  passengers text,
  status text not null default 'Pending', -- 'Pending', 'Confirmed', 'Completed', 'Cancelled'
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.bookings enable row level security;

create policy "Admins can manage all bookings"
  on public.bookings for all
  using (auth.role() = 'authenticated');

-- ==========================================================
-- 5. Customer Enquiries Table
-- ==========================================================
create table if not exists public.enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text,
  route text,
  travel_date text,
  vehicle_required text,
  passengers text,
  message text,
  status text not null default 'New', -- 'New', 'Contacted', 'Resolved'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.enquiries enable row level security;

create policy "Public can create enquiries"
  on public.enquiries for insert
  with check (true);

create policy "Admins can manage enquiries"
  on public.enquiries for all
  using (auth.role() = 'authenticated');

-- ==========================================================
-- 6. Photo Gallery Table
-- ==========================================================
create table if not exists public.gallery (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  image_url text not null,
  category text not null default 'Fleet',
  description text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.gallery enable row level security;

create policy "Public can view active gallery items"
  on public.gallery for select
  using (is_active = true);

create policy "Admins can manage gallery items"
  on public.gallery for all
  using (auth.role() = 'authenticated');

-- ==========================================================
-- 7. Website Settings Table
-- ==========================================================
create table if not exists public.website_settings (
  id text primary key default 'default',
  company_name text not null default 'Sri Guru Tours and Travels',
  proprietor text default 'GOWRI .H',
  phone text default '+91 90035 74884',
  secondary_phone text default '+91 99529 70853',
  whatsapp text default '919003574884',
  email text default 'srigurutravels111@gmail.com',
  address text default 'No.93/3B1, Manikandan Flats, Door No. 1/195H, Plot no. B2, Flat No. S1, 2nd Floor, Tamizhan St, Vijayalakshmi Nagar 3rd Main Road, Nanmangalam, Chennai - 600 129.',
  instagram text default 'https://www.instagram.com/sriguru_toursandtravels/',
  youtube text default 'https://youtube.com/@srigurutoursandtravels111?si=LA8EZMlTXAamWv0h',
  facebook text default 'https://www.facebook.com/people/Sri-Guru-Tours-And-Travels/61578435493868/?rdid=8mNPtUajumn5kah7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BxWNVaHjb%2F',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.website_settings enable row level security;

create policy "Public can read website settings"
  on public.website_settings for select
  using (true);

create policy "Admins can update website settings"
  on public.website_settings for all
  using (auth.role() = 'authenticated');

-- Insert initial website settings row
insert into public.website_settings (id)
values ('default')
on conflict (id) do nothing;
