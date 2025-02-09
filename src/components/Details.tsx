import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Label from "./Label";
import "../Details.css";

const Details = () => {
  const location = useLocation();
  const product = location.state.product;
  const productId = product.id;
  console.log(product);

  console.log(productId);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="backbutton">
        <a onClick={() => handleBack()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="arrow"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>

          <Label size="s"> back</Label>
        </a>
      </div>
      <div className="detail-box">
        <div className="product-name">
          <h1>Product{productId}</h1>
        </div>
        <div className="product-pictures"></div>
        <div className="detailed-explanation">{product.description}</div>
      </div>
    </>
  );
};

export default Details;
