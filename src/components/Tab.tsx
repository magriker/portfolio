import Label from "./Label";
import "../tab.css";

export type keyValue = {
  key: number;
  value: string;
};

export type TabProps = {
  tabs: keyValue[];
  setCategory?: (tab: number) => void;
  onScroll?: (sectionname: string) => void;
};

const Tab: React.FC<TabProps> = ({ tabs, setCategory, onScroll }) => {
  const handleClick = (tab: keyValue) => {
    if (typeof setCategory === "function") {
      setCategory(tab.key);
    }

    if (typeof onScroll === "function") {
      onScroll(tab.value);
    }
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
