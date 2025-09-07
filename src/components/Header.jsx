import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth") === "true"; // check auth

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // 🌈 gradient bg
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* ========== Left: App Title  ========== */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
        >
        Reactjs Assessment
        </Typography>

        {/*  ========== Right: Menus   ========== */}
        <Stack direction="row" spacing={2}>
          {isAuth ? (
            // 🔹 Private menu (after login)
            <>
              <Button sx={{ color: "white" }} component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button sx={{ color: "white" }} component={Link} to="/projects">
                Projects
              </Button>
              <Button sx={{ color: "white" }} component={Link} to="/analytics">
                Analytics
              </Button>
              <Button sx={{ color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            //  ==========Public menu (before login)  ==========
            <>
              <Button sx={{ color: "white" }} component={Link} to="/">
                Home
              </Button>
              <Button sx={{ color: "white" }} component={Link} to="/about">
                About
              </Button>

              <Button sx={{ color: "white" }} component={Link} to="/">
                Login
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
