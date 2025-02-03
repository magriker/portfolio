import Tab from "./Tab";

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
    </>
  );
};

export default Sorting;
