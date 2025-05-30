import { ChangeEvent, useState } from "react";
import { CATEGORIES } from "../../constants";
import { FileUploader } from "react-drag-drop-files";
import { v4 } from "uuid";
import Label from "../Label";
import "../../Create.css";
import "tailwindcss";
import { BaseModalProps, ImageFileType } from "./type";
import useFetchSession from "../../hooks/useFetchSession";
import useSupabaseClient from "../../hooks/useSupabaseClient";

const fileTypes = ["JPG", "PNG", "GIF"];

const Create: React.FC<BaseModalProps> = ({ toggleModal, refreshAdmin }) => {
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [mainImage, setMainImage] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File>();
  const [mainImageName, setMainImageName] = useState("");
  const [subImages, setSubImages] = useState<string[]>([]);
  const [subImagefiles, setSubImageFiles] = useState<ImageFileType[]>([]);
  useFetchSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      main_img_url: import.meta.env.VITE_SUPABASE_IMG_URL + mainImageName,
      sub1_img_url:
        subImagefiles.length >= 1
          ? import.meta.env.VITE_SUPABASE_IMG_URL + subImagefiles[0].fileName
          : "",
      sub2_img_url:
        subImagefiles.length >= 2
          ? import.meta.env.VITE_SUPABASE_IMG_URL + subImagefiles[1].fileName
          : "",
      sub3_img_url:
        subImagefiles.length >= 3
          ? import.meta.env.VITE_SUPABASE_IMG_URL + subImagefiles[2].fileName
          : "",
    });

    toggleModal();
    refreshAdmin();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (!target?.files?.length) return;
    const file = target.files[0];
    setMainImageFile(file);
    const fileName = `${v4()}-${file.name}`;
    setMainImageName(fileName);

    if (file) {
      setMainImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (file: FileList) => {
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
        <button type="submit" className="admin-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Create;
