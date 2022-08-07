import * as React from "react";

import { AppBar, Drawer, DrawerHeader } from "constants/styledMUI";

import Box from "@mui/material/Box";
import BoxSetting from "./BoxSetting";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import LanguageMenus from "components/LanguageDropdown/LanguageDropdown";
import { ListDrawer } from "./DrawerList";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "components/ThemingToggle/ThemingToggle";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

export default function MiniDrawer() {
  const theme = useTheme();

  const routeName = useSelector((state) => state.app.routeName);
  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
        }}
        position="fixed"
        open={open}
        mode={mode}
      >
        <Toolbar
          sx={{
            background: mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {routeName}
            </Typography>
            <Box
              sx={{
                width: "250px",
                marginLeft: "100px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "20px",
              }}
            >
              <ThemeToggle />
              <LanguageMenus />
            </Box>
          </Box>

          <BoxSetting />
        </Toolbar>
      </AppBar>
      <Drawer mode={mode} variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <ListDrawer mode={mode} languages={languages} open={open} />
      </Drawer>
    </>
  );
}
