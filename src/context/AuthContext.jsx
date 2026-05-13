import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ================= LOAD USER =================

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      const storedToken =
        localStorage.getItem("token");

      if (
        storedUser &&
        storedToken
      ) {
        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);

        setToken(storedToken);
      }
    } catch (error) {
      console.log(
        "Auth Load Error:",
        error.message
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );

      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= LOGIN =================

  const login = (data) => {
    try {
      /*
        Backend response formats:

        1.
        {
          token,
          user: {
            _id,
            name,
            email,
            role
          }
        }

        2.
        {
          token,
          _id,
          name,
          email,
          role
        }
      */

      const loginToken =
        data?.token;

      const loginUser =
        data?.user
          ? data.user
          : {
              _id: data?._id,
              name: data?.name,
              email: data?.email,
              role:
                data?.role ||
                "user",
            };

      if (
        !loginToken ||
        !loginUser
      ) {
        console.log(
          "Invalid login data"
        );
        return;
      }

      // update state
      setUser(loginUser);

      setToken(loginToken);

      // save storage
      localStorage.setItem(
        "user",
        JSON.stringify(loginUser)
      );

      localStorage.setItem(
        "token",
        loginToken
      );

      console.log(
        "✅ Login success"
      );

      console.log(
        "Logged user:",
        loginUser
      );
    } catch (error) {
      console.log(
        "Login Context Error:",
        error.message
      );
    }
  };

  // ================= LOGOUT =================

  const logout = () => {
    try {
      setUser(null);

      setToken(null);

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "rememberMe"
      );

      console.log(
        "✅ Logout success"
      );
    } catch (error) {
      console.log(
        "Logout Error:",
        error.message
      );
    }
  };

  // ================= VALUES =================

  const value = {
    user,
    token,
    login,
    logout,
    loading,

    isAuthenticated:
      !!user && !!token,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}