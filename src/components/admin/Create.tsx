import { useState } from "react";
import { CATEGORIES } from "../../constants";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { FileUploader } from "react-drag-drop-files";
import { v4 } from "uuid";
import Label from "../Label";
import "../../Create.css";

const fileTypes = ["JPG", "PNG", "GIF"];
const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
const supabase = createClient(supabaseUrl, supabaseKey);

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePath, setimagePath] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (imageFile) {
      const { error } = await supabase.storage
        .from("Product_img")
        .upload(imagePath, imageFile);
      if (error) {
        console.log(error);
        return;
      }
    }

    const url = await supabase.storage
      .from("Product_img")
      .getPublicUrl(imagePath).data.publicUrl;

    console.log(url);

    await supabase.from("Products").insert({
      name,
      description,
      category,
      main_img_url: url,
    });

    navigate("/admin");
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const path = `${v4()}-${file.name}`;
    setimagePath(path);
    console.log(path);

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (file) => {
    setFile(file);
    console.log(file);
  };

  return (
    <div className="create">
      <p className="create-title">
        <label>
          <Label size="l" bold>
            Register
          </Label>
        </label>
      </p>
      <form onSubmit={handleSubmit} className="create-form">
        <div className="name-form">
          <label>
            <Label size="s">Name</Label>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="description-form">
          <label>
            <Label size="s">Description</Label>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="category-form">
          <label>
            <Label size="s">Category</Label>
          </label>
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
        <div>
          <label>ファイル</label>
          <input type="file" onChange={handleUpload} />
          <img src={image} alt="" width={100} />
        </div>

        <div className="file-drop">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple
          ></FileUploader>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Create;
