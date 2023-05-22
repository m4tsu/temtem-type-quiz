"use client";
import { initialize } from "@/libs/i18next/i18n";
import { Box, MantineProvider } from "@/components/ui";
import { FC, PropsWithChildren } from "react";

initialize();

export const RootProviders: FC<PropsWithChildren> = ({ children }) => {
  console.log("RootProviders");
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Box>{children}</Box>
    </MantineProvider>
  );
};
