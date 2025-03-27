import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Label from "../Label";
import "../../Admin.css";
import { CATEGORIES } from "../../constants";

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
      .from("Products")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const toCreatePage = () => {
    navigate("/admin/create");
  };

  const toEditPage = (p: object) => {
    navigate("/admin/edit", { state: { p } });
  };

  const toDeletePage = (p: object) => {
    navigate("/admin/delete", { state: { p } });
  };

  return (
    <div>
      <button onClick={toCreatePage} className="button">
        Register
      </button>
      <table className="content-table">
        <thead>
          <tr>
            <th>
              <Label size="m" bold white>
                id
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                name
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                category
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                edit
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                Delete
              </Label>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <th>
                <Label size="s">{p.id}</Label>
              </th>
              <th>
                <Label size="s">{p.name}</Label>
              </th>
              <th>
                <Label size="s">
                  {CATEGORIES.find((c) => c.key === +p.category)?.value}
                </Label>
              </th>
              <th>
                <button onClick={() => toEditPage(p)} className="button">
                  edit
                </button>
              </th>
              <th>
                <button onClick={() => toDeletePage(p)} className="button">
                  delete
                </button>
              </th>
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
