import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router";
import Label from "../Label";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../../constants";
import "../../Delete.css";

const Delete = () => {
  const location = useLocation();
  const product = location.state.p;
  const mainImgUrl = product.main_img_url;
  const subImg1Url1 = product.sub1_img_url;
  const subImg1Url2 = product.sub2_img_url;
  const subImg1Url3 = product.sub3_img_url;

  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseImageUrl =
    "https://cvlwnazscqnftpfwhsac.supabase.co/storage/v1/object/public/Product_img/";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await supabase.from("Products").delete().eq("id", product.id);
    await supabase.storage
      .from("Product_img")
      .remove(mainImgUrl.replace(supabaseImageUrl, ""));

    await supabase.storage
      .from("Product_img")
      .remove(subImg1Url1.replace(supabaseImageUrl, ""));
    await supabase.storage
      .from("Product_img")
      .remove(subImg1Url2.replace(supabaseImageUrl, ""));
    await supabase.storage
      .from("Product_img")
      .remove(subImg1Url3.replace(supabaseImageUrl, ""));

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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
