"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPasswordApi } from "@/services/api";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
}

const resetPasswordSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const ResetPasswordForm = ({ email }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await resetPasswordApi({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      alert("Password reset successfully! Please log in.");
      router.push("/signin");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Email, OTP, and new password are required",
      );
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            label="OTP"
            {...form.register("otp")}
            error={!!form.formState.errors.otp}
            helperText={form.formState.errors.otp?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </InputAdornment>
              ),
            }}
            sx={{ input: { color: "#fff" }, fieldset: { borderColor: "#555" } }}
          />

          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? "text" : "password"}
            {...form.register("newPassword")}
            error={!!form.formState.errors.newPassword}
            helperText={form.formState.errors.newPassword?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ input: { color: "#fff" }, fieldset: { borderColor: "#555" } }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={form.formState.isSubmitting}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #4b6cb7 0%, #182848 100%)",
            }}
          >
            {form.formState.isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
