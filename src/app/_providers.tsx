"use client";
import { Box, MantineProvider } from "@/components/ui";
import { initialize } from "@/libs/i18next/i18n";

import type { FC, PropsWithChildren } from "react";

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
