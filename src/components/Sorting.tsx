import Tab from "./Tab";
import "../tab.css";
import "../Sorting.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const Sorting = () => {
  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [producs, setProducts] = useState([] as any[]);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("Producs")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Tab
        tabs={[
          { key: 1, value: `all` },
          { key: 2, value: "Product" },
          { key: 3, value: "Packaging" },
          { key: 4, value: "Graphic" },
        ]}
      ></Tab>

      <div className="product-box">
        {producs.map((product) => (
          <img
            src={product.main_img_url}
            alt="main image"
            className="main-img"
            key={product.id}
          ></img>
        ))}
      </div>
    </>
  );
};

export default Sorting;
