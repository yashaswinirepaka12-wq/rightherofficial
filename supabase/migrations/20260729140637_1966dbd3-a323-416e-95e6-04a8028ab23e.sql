-- Remove existing invalid rows (defensive) then add validation
UPDATE public.subscribers SET active = false
WHERE email ~ '[\r\n]' OR email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

ALTER TABLE public.subscribers
  ADD CONSTRAINT subscribers_email_format_chk
  CHECK (
    email !~ '[\r\n]'
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 254
  );

DROP FUNCTION IF EXISTS public.unsubscribe_by_token(text);