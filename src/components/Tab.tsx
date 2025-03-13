import Label from "./Label";
import "../tab.css";

export type keyValue = {
  key: number;
  value: string;
};

export type TabProps = {
  tabs: keyValue[];
};

const Tab: React.FC<TabProps> = ({ tabs, setCategory }) => {
  const handleClick = (tab: keyValue) => {
    setCategory(tab.key);
    console.log(tab.key);
  };

  return (
    <div className="tag-box">
      {tabs.map((tab) => (
        <a onClick={() => handleClick(tab)} key={tab.key} className="tag">
          <Label size="s" hover>
            {tab.value}
          </Label>
        </a>
      ))}
    </div>
  );
};

export default Tab;
