import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Box, MantineProvider } from "@mantine/core";
import { initialize } from "@/libs/i18next/i18n";

initialize();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Box>
        <App />
      </Box>
    </MantineProvider>
  </React.StrictMode>
);
