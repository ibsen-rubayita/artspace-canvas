
REVOKE SELECT ON public.blog_likes FROM anon;
REVOKE SELECT ON public.blog_comments FROM anon;

DROP POLICY IF EXISTS "Anyone can view likes" ON public.blog_likes;
DROP POLICY IF EXISTS "Anyone can view comments" ON public.blog_comments;

CREATE POLICY "Authenticated can view likes" ON public.blog_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can view comments" ON public.blog_comments FOR SELECT TO authenticated USING (true);
