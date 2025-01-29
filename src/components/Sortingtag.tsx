import Label from "./Label";

export type keyValue = {
  key: number;
  value: string;
};

export type TabProps = {
  tabs: keyValue[];
};

const Sortingtag: React.FC<TabProps> = ({ tabs }) => {
  const handleClick = (tab) => {
    console.log(tab.key);
  };

  return (
    <div className="">
      {tabs.map((tab) => (
        <div onClick={() => handleClick(tab)} key={tab.key}>
          <Label size="s" hover>
            {tab.value}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default Sortingtag;
