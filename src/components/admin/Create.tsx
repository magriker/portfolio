import { useState } from "react";
import { CATEGORIES } from "../../constants";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { v4 } from "uuid";

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (imageFile) {
      const filePath = `${v4()}-${imageFile.name}`;
      console.log(filePath);
      const { error } = await supabase.storage
        .from("Product_img")
        .upload(filePath, imageFile);
      if (error) {
        console.log(error);
      } else {
        const { data } = await supabase.storage
          .from("Product_img")
          .getPublicUrl(filePath);
        console.log(data);

        const url = data.publicUrl;
        setImageUrl(url);
        console.log(url);
      }
    }

    console.log(imageUrl);

    await supabase
      .from("Products")
      .insert({ name, description, category, main_img_url: imageUrl });

    navigate("/admin");
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>説明</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>カテゴリー</label>
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
        <button type="submit">編集</button>
      </form>
    </div>
  );
};

export default Create;
