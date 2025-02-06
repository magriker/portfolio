import "../App.css";
import Label from "./Label";
import Tab from "./Tab";
import "../Header.css";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const Header = () => {
  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [producs, setProducts] = useState([] as any[]);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("Producs")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(producs[0]?.main_img_url);

  return (
    <div className="header-container">
      <div className="intro-box">
        <div className="slogan">
          <Label size="l" bold>
            Hi, I am Sophie Bolinski
            <br />
          </Label>
          <Label size="l">
            an industrial designer
            <br />
            focusing on innovation and
            <br />
            prototyping. Based in Tokyo.
          </Label>
        </div>
        <nav className="navigation">
          <Tab
            tabs={[
              { key: 1, value: "work" },
              { key: 2, value: "about" },
              { key: 3, value: "content" },
            ]}
          ></Tab>
        </nav>
        <div className="language-box"></div>
        <img src={producs[0]?.main_img_url} alt="" />
      </div>
    </div>
  );
};

export default Header;
