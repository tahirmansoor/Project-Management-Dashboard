import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectsList from "./pages/ProjectsList";
import Analytics from "./pages/Analytics";
import { ProjectsProvider } from "./context/ProjectsContext";
import About from "./pages/About";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth === "true") {
      setIsAuth(true);
    }
  }, []);

  return (
    <ProjectsProvider>
      {/*  ========== Header always visible  */}
      <Header setIsAuth={setIsAuth} />

      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuth={setIsAuth} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/projects"
          element={isAuth ? <ProjectsList /> : <Navigate to="/" replace />}
        />
        <Route
          path="/projects/:id"
          element={isAuth ? <ProjectDetails /> : <Navigate to="/" replace />}
        />
        <Route
          path="/analytics"
          element={isAuth ? <Analytics /> : <Navigate to="/" replace />}
        />


        <Route path="/about" element={<About />} />
      </Routes>
    </ProjectsProvider>
  );
};

export default App;
