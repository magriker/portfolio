import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CATEGORIES } from "../../constants";
import "../../Edit.css";
import Label from "../Label";

const Edit = () => {
  const location = useLocation();
  const product = location.state.p;
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [mainImg, setMainImg] = useState(product.main_img_url);
  const [subImg1, setSubImg1] = useState(product.sub1_img_url);
  const [subImg2, setSubImg2] = useState(product.sub2_img_url);
  const [subImg3, setSubImg3] = useState(product.sub3_img_url);

  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const navigate = useNavigate();
  const handnleEdit = async (e: Event) => {
    e.preventDefault();
    await supabase
      .from("Products")
      .update({ name, description, category })
      .eq("id", product.id);

    navigate("/admin");
  };

  const handleBack = () => {
    navigate("/admin");
  };

  const handleUpload = () => {};

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
            <input type="file" onChange={handleUpload} />
            <img src={mainImg} alt="" />
          </div>
          <div className="sub-imgs">
            <Label size="s" bold>
              Sub Images:
            </Label>
            <div>
              <Label size="s">Sub image 1:</Label>
              <input type="file" onChange={handleUpload} />
              <img src={subImg1} alt="" className="subImg1" />
            </div>
            <div>
              <Label size="s">Sub image 2:</Label>
              <input type="file" onChange={handleUpload} />
              <img src={subImg2} alt="" className="subImg2" />
            </div>
            <div>
              <Label size="s">Sub image 3:</Label>
              <input type="file" onChange={handleUpload} />
              <img src={subImg3} alt="" className="subImg3" />
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
