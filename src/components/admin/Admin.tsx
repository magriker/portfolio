import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Admin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState([] as any[]);
  const navigate = useNavigate();

  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("Producs")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = () => {
    navigate("/admin/create");
  };

  return (
    <div>
      <button onClick={handleClick}>登録</button>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>name</th>
            {/* <th>created_at</th> */}

            {/* <th>main_img</th>
            <th>sub1_img</th>
            <th>sub2_img</th>
            <th>sub3_img</th>
            <th>category</th>
            <th>order</th>
            <th>description</th>
            <th>updated_at</th> */}
          </tr>
          {products.map((p) => (
            <tr>
              <th>{p.id}</th>
              <th>{p.name}</th>
              {/* <th>{p.created_at}</th> */}
              {/* <th>{p.main_img_url}</th>
              <th>{p.sub1_img_url}</th>
              <th>{p.sub2_img_url}</th>
              <th>{p.sub3_img_url}</th>
              <th>{p.category}</th>
              <th>{p.order}</th>
              <th>{p.description}</th>
              <th>{p.updated_at}</th> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
