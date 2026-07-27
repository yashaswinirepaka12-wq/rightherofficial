
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  publication_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.posts TO anon, authenticated;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are publicly readable"
  ON public.posts FOR SELECT
  USING (true);

CREATE POLICY "Only service role can insert posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update posts"
  ON public.posts FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can delete posts"
  ON public.posts FOR DELETE
  USING (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.update_posts_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_posts_updated_at_trigger
BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.update_posts_updated_at();

CREATE INDEX posts_publication_date_idx ON public.posts (publication_date DESC);
