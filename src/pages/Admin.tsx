import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Admin.css";
import Label from "../components/Label";
import { CATEGORIES } from "../utils/constants";
import { Product } from "../types/type";
import useFetchSession from "../hooks/useFetchSession";
import Edit from "../components/admin/Edit";
import Delete from "../components/admin/Delete";
import Create from "../components/admin/Create";
import useSupabaseClient from "../hooks/useSupabaseClient";
const LABEL_EDIT = "edit";
const LABEL_DELETE = "delete";
const LABEL_CREATE = "create";

type ModalType = typeof LABEL_EDIT | typeof LABEL_DELETE | typeof LABEL_CREATE;

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [selectedProdut, setSelectedProduct] = useState<Product>();
  const [modalType, setModalType] = useState<ModalType>("edit");

  const navigate = useNavigate();
  useFetchSession();

  const supabase = useSupabaseClient();

  const refreshAdmin = () => {
    fetchProducts();
  };

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error && data) setProducts(data as Product[]);
  }

  const toggleModal = () => {
    setIsModal(!isModal);
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

  const toCreateModal = (modalType: ModalType) => {
    toggleModal();
    setModalType(modalType);
  };

  const toModal = (p: Product, modalType: ModalType) => {
    // navigate("/admin/edit", { state: { p } });
    toggleModal();
    setModalType(modalType);
    setSelectedProduct(p);
  };

  return (
    <div>
      <div className="admin">
        <button
          onClick={() => toCreateModal(LABEL_CREATE)}
          className="admin-button margin-right"
        >
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
                    onClick={() => toModal(p, LABEL_EDIT)}
                    className="admin-button"
                  >
                    {LABEL_EDIT}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => toModal(p, LABEL_DELETE)}
                    className="admin-button"
                  >
                    {LABEL_DELETE}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {isModal && (
          <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content">
              {modalType === LABEL_EDIT && (
                <Edit
                  product={selectedProdut!}
                  toggleModal={toggleModal}
                  refreshAdmin={refreshAdmin}
                ></Edit>
              )}
              {modalType === LABEL_DELETE && (
                <Delete
                  product={selectedProdut!}
                  toggleModal={toggleModal}
                  refreshAdmin={refreshAdmin}
                ></Delete>
              )}
              {modalType === LABEL_CREATE && (
                <Create
                  toggleModal={toggleModal}
                  refreshAdmin={refreshAdmin}
                ></Create>
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
