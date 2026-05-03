create table public.users (
  id uuid primary key,
  name text not null,
  phone text not null,
  avatar_url text,
  punch_count integer not null default 0,
  total_punches integer not null default 10,
  qr_code text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.settings (
  id text primary key,
  stamp_type text not null,
  background_style text not null,
  card_style text,
  progress_style text not null,
  shop_name text not null,
  background_image_url text,
  accent_color text,
  welcome_message text,
  hero_badge text,
  reward_label text,
  deal_label text
);

create table public.notifications (
  id uuid primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  message text not null,
  read boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.push_subscriptions (
  id uuid primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  endpoint text unique not null,
  p256dh text not null,
  auth text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
