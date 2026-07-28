ALTER TABLE public.posts ADD COLUMN status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published'));

UPDATE public.posts SET status = 'published';

DROP POLICY IF EXISTS "Posts are publicly readable" ON public.posts;

CREATE POLICY "Published posts are publicly readable"
  ON public.posts FOR SELECT
  USING (status = 'published' OR auth.role() = 'service_role');