CREATE TABLE public.fan_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  artist TEXT NOT NULL DEFAULT 'ossema',
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fan_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert their email)
CREATE POLICY "Anyone can subscribe to fan list"
ON public.fan_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read - emails are private to the label admin
-- (Admin will read via service role from Lovable Cloud dashboard)