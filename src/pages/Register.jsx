import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({});

  const handleRegister = async () => {
    await API.post("/auth/register", form);
    alert("Registered! Now login");
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-3">
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}