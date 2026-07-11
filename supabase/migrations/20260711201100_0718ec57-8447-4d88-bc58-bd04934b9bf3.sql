CREATE OR REPLACE FUNCTION public.unsubscribe_by_token(p_token TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  found_row BOOLEAN;
BEGIN
  UPDATE public.subscribers
  SET active = false
  WHERE unsubscribe_token = p_token;

  GET DIAGNOSTICS found_row = ROW_COUNT;
  RETURN found_row > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.unsubscribe_by_token(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.unsubscribe_by_token(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.unsubscribe_by_token(TEXT) TO service_role;