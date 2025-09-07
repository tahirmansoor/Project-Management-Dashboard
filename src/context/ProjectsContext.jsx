import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (projects.length > 0) return;

      const postsRes = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const usersRes = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const posts = await postsRes.json();
      const users = await usersRes.json();

      const statuses = ["Planning", "In Progress", "Blocked", "Completed"];
      const mapped = posts.map((p) => ({
        id: p.id, //  ========== numeric id  ==========
        title: p.title,
        description: p.body,
        owner: users.find((u) => u.id === p.userId)?.name || "Unknown",
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ),
      }));

      setProjects(mapped);
    };
    fetchProjects();
  }, []);

  const updateProject = (id, updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === Number(id) ? { ...p, ...updatedProject } : p))
    );
  };

  const createProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, updateProject, createProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
