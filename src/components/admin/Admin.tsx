import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Label from "../Label";
import "../../Admin.css";
import { CATEGORIES } from "../../constants";
import { Product } from "./type";
import useFetchSession from "../../hooks/useFetchSession";
import Edit from "./Edit";

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedProdut, setSelectedProduct] = useState<Product>();
  const navigate = useNavigate();
  useFetchSession();

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

  const toggleModal = () => {
    setModal(!modal);
  };

  // const fetchSession = async () => {
  //   const { data } = await supabase.auth.getSession();
  //   if (!data?.session) navigate("/admin/login", { replace: true });
  //   console.log("login", data);
  // };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  useEffect(() => {
    fetchProducts();
    // fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toCreatePage = () => {
    navigate("/admin/create");
  };

  const toEditModal = (p: Product) => {
    // navigate("/admin/edit", { state: { p } });
    toggleModal();
    setSelectedProduct(p);
  };

  const toDeletePage = (p: Product) => {
    navigate("/admin/delete", { state: { p } });
  };

  return (
    <div>
      <div className="admin">
        <button onClick={toCreatePage} className="admin-button margin-right">
          Register
        </button>
        <button onClick={handleSignOut} className="admin-button">
          Logout
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
                  <button
                    onClick={() => toEditModal(p)}
                    className="admin-button"
                  >
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
        {modal && (
          <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content">
              <Edit product={selectedProdut} toggleModal={toggleModal}></Edit>
              <button
                className="admin-button close-modal"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
