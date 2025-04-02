import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router";
import Label from "../Label";
import { CATEGORIES } from "../../constants";
import "../../Delete.css";

const Delete = () => {
  const location = useLocation();
  const product = location.state.p;
  const mainImgUrl = product.main_img_url;
  const subImg1Url1 = product.sub1_img_url;
  const subImg1Url2 = product.sub2_img_url;
  const subImg1Url3 = product.sub3_img_url;

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );
  const navigate = useNavigate();

  const handleDelete = async () => {
    await supabase.from("Products").delete().eq("id", product.id);
    await supabase.storage
      .from("Product_img")
      .remove(mainImgUrl.replace(import.meta.env.VITE_SUPABASE_IMG_URL, ""));

    await supabase.storage
      .from("Product_img")
      .remove(subImg1Url1.replace(import.meta.env.VITE_SUPABASE_IMG_URL, ""));
    await supabase.storage
      .from("Product_img")
      .remove(subImg1Url2.replace(import.meta.env.VITE_SUPABASE_IMG_URL, ""));
    await supabase.storage
      .from("Product_img")
      .remove(subImg1Url3.replace(import.meta.env.VITE_SUPABASE_IMG_URL, ""));

    // await supabase.storage.from("Product_img").remove();
    navigate("/admin");
  };

  return (
    <div>
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

      <p>Would you like to delete the date above?</p>
      <button onClick={handleDelete} className="admin-button">
        Delete
      </button>
    </div>
  );
};

export default Delete;
