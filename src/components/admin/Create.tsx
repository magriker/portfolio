import { useState } from "react";
import { CATEGORIES } from "../../constants";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { v4 } from "uuid";

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState(null);

  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    console.log("登録");
    await supabase.from("Products").insert({ name, description, category });
    navigate("/admin");
  };

  const handleUpload2 = async (e) => {
    const file = e.target.files[0];
    const filePath = `${v4()}-${file.name}`;
    console.log(filePath);
    console.log(file);
    const { data, error } = await supabase.storage
      .from("Product_img")
      .upload(filePath, file);
    if (error) {
      console.log(error.message);
    } else {
      const { data } = supabase.storage
        .from("Product_img")
        .getPublicUrl(filePath);
      setImgUrl(data.publicUrl);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
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
