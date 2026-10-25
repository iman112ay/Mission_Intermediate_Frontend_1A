import { useEffect, useState } from "react";
import CourseCatalogPage from "./pages/CourseCatalogPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { courses } from "./data/courses.js";
import "./styles/home.css";
import "./styles/auth.css";

const USER_EMAIL_KEY = "videobelajar-user-email";
const USER_NAME_KEY = "videobelajar-user-name";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const [user, setUser] = useState(() => ({
    email: window.localStorage.getItem(USER_EMAIL_KEY) || "",
    name: window.localStorage.getItem(USER_NAME_KEY) || "",
  }));

  function signIn({ email, name }) {
    window.localStorage.setItem(USER_EMAIL_KEY, email);
    window.localStorage.setItem(USER_NAME_KEY, name);
    setUser({ email, name });
    const next = new URLSearchParams(window.location.search).get("next");
    const destination =
      next?.startsWith("/") && !next.startsWith("//") ? next : "/";
    window.location.href = destination;
  }

  function signOut() {
    window.localStorage.removeItem(USER_EMAIL_KEY);
    window.localStorage.removeItem(USER_NAME_KEY);
    setUser({ email: "", name: "" });
  }

  useEffect(() => {
    document.title =
      path === "/login"
        ? "Login - Videobelajar"
        : path === "/register"
          ? "Pendaftaran Akun - Videobelajar"
          : path === "/courses"
            ? "Katalog Kelas - Videobelajar"
            : path.startsWith("/courses/")
              ? "Detail Kelas - Videobelajar"
              : path === "/payment"
                ? "Pembayaran - Videobelajar"
            : "VideoBelajar — Platform Video Pembelajaran";
  }, [path]);

  useEffect(() => {
    if (path === "/payment" && !user.email) {
      const next = `${window.location.pathname}${window.location.search}`;
      window.location.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [path, user.email]);

  if (path === "/login") {
    return <LoginPage onLogin={signIn} />;
  }

  if (path === "/register") {
    return <RegisterPage onRegister={signIn} />;
  }

  if (path === "/courses") {
    return <CourseCatalogPage user={user} onLogout={signOut} />;
  }

  if (path.startsWith("/courses/")) {
    const courseId = Number(path.split("/")[2]);
    return (
      <CourseDetailPage
        course={courses.find((course) => course.id === courseId)}
        user={user}
        onLogout={signOut}
      />
    );
  }

  if (path === "/payment") {
    return <PaymentPage user={user} onLogout={signOut} />;
  }

  return <HomePage user={user} onLogout={signOut} />;
}
