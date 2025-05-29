import Tab from "./Tab";
import "../tab.css";
import "../Sorting.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { CATEGORIES_LABEL } from "../constants";
import { Product } from "./admin/type";

const Sorting = () => {
  const navigate = useNavigate();
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const [products, setProducts] = useState<Product[]>();
  const [category, setCategory] = useState(1);

  const filteredProducts =
    category === 1
      ? products
      : products?.filter((product) => Number(product.category) === category);

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

  const toDetaliPage = (product: Product, productId: number | undefined) => {
    navigate(`/details/:${productId}`, { state: { product } });
  };

  return (
    <>
      <Tab setCategory={setCategory} tabs={CATEGORIES_LABEL}></Tab>

      <div className="product-box">
        {filteredProducts?.map((product) => (
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
