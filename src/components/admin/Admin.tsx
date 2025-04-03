import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Label from "../Label";
import "../../Admin.css";
import { CATEGORIES } from "../../constants";
import { Product } from "./type";

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error && data) setProducts(data as Product[]);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toCreatePage = () => {
    navigate("/admin/create");
  };

  const toEditPage = (p: Product) => {
    navigate("/admin/edit", { state: { p } });
  };

  const toDeletePage = (p: Product) => {
    navigate("/admin/delete", { state: { p } });
  };

  return (
    <div>
      <button onClick={toCreatePage} className="admin-button">
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
                <button onClick={() => toEditPage(p)} className="admin-button">
                  edit
                </button>
              </th>
              <th>
                <button
                  onClick={() => toDeletePage(p)}
                  className="admin-button"
                >
                  delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
