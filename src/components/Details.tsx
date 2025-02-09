import { useParams } from "react-router";

const Details = () => {
  const productId = useParams().productId;
  console.log(productId);

  return (
    <>
      <div className="backbutton"></div>
      <div className="detail-box">
        <h1>{`Product ${productId}`} </h1>
        <div className="product-name"></div>
        <div className="product-pictures"></div>
        <div className="detailed-explanation"></div>
      </div>
    </>
  );
};

export default Details;
