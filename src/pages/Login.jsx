import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    alert("Login success ✅");
  } catch (err) {
    alert("Login failed ❌");
  }
};
  return (
    <div className="flex flex-col items-center mt-20 gap-3">
      <input
  placeholder="Email"
  className="border p-2 w-full mb-3 rounded"
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  placeholder="Password"
  className="border p-2 w-full mb-4 rounded"
  onChange={(e) => setPassword(e.target.value)}
/>
      <button
  onClick={handleLogin}
  className="bg-blue-600 text-white w-full py-2 rounded-lg"
>
  Login
</button>
    </div>
  );
}