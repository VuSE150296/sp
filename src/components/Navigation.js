import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { NavLink } from "react-router-dom";
import LoginGoogle from "./LoginGoogle";

function Navigation({ loading, setLoading }) {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    setLoading(false);
    setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
  }, [loading]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NewspaperIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NEWS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Home
              </Button>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Top News
              </Button>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Contact
              </Button>
            </NavLink>
            {isLogin && (
              <NavLink style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Add
                </Button>
              </NavLink>
            )}
          </Box>

          {isLogin ? (
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <NavLink
                onClick={() => {
                  localStorage.removeItem("userLogin");
                  setLoading(true);
                }}
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Logout
                </Button>
              </NavLink>
              <Typography
                style={{
                  textDecoration: "underline",
                  background: "white",
                  color: "blue",
                  padding: 10,
                  borderRadius: "5px",
                }}
              >
                {isLogin.email}
              </Typography>
            </Box>
          ) : (
            <LoginGoogle setLoading={setLoading} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
