import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useProjects } from "../context/ProjectsContext";

const STATUS = ["Planning", "In Progress", "Blocked", "Completed"];

export default function ProjectsList() {
  const { projects, createProject } = useProjects(); 
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [pagination, setPagination] = useState({ page: 0, pageSize: 5 });

  //  ========== Dialog state  ==========
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    owner: "",
    status: "Planning",
    description: "",
  });
  const [errors, setErrors] = useState({});

  //  ========== Filtering  ==========
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter(
      ({ title, owner, status: s }) =>
        (status === "all" || s === status) &&
        [title, owner].some((f) => f.toLowerCase().includes(q))
    );
  }, [projects, search, status]);

  //  ========== Columns  ==========
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "status", headerName: "Status", width: 140 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
  ];

  //  ========== Handle form changes  ==========
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  ========== Validate  ==========
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.owner.trim()) newErrors.owner = "Owner is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  ========== Save new project  ==========
  const handleSave = () => {
    if (!validate()) return;

    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1, // unique ID
      title: form.title,
      owner: form.owner,
      status: form.status,
      description: form.description,
      createdAt: new Date(),
    };

    createProject(newProject); //  ========== call context method  ==========

    setForm({ title: "", owner: "", status: "Planning", description: "" });
    setErrors({});
    setOpen(false);
  };

  return (
    <Box p={3}>
      {/*  ========== Search and Filter   ==========*/}
      <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ width: 200, textTransform: "capitalize" }}
          >
            {["all", ...STATUS].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {/*  ========== DataGrid   ==========*/}
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        <DataGrid
          autoHeight
          rows={filtered}
          columns={columns}
          page={pagination.page}
          pageSize={pagination.pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
          onPageSizeChange={(pageSize) =>
            setPagination((p) => ({ ...p, pageSize }))
          }
          disableSelectionOnClick
          onRowClick={(params) => navigate(`/projects/${params.row.id}`)}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#f3f4f6",
              fontWeight: "bold",
              textTransform: "capitalize",
            },
            "& .MuiDataGrid-row:hover": { bgcolor: "#f7fafc" },
          }}
        />
      </Paper>

      {/*  ========== Floating Add Button  ========== */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", bottom: 30, right: 30 }}
      >
        <AddIcon />
      </Fab>

      {/* ========== Dialog for New Project  ========== */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
            />
            <TextField
              label="Owner"
              name="owner"
              value={form.owner}
              onChange={handleChange}
              error={!!errors.owner}
              helperText={errors.owner}
              fullWidth
            />
            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            >
              {STATUS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
