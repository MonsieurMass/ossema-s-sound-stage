ALTER TABLE public.fan_subscribers
  ADD COLUMN consent_given BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN consent_at TIMESTAMP WITH TIME ZONE;

-- Require explicit consent on every new row
ALTER TABLE public.fan_subscribers
  ADD CONSTRAINT fan_subscribers_consent_required_check
    CHECK (consent_given = true AND consent_at IS NOT NULL);