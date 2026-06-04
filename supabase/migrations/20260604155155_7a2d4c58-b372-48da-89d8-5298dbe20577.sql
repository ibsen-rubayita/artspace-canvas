
CREATE TABLE public.blog_likes (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);
GRANT SELECT ON public.blog_likes TO anon, authenticated;
GRANT INSERT, DELETE ON public.blog_likes TO authenticated;
GRANT ALL ON public.blog_likes TO service_role;
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view likes" ON public.blog_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON public.blog_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.blog_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_comments TO anon, authenticated;
GRANT INSERT, DELETE ON public.blog_comments TO authenticated;
GRANT ALL ON public.blog_comments TO service_role;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view comments" ON public.blog_comments FOR SELECT USING (true);
CREATE POLICY "Users can comment" ON public.blog_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.blog_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX blog_likes_post_idx ON public.blog_likes (post_id);
CREATE INDEX blog_comments_post_idx ON public.blog_comments (post_id, created_at DESC);
