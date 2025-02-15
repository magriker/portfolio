import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router";

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
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>description</th>
            <th>category</th>
          </tr>
          <tr>
            <th>{product.id}</th>
            <th>{product.name}</th>
            <th>{product.description}</th>
            <th>{product.category}</th>
          </tr>
        </tbody>
      </table>

      <p>Would you like to delete the date above?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Delete;
