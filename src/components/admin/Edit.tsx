import { ChangeEvent, useState } from "react";

import { CATEGORIES } from "../../utils/constants";
import "../../styles/Edit.css";
import Label from "../Label";
import { v4 } from "uuid";
import { ImageFileType, ModalProps } from "../../types/type";
import useFetchSession from "../../hooks/useFetchSession";
import useSupabaseClient from "../../hooks/useSupabaseClient";

const Edit: React.FC<ModalProps> = ({ product, toggleModal, refreshAdmin }) => {
  // const location = useLocation();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);

  const [mainImgViewable, setMainImgViewable] = useState(product.main_img_url);
  const [mainImg, setMainImg] = useState<ImageFileType>();

  const [subImg1Viewable, setSubImg1Viewable] = useState(product.sub1_img_url);
  const [subImg1, setSubImg1] = useState<ImageFileType>();

  const [subImg2Viewable, setSubImg2Viewable] = useState(product.sub2_img_url);
  const [subImg2, setSubImg2] = useState<ImageFileType>();

  const [subImg3Viewable, setSubImg3Viewable] = useState(product.sub3_img_url);
  const [subImg3, setSubImg3] = useState<ImageFileType>();

  const supabase = useSupabaseClient();

  useFetchSession();
  const handleStorageUpload = async (
    imgFile: ImageFileType | undefined,
    originImgUrl: string
  ) => {
    if (!imgFile) return;

    await supabase.storage
      .from("Product_img")
      .upload(imgFile.fileName, imgFile.file);

    if (!originImgUrl) return;

    await supabase.storage
      .from("Product_img")
      .remove([
        originImgUrl.replace(import.meta.env.VITE_SUPABASE_IMG_URL, ""),
      ]);
  };

  const handnleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await Promise.all([
      handleStorageUpload(mainImg, product.main_img_url),
      handleStorageUpload(subImg1, product.sub1_img_url),
      handleStorageUpload(subImg2, product.sub2_img_url),
      handleStorageUpload(subImg3, product.sub3_img_url),
    ]);
    await supabase
      .from("Products")
      .update({
        name,
        description,
        category,
        main_img_url: mainImg
          ? import.meta.env.VITE_SUPABASE_IMG_URL + mainImg.fileName
          : product.main_img_url,
        sub1_img_url: subImg1
          ? import.meta.env.VITE_SUPABASE_IMG_URL + subImg1.fileName
          : product.sub1_img_url,
        sub2_img_url: subImg2
          ? import.meta.env.VITE_SUPABASE_IMG_URL + subImg2.fileName
          : product.sub2_img_url,
        sub3_img_url: subImg3
          ? import.meta.env.VITE_SUPABASE_IMG_URL + subImg3.fileName
          : product.sub3_img_url,
      })
      .eq("id", product.id);

    toggleModal();
    refreshAdmin();
  };

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>,
    setImgViewable: (value: string) => void,
    setImg: (value: ImageFileType | undefined) => void
  ) => {
    const target = e.target;
    if (!target?.files?.length) return;
    const imgFile = target.files[0];
    const imgFileName = `${v4()}-${imgFile.name}`;
    setImgViewable(URL.createObjectURL(imgFile));
    setImg({ file: imgFile, fileName: imgFileName });
  };

  return (
    <div>
      <div className="edit-container">
        <p className="edit-title">
          <label>
            <Label size="l" bold>
              Edit
            </Label>
          </label>
        </p>

        <form onSubmit={handnleEdit}>
          <div className="product-name">
            <Label size="s" bold>
              Name:
            </Label>
            <div>
              <input
                type="text"
                value={name}
                maxLength={30}
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
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option value={c.key} key={c.key}>
                    {c.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mainimg">
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
          <button type="submit" className="admin-button margin">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
