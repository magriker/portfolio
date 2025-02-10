import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Label from "./Label";
import "../Details.css";

const Details = () => {
  const location = useLocation();
  const product = location.state.product;
  const productId = product.id;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="backbutton">
        <a onClick={() => handleBack()}>
          <span className="arrow">&larr;</span>
          <Label size="s" bold hover>
            {" "}
            back
          </Label>
        </a>
      </div>
      <div className="detail-box">
        <div className="product-name">
          <Label size="l" bold>
            {product.name}
          </Label>
        </div>
        <div className="product-pictures"></div>
        <div className="detailed-explanation">{product.description}</div>
      </div>
    </>
  );
};

export default Details;
