CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.subscribers TO anon;
GRANT SELECT, UPDATE ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Subscribers can view their own row by email lookup" ON public.subscribers FOR SELECT USING (
  auth.role() = 'service_role' OR email = current_setting('request.jwt.claims', true)::json ->> 'email'
);

CREATE INDEX idx_subscribers_active ON public.subscribers(active);
CREATE INDEX idx_subscribers_email ON public.subscribers(email);

CREATE OR REPLACE FUNCTION public.update_subscribers_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON public.subscribers FOR EACH ROW EXECUTE FUNCTION public.update_subscribers_updated_at_column();