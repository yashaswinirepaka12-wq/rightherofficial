DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Subscribers can view their own row by email lookup" ON public.subscribers;

CREATE POLICY "Public visitors can subscribe with a valid email" ON public.subscribers FOR INSERT WITH CHECK (email IS NOT NULL AND length(email) > 0);

CREATE POLICY "Only service role can list all subscribers" ON public.subscribers FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage subscriber status" ON public.subscribers FOR UPDATE USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');