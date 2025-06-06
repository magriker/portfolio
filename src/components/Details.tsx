import { useLocation, useNavigate } from "react-router";
import Label from "./Label";
import "../styles/Details.css";

const Details = () => {
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="detail-container">
        <div className="backbutton">
          <a onClick={() => handleBack()}>
            <span className="arrow">&larr;</span>
            <Label size="s" hover>
              back
            </Label>
          </a>
        </div>
        <div className="product-name">
          <Label size="l" bold>
            {product.name}
          </Label>
        </div>
        <div className="subimg-box">
          <img src={product.sub1_img_url} alt="subimg-1" className="subimg-1" />
          <div className="subimg-box-second">
            <div>
              <img
                src={product.sub2_img_url}
                alt="subimg-2"
                className="subimg-2"
              />
            </div>
            <div>
              <img
                src={product.sub3_img_url}
                alt="subimg-3"
                className="subimg-3"
              />
            </div>
          </div>
        </div>
        <div className="detailed-description-box">
          <div className="about">
            <Label size="s" bold>
              //about
            </Label>
          </div>
          <div className="description">
            <Label size="s">{product.description}</Label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
