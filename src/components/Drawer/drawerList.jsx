import { useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InfoIcon from "@mui/icons-material/Info";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import { routesName } from "features/slice";
import { useDispatch } from "react-redux";

export const ListDrawer = ({ languages, open }) => {
  const drawer = [
    {
      id: 1,
      name: `${languages === "VN" ? "Bảng tin" : "Dashboard"}`,
      path: "/main/dashboard",
      icon: <DashboardIcon />,
    },

    {
      id: 2,
      name: `${languages === "VN" ? "Thành viên" : "Users"}`,
      path: "/main/user",
      icon: <PersonIcon />,
    },

    {
      id: 3,
      name: `${languages === "VN" ? "Dự án" : "Projects"}`,
      path: "/main/project",
      icon: <FolderOpenIcon />,
    },

    {
      id: 4,
      name: `${languages === "VN" ? "Giới thiệu" : "About"}`,
      path: "/main/about",
      icon: <InfoIcon />,
    },

    {
      id: 5,
      name: `${languages === "VN" ? "Thùng rác" : "Trash"}`,
      path: "/main/trash",
      icon: <DeleteIcon />,
    },
  ];

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirect = (pageName, pathName) => {
    console.log(
      "🚀 ~ file: drawer.jsx ~ line 124 ~ handleRedirect ~ pathName",
      pathName
    );
    dispatch(routesName(pageName));
    navigate(pathName);
  };

  return (
    <>
      <List>
        {drawer.map((item, index) => (
          <>
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: "block",
                background: pathname === item.path ? "#ccc" : "",
                transition: "background 0.3s ease-in-out 0s",
              }}
            >
              <ListItemButton
                onClick={() => handleRedirect(item.name, item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
};
