import React from "react";
import Chart from "react-apexcharts";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { useProjects } from "../context/ProjectsContext";

export default function Analytics() {
  const { projects } = useProjects();

  //  ========== Projects by Status  ==========
  const statusCounts = projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});
  const statusOptions = {
    chart: { type: "pie", toolbar: { show: false } },
    labels: Object.keys(statusCounts),
    legend: { position: "bottom" },
    colors: ["#42a5f5", "#ffb74d", "#ef5350", "#66bb6a"],
  };
  const statusSeries = Object.values(statusCounts);

  //  ========== Projects over Time  ==========
  const monthlyCounts = {};
  projects.forEach((p) => {
    const month = new Date(p.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });
  const timeOptions = {
    chart: { type: "area", toolbar: { show: false } },
    xaxis: { categories: Object.keys(monthlyCounts) },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#42a5f5"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
  };
  const timeSeries = [{ name: "Projects", data: Object.values(monthlyCounts) }];

  //  ========== Projects by Owner  ==========
  const ownerCounts = projects.reduce((acc, p) => {
    acc[p.owner] = (acc[p.owner] || 0) + 1;
    return acc;
  }, {});
  const ownerOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: Object.keys(ownerCounts) },
    plotOptions: { bar: { borderRadius: 6 } },
    dataLabels: { enabled: false },
    colors: ["#7e57c2"],
  };
  const ownerSeries = [{ name: "Projects", data: Object.values(ownerCounts) }];

  return (
    <Container maxWidth="lg">
      <Box py={4} textAlign="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "primary.main", mb:4 }}
        >
         Project Analytics
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/*  ========== Projects by Status  ========== */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Projects by Status
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Chart
                  options={statusOptions}
                  series={statusSeries}
                  type="pie"
                  height={260}
                />
              </CardContent>
            </Card>
          </Grid>

          {/*  ========== Projects Over Time  ========== */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Projects Over Time
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Chart
                  options={timeOptions}
                  series={timeSeries}
                  type="area"
                  height={260}
                />
              </CardContent>
            </Card>
          </Grid>

          {/*  ========== Projects by Owner  ========== */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Projects by Owner
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Chart
                  options={ownerOptions}
                  series={ownerSeries}
                  type="bar"
                  height={260}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
