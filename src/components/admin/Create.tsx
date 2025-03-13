import { useEffect, useState } from "react";
import { CATEGORIES } from "../../constants";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { FileUploader } from "react-drag-drop-files";
import { v4 } from "uuid";
import Label from "../Label";
import "../../Create.css";
import "tailwindcss";

const fileTypes = ["JPG", "PNG", "GIF"];
const supabaseImageUrl =
  "https://cvlwnazscqnftpfwhsac.supabase.co/storage/v1/object/public/Product_img/";
const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
const supabase = createClient(supabaseUrl, supabaseKey);

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImageName, setMainImageName] = useState("");
  const [subImages, setSubImages] = useState([]);
  const [subImagefiles, setSubImageFiles] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (mainImageFile) {
      const { error } = await supabase.storage
        .from("Product_img")
        .upload(mainImageName, mainImageFile);
      if (error) {
        console.log(error);
        return;
      }
    }

    if (subImagefiles.length) {
      subImagefiles.map(async (subimgfile) => {
        console.log("test:", subimgfile);
        const { error } = await supabase.storage
          .from("Product_img")
          .upload(subimgfile.fileName, subimgfile.file);
        if (error) {
          console.log(error);
          return;
        }
      });
    }

    await supabase.from("Products").insert({
      name,
      description,
      category,
      main_img_url: supabaseImageUrl + mainImageName,
      sub1_img_url:
        subImagefiles.length >= 1
          ? supabaseImageUrl + subImagefiles[0].fileName
          : "",
      sub2_img_url:
        subImagefiles.length >= 2
          ? supabaseImageUrl + subImagefiles[1].fileName
          : "",
      sub3_img_url:
        subImagefiles.length >= 3
          ? supabaseImageUrl + subImagefiles[2].fileName
          : "",
    });

    navigate("/admin");
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setMainImageFile(file);
    const fileName = `${v4()}-${file.name}`;
    setMainImageName(fileName);

    if (file) {
      setMainImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (file) => {
    if (subImages.length > 2) {
      alert("You can upload only 3 sub image files ");
      return;
    }

    const subimage = file[0];
    const subImgName = `${v4()}-${subimage.name}`;
    const imgobject = { file: subimage, fileName: subImgName };
    setSubImageFiles([...subImagefiles, imgobject]);
    setSubImages([...subImages, URL.createObjectURL(subimage)]);
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
        <div className="mainImg-drop-box">
          <label>
            <Label size="s">Main image file</Label>
          </label>
          <input type="file" onChange={handleUpload} />
          <img src={mainImage} alt="" width={200} />
        </div>

        <div className="subImg-drop-box">
          <label>
            <Label size="s">Sub image files</Label>
          </label>
          <div className="uploader">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              multiple
            >
              <p className="underline">Drop Here!!</p>
            </FileUploader>
            {subImages?.map((subimg, index) => (
              <img src={subimg} className="dropped-img" key={index}></img>
            ))}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Create;
