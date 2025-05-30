import { createClient } from "@supabase/supabase-js";

const useSupabaseClient = () => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  return supabase;
};

export default useSupabaseClient;
