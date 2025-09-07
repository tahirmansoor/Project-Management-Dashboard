import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { useProjects } from "../context/ProjectsContext";

const STATUS = ["Planning", "In Progress", "Blocked", "Completed"];

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, loading } = useProjects();

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      const found = projects.find((p) => p.id === Number(id));
      setProject(found || null);
    }
  }, [id, projects, loading]);

  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          Loading project details...
        </Typography>
      </Box>
    );
  }

  if (!project) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" color="error" gutterBottom>
          Project not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    );
  }

  const handleStatusChange = (e) => {
    const updated = { ...project, status: e.target.value };
    setProject(updated);
    updateProject(id, updated);
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card
        elevation={4}
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <CardContent>
          {/*  ========== Title  ========== */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "medium", color: "primary.main" }}
          >
            {project.title}
          </Typography>

          {/*  ========== Description  ========== */}
          <Typography variant="body1" color="text.secondary" paragraph>
            {project.description}
          </Typography>

          <Divider sx={{ my: 2 }}>
            <Chip label="Details" color="primary" size="small" />
          </Divider>

          {/*  ========== Info  ========== */}
          <Typography variant="body1" gutterBottom>
            <b>Owner:</b> {project.owner}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Created At:</b>{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </Typography>

          {/*  ========== Status Select   ==========*/}
          <Box mt={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={project.status}
                onChange={handleStatusChange}
                label="Status"
              >
                {STATUS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* ========== Actions  ========== */}
          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
