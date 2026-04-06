'use client';
import { useState } from "react";
import Image from "next/image";
import { Box, Container, Grid, Paper, Button, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/context/AuthContext";
import { useShoppingList } from "@/hook/useShoppingList";
import ShoppingHeader from "./ShoppingHeader";
import ShoppingList from "./ShoppingList";

const Home = () => {
  const { logout } = useAuth();
  const { items, loading, addItem, deleteItem, toggleItem } = useShoppingList();
  const [newTitle, setNewTitle] = useState("");
  const [newCount, setNewCount] = useState("");

  const handleAdd = () => {
    addItem(newTitle, newCount);
    setNewTitle("");
    setNewCount("");
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", background: "#0a0b0d", overflowX: "hidden" }}>
      <Button
        onClick={logout}
        variant="outlined"
        startIcon={<LogoutIcon />}
        sx={{
          position: "fixed",
          top: 30,
          right: 30,
          borderColor: "rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.6)",
          borderRadius: 2,
          backdropFilter: "blur(10px)",
          zIndex: 100,
          "&:hover": { borderColor: "#f44336", color: "#f44336", background: "rgba(244, 67, 54, 0.05)" },
        }}
      >
        Logout
      </Button>

      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center" justifyContent="center" sx={{ minHeight: "80vh" }}>
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Box sx={{ position: "relative", width: "100%" }}>
              <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "120%",
                height: "120%",
                background: "radial-gradient(circle, rgba(103, 58, 183, 0.25) 0%, rgba(244, 67, 54, 0.2) 40%, transparent 70%)",
                filter: "blur(80px)",
                zIndex: 0,
              }} />

              <Paper elevation={24} sx={{
                position: "relative",
                padding: { xs: 4, md: 6 },
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}>
                <ShoppingHeader
                  title={newTitle}
                  setTitle={setNewTitle}
                  count={newCount}
                  setCount={setNewCount}
                  onAdd={handleAdd}
                />

                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <CircularProgress sx={{ color: "#fbc02d" }} />
                  </Box>
                ) : (
                  <Box sx={{ mt: "1rem" }}>
                    <ShoppingList items={items} onDelete={deleteItem} onToggle={toggleItem} />
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 7 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ position: "relative", width: "100%", height: { md: "600px", lg: "700px" } }}>
              <Image
                src="/img/side-img.png"
                alt="Dot Map"
                fill
                style={{ objectFit: "contain", filter: "drop-shadow(0 0 50px rgba(0, 150, 255, 0.15))" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;