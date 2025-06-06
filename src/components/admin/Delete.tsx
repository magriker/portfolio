// import { useLocation, useNavigate } from "react-router";
import Label from "../Label";
import { CATEGORIES } from "../../utils/constants";
import "../../styles/Delete.css";
import useFetchSession from "../../hooks/useFetchSession";
import { ModalProps } from "./type";
import useSupabaseClient from "../../hooks/useSupabaseClient";

const Delete: React.FC<ModalProps> = ({
  product,
  toggleModal,
  refreshAdmin,
}) => {
  const mainImgUrl = product.main_img_url;
  const subImg1Url1 = product.sub1_img_url;
  const subImg1Url2 = product.sub2_img_url;
  const subImg1Url3 = product.sub3_img_url;
  const supabase = useSupabaseClient();

  useFetchSession();
  const handleDelete = async () => {
    await supabase.from("Products").delete().eq("id", product.id);
    await supabase.storage
      .from("Product_img")
      .remove([mainImgUrl.replace(import.meta.env.VITE_SUPABASE_IMG_URL, "")]);

    await supabase.storage
      .from("Product_img")
      .remove([subImg1Url1.replace(import.meta.env.VITE_SUPABASE_IMG_URL, "")]);
    await supabase.storage
      .from("Product_img")
      .remove([subImg1Url2.replace(import.meta.env.VITE_SUPABASE_IMG_URL, "")]);
    await supabase.storage
      .from("Product_img")
      .remove([subImg1Url3.replace(import.meta.env.VITE_SUPABASE_IMG_URL, "")]);

    // await supabase.storage.from("Product_img").remove();
    toggleModal();
    refreshAdmin();
  };

  return (
    <div>
      <div className="delete">
        <p className="delete-title">
          <label>
            <Label size="l" bold>
              Delete
            </Label>
          </label>
        </p>
        <div className="card">
          <div className="card-top">
            <div className="id-box">
              <Label size="s">ID:</Label>
              <Label size="s" bold>
                {product.id}
              </Label>
            </div>
            <div className="name-box">
              <Label size="s">Name:</Label>
              <Label size="s" bold>
                {product.name}
              </Label>
            </div>
            <div className="category-box">
              <Label size="s">Category:</Label>
              <Label size="s" bold>
                {CATEGORIES.find((c) => c.key === +product.category)?.value}
              </Label>
            </div>
          </div>
          <div className="description-box">
            <p>
              <Label size="s">Description:</Label>
            </p>
            <div>{product.description}</div>
          </div>
          <div className="mainImg-box">
            <p>
              <Label size="s">Main Image:</Label>
            </p>
            <div className="mainImg">
              <img src={product.main_img_url} alt="" />
            </div>
          </div>
        </div>

        <p className="confirmation-text">
          Are you sure to delete the data above?
        </p>
        <button onClick={handleDelete} className="admin-button margin">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;
