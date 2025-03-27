import Tab from "./Tab";
import "../tab.css";
import "../Sorting.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { CATEGORIES_LABEL } from "../constants";

const Sorting = () => {
  console.log(import.meta.env.VITE_SUPABASE_URL);

  const navigate = useNavigate();
  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState([] as any[]);
  const [category, setCategory] = useState(1);

  const filteredProducts =
    category === 1
      ? products
      : products.filter((product) => Number(product.category) === category);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toDetaliPage = (product: object, productId: number) => {
    navigate(`/details/:${productId}`, { state: { product } });
  };

  console.log(filteredProducts);

  return (
    <>
      <Tab setCategory={setCategory} tabs={CATEGORIES_LABEL}></Tab>

      <div className="product-box">
        {filteredProducts.map((product) => (
          <a
            onClick={() => toDetaliPage(product, product.id)}
            key={product.id}
            className="product-link"
          >
            <img
              src={product.main_img_url}
              alt="main image"
              className="main-img"
            ></img>
          </a>
        ))}
      </div>
    </>
  );
};

export default Sorting;
