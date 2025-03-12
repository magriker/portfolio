import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CATEGORIES } from "../../constants";
import "../../Edit.css";
import Label from "../Label";
import { v4 } from "uuid";

const Edit = () => {
  const location = useLocation();
  const product = location.state.p;
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);

  const [mainImgViewable, setMainImgViewable] = useState(product.main_img_url);
  const [mainImg, setMainImg] = useState(null);

  const [subImg1Viewable, setSubImg1Viewable] = useState(product.sub1_img_url);
  const [subImg1, setSubImg1] = useState(null);

  const [subImg2Viewable, setSubImg2Viewable] = useState(product.sub2_img_url);
  const [subImg2, setSubImg2] = useState(null);

  const [subImg3Viewable, setSubImg3Viewable] = useState(product.sub3_img_url);
  const [subImg3, setSubImg3] = useState(null);

  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const supabaseImageUrl =
    "https://cvlwnazscqnftpfwhsac.supabase.co/storage/v1/object/public/Product_img/";
  const navigate = useNavigate();

  const handleStorageUpload = async (imgFile, originImgUrl) => {
    if (!imgFile) return;

    await supabase.storage
      .from("Product_img")
      .upload(imgFile.fileName, imgFile.file);

    if (!originImgUrl) return;

    await supabase.storage
      .from("Product_img")
      .remove(originImgUrl.replace(supabaseImageUrl, ""));
  };

  const handnleEdit = async (e: Event) => {
    e.preventDefault();

    await Promise.all([
      handleStorageUpload(mainImg, product.main_img_url),
      handleStorageUpload(subImg1, product.sub1_img_url),
      handleStorageUpload(subImg2, product.sub2_img_url),
      handleStorageUpload(subImg3, product.sub2_img_url),
    ]);
    await supabase
      .from("Products")
      .update({
        name,
        description,
        category,
        main_img_url: mainImg
          ? supabaseImageUrl + mainImg.fileName
          : product.main_img_url,
        sub1_img_url: subImg1
          ? supabaseImageUrl + subImg1.fileName
          : product.sub1_img_url,
        sub2_img_url: subImg2
          ? supabaseImageUrl + subImg2.fileName
          : product.sub2_img_url,
        sub3_img_url: subImg3
          ? supabaseImageUrl + subImg3.fileName
          : product.sub3_img_url,
      })
      .eq("id", product.id);

    navigate("/admin");
  };

  const handleBack = () => {
    navigate("/admin");
  };

  const handleUpload = (e, setImgViewable, setImg) => {
    const imgFile = e.target.files[0];
    const imgFileName = `${v4()}-${imgFile.name}`;
    setImgViewable(URL.createObjectURL(imgFile));
    setImg({ file: imgFile, fileName: imgFileName });
  };

  return (
    <div>
      <div className="edit-container">
        <a onClick={() => handleBack()}>
          <span className="arrow">&larr;</span>
          <Label size="s" hover>
            back
          </Label>
        </a>
        <form onSubmit={handnleEdit}>
          <div className="product-name">
            <Label size="s" bold>
              Name:
            </Label>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="description">
            <Label size="s" bold>
              Description:
            </Label>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="category">
            <Label size="s" bold>
              Category:
            </Label>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(+e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option value={c.key} key={c.key}>
                    {c.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="main-img">
            <Label size="s" bold>
              Main Image:
            </Label>
            <input
              type="file"
              onChange={(e) => handleUpload(e, setMainImgViewable, setMainImg)}
            />
            <img src={mainImgViewable} alt="" />
          </div>
          <div className="sub-imgs">
            <Label size="s" bold>
              Sub Images:
            </Label>
            <div>
              <Label size="s">Sub image 1:</Label>
              <input
                type="file"
                onChange={(e) =>
                  handleUpload(e, setSubImg1Viewable, setSubImg1)
                }
              />
              <img src={subImg1Viewable} alt="" className="subImg1" />
            </div>
            <div>
              <Label size="s">Sub image 2:</Label>
              <input
                type="file"
                onChange={(e) =>
                  handleUpload(e, setSubImg2Viewable, setSubImg2)
                }
              />
              <img src={subImg2Viewable} alt="" className="subImg2" />
            </div>
            <div>
              <Label size="s">Sub image 3:</Label>
              <input
                type="file"
                onChange={(e) =>
                  handleUpload(e, setSubImg3Viewable, setSubImg3)
                }
              />
              <img src={subImg3Viewable} alt="" className="subImg3" />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
