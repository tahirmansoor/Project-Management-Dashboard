import { useEffect, useState, useMemo } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [pagination, setPagination] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    const fetchData = async () => {
      const postsRes = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const usersRes = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const posts = await postsRes.json();
      const users = await usersRes.json();

      const statuses = ["active", "pending", "completed"];
      const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
      const getRandomDate = () =>
        new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365);

      const mapped = posts.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.body,
        owner: users.find((u) => u.id === p.userId)?.name || "Unknown",
        status: getRandom(statuses),
        createdAt: getRandomDate(),
      }));

      setProjects(mapped);
    };

    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toUpperCase();
    return projects.filter(
      ({ status: s, title, owner }) =>
        (status === "all" || s === status) &&
        [title, owner].some((field) => field.toUpperCase().includes(q))
    );
  }, [projects, search, status]);

  const statusStyles = {
    active: { bg: "success.main", color: "white" },
    pending: { bg: "warning.main", color: "white" },
    default: { bg: "info.main", color: "white" },
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "owner", headerName: "Owner", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: ({ value }) => {
        const { bg, color } = statusStyles[value] || statusStyles.default;
        return (
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 2,
              textAlign: "center",
              fontSize: "0.8rem",
              fontWeight: 600,
              bgcolor: bg,
              color,
            }}
          >
            {value}
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <Box p={3} sx={{ bgcolor: "#f9fafc", minHeight: "100vh" }}>
      {/*  ===== Header  ===== */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          textAlign: "center",
          background: "linear-gradient(90deg,#667eea,#764ba2)",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Project Dashboard
        </Typography>
        <Typography variant="body2">Manage your projects easily</Typography>
      </Paper>

      {/*  ===== Filters  =====*/}
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
            {["all", "active", "pending", "completed"].map((s) => (
              <MenuItem key={s} value={s} sx={{ textTransform: "capitalize" }}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {/* ===== Data Table  ===== */}
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        <DataGrid
          autoHeight
          rows={filtered}
          columns={columns}
          pagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
          onPageSizeChange={(pageSize) =>
            setPagination((p) => ({ ...p, pageSize }))
          }
          disableSelectionOnClick
          sx={{
            textTransform: "capitalize",
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#f3f4f6",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": { bgcolor: "#f7fafc" },
          }}
        />
      </Paper>
    </Box>
  );
};

export default Dashboard;
