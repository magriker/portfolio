import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Label from "../Label";
import "../../Admin.css";
import { CATEGORIES } from "../../constants";
import { Product } from "./type";
import useFetchSession from "../../hooks/useFetchSession";
import Edit from "./Edit";
import Delete from "./Delete";
import Create from "./Create";

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

  const refreshAdmin = () => {
    window.location.reload();
  };

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
    toggleModal();
    selectedProdut("");
  };

  const toModal = (p: Product, modalType: string) => {
    const product = { ...p, modalType };

    // navigate("/admin/edit", { state: { p } });
    toggleModal();
    setSelectedProduct(product);
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
                    onClick={() => toModal(p, "edit")}
                    className="admin-button"
                  >
                    edit
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => toModal(p, "delete")}
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
              {selectedProdut?.modalType === "edit" ? (
                <Edit
                  product={selectedProdut}
                  toggleModal={toggleModal}
                  refreshAdmin={refreshAdmin}
                ></Edit>
              ) : selectedProdut?.modalType === "delete" ? (
                <Delete
                  product={selectedProdut}
                  toggleModal={toggleModal}
                  refreshAdmin={refreshAdmin}
                ></Delete>
              ) : selectedProdut === "" ? (
                <Create></Create>
              ) : (
                ""
              )}

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
