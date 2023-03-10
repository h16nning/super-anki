import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";

import { getBaseTheme } from "./style/StyleProvider";
import Main from "./components/Main";
import { useCallback, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Notifications } from "@mantine/notifications";
import { useEventListener } from "@mantine/hooks";

export default function App() {
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark")),
    [colorScheme]
  );
  const ref = useEventListener("keydown", (ev) => {
    if (ev.altKey) toggleColorScheme();
  });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={getBaseTheme(theme, colorScheme)}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <AppShell
          //header={<TopBar />}
          navbarOffsetBreakpoint="sm"
          navbar={<Sidebar />}
          ref={ref}
          bg={
            colorScheme === "light"
              ? "linear-gradient(-55deg, rgba(255,255,255,1) 85%, rgba(225,239,230,0.5) 100%)"
              : "linear-gradient(-55deg, rgba(26,27,30,1) 85%, rgba(10,60,49,0.5) 100%)"
          }
        >
          <Main />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
