import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Copyright, SocialLogin } from "../../components";
import { auth } from "../../config/firebase";
import backgroundImage from "../../static/background.jpg";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Login() {
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          opacity: 0.3,
          backgroundSize: "cover",
        }}
      ></Box>
      <Container component="main" maxWidth="sm">
        <CssBaseline />

        <Box
          component={Paper}
          sx={{
            boxShadow: 10,
            padding: 5,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {error && <Alert severity="error">{error}</Alert>}

            <SocialLogin setError={setError} />
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                Back To Homepage
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 1 }} />
      </Container>
    </ThemeProvider>
  );
}
