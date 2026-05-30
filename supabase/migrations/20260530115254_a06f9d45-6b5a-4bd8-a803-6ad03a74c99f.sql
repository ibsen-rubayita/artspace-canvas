
-- Restrict SECURITY DEFINER function execution
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Tighten the submissions insert policy
DROP POLICY "Anyone can submit" ON public.submissions;
CREATE POLICY "Anyone can submit with valid fields" ON public.submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(kind) BETWEEN 1 AND 64
    AND char_length(coalesce(email, '')) BETWEEN 3 AND 320
    AND char_length(coalesce(message, '')) <= 5000
    AND char_length(coalesce(name, '')) <= 200
    AND char_length(coalesce(subject, '')) <= 300
  );
