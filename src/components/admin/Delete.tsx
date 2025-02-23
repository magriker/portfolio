import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router";
import Label from "../Label";
import "../../Admin.css";

const Delete = () => {
  const location = useLocation();
  const product = location.state.p;
  const supabaseUrl = "https://cvlwnazscqnftpfwhsac.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bHduYXpzY3FuZnRwZndoc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDY3MTgsImV4cCI6MjA1NDQyMjcxOH0.VmjcDRP04_5RklbY8DfCcWIzRMPFGlklQlRlJTdALoY";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await supabase.from("Products").delete().eq("id", product.id);
    navigate("/admin");
  };

  return (
    <div>
      <table className="content-table">
        <thead>
          <tr>
            <th>
              <Label size="m" bold white>
                id
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                name
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                description
              </Label>
            </th>
            <th>
              <Label size="m" bold white>
                category
              </Label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <Label size="m">{product.id}</Label>
            </th>
            <th>
              <Label size="m">{product.name}</Label>
            </th>
            <th>
              <Label size="m">{product.description}</Label>
            </th>
            <th>
              <Label size="m">{product.category}</Label>
            </th>
          </tr>
        </tbody>
      </table>

      <p>Would you like to delete the date above?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
