import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router";
import Label from "../Label";
import "../../Admin.css";
import { useEffect, useState } from "react";

const Delete = () => {
  const location = useLocation();
  const product = location.state.p;
  const url = product.main_img_url;
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
      .remove(url.replace(supabaseImageUrl, ""));

    // await supabase.storage.from("Product_img").remove();
    navigate("/admin");
  };

  return (
    <div>
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
                description
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                category
              </Label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <Label size="m">{product.id}</Label>
            </th>
            <th>
              <Label size="m">{product.name}</Label>
            </th>
            <th>
              <Label size="m">{product.description}</Label>
            </th>
            <th>
              <Label size="m">{product.category}</Label>
            </th>
          </tr>
        </tbody>
      </table>

      <p>Would you like to delete the date above?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
