import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    /*
      Backend response possible formats:

      1. { token, user: { name, email, role } }
      2. { token, name, email, role }
    */

    const loginToken = data?.token;

    const loginUser = data?.user
      ? data.user
      : {
          _id: data?._id,
          name: data?.name,
          email: data?.email,
          role: data?.role,
        };

    setUser(loginUser);
    setToken(loginToken);

    localStorage.setItem("user", JSON.stringify(loginUser));

    if (loginToken) {
      localStorage.setItem("token", loginToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}