import Tab from "./Tab";
import "../tab.css";

const Sorting = () => {
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
      <div className="product-box"></div>
    </>
  );
};

export default Sorting;
