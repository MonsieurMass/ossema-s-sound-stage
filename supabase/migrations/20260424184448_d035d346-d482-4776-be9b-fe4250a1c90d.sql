ALTER TABLE public.fan_subscribers
  ADD CONSTRAINT fan_subscribers_email_format_check
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND length(email) <= 254),
  ADD CONSTRAINT fan_subscribers_artist_check
    CHECK (artist IN ('ossema')),
  ADD CONSTRAINT fan_subscribers_source_length_check
    CHECK (source IS NULL OR length(source) <= 100);