import Label from "./Label";

export type keyValue = {
  key: number;
  value: string;
};

export type TabProps = {
  tabs: keyValue[];
};

const Sortingtag: React.FC<TabProps> = ({ tabs }) => {
  const handleClick = (tab: keyValue) => {
    console.log(tab.key);
  };

  return (
    <div className="">
      {tabs.map((tab) => (
        <a onClick={() => handleClick(tab)} key={tab.key} className="">
          <Label size="s" hover>
            {tab.value}
          </Label>
        </a>
      ))}
    </div>
  );
};

export default Sortingtag;
