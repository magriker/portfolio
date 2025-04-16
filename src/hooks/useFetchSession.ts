import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const useFetchSession = () => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );
  const navigate = useNavigate();

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data?.session) navigate("/admin/login", { replace: true });
    console.log("login", data);
  };

  useEffect(() => {
    fetchSession();
  }, []);
};

export default useFetchSession;
