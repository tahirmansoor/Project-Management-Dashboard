import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
  if (username === "admin" && password === "admin") {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true"); 
    navigate("/dashboard");
  } else {
    alert("Invalid credentials!");
  }
};


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 450,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "#FFFFFF",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h4" mb={3} fontWeight="bold" color="primary">
          Welcome Back
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)",
            },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
