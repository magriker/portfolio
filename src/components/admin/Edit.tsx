import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CATEGORIES } from "../../constants";

const Edit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const location = useLocation();
  const product = location.state.p;

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

  return (
    <div>
      <form onSubmit={handnleEdit}>
        <div>
          <label>名前</label>
          <input
            type="text"
            defaultValue={product.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>説明</label>
          <textarea
            defaultValue={product.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>カテゴリー</label>
          <select
            defaultValue={product.category}
            onChange={(e) => setCategory(+e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option value={c.key} key={c.key}>
                {c.value}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Edit;
