"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1e1e1e",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          fontSize: "14px",
        },
        success: {
          iconTheme: { primary: "#0ea5e9", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#fff" },
        },
      }}
    />
  );
}
