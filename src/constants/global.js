import { Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PreviewIcon from "@mui/icons-material/Preview";
import { createTheme } from "@mui/material/styles";
import { routesName } from "features/slice";
import { store } from "store";

export const engDrawer = [
  {
    id: 1,
    name: "Dashboard",
    path: "/main/dashboard",
    icon: <DashboardIcon />,
  },

  {
    id: 2,
    name: "Users",
    path: "/main/user",
    icon: <PersonIcon />,
  },

  {
    id: 3,
    name: "Projects",
    path: "/main/project",
    icon: <FolderOpenIcon />,
  },

  {
    id: 4,
    name: "About",
    path: "/main/about",
    icon: <InfoIcon />,
  },

  {
    id: 5,
    name: "Trash",
    path: "/main/trash",
    icon: <DeleteIcon />,
  },
];

export const vnDrawer = [
  {
    id: 1,
    name: "Bảng điều khiển",
    path: "/main/dashboard",
    icon: <DashboardIcon />,
  },

  {
    id: 2,
    name: "Người dùng",
    path: "/main/user",
    icon: <PersonIcon />,
  },

  {
    id: 3,
    name: "Dự án",
    path: "/main/project",
    icon: <FolderOpenIcon />,
  },

  {
    id: 4,
    name: "Giới thiệu",
    path: "/main/about",
    icon: <InfoIcon />,
  },

  {
    id: 5,
    name: "Thùng rác",
    path: "/main/trash",
    icon: <DeleteIcon />,
  },
];

export const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 16,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 15,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
];

export const columns = [
  {
    field: "id",
    renderHeader: () => {
      const languages = store.getState().app.language;
      return <p>{languages === "VN" ? "STT" : "ID"} </p>;
    },
    width: 70,
  },

  {
    field: "firstName",
    renderHeader: () => {
      const languages = store.getState().app.language;
      return <p>{languages === "VN" ? "Tên họ" : "First name"} </p>;
    },
    width: 150,
  },

  {
    field: "lastName",
    renderHeader: () => {
      const languages = store.getState().app.language;
      return <p>{languages === "VN" ? "Tên cuối" : "Last name"} </p>;
    },
    width: 150,
  },

  {
    field: "email",
    renderHeader: () => {
      const languages = store.getState().app.language;
      return <p>{languages === "VN" ? "Email" : "Email"} </p>;
    },
    width: 250,
  },

  {
    field: "age",
    renderHeader: () => {
      const languages = store.getState().app.language;
      return <p>{languages === "VN" ? "Tuổi" : "Age"} </p>;
    },
    width: 100,
  },

  {
    field: "fullName",
    renderHeader: () => {
      const languages = store.getState().app.language;
      return <p>{languages === "VN" ? "Tên đầy đủ" : "Full name"} </p>;
    },
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,

    renderCell: (cellValues) => {
      return (
        // <Link to={`/home/about/${cellValues.row.id}`}>
        <Button>
          {cellValues.row.firstName || ""} {cellValues.row.lastName || ""}
        </Button>
        // </Link>
      );
    },
  },

  {
    field: "role",
    renderHeader: () => {
      const languages = store.getState().app.language;
      return <p>{languages === "VN" ? "Chức vụ" : "Role"} </p>;
    },
    width: 150,
  },

  {
    field: "",
    headerName: "",
    width: 200,

    renderCell: (cellValues) => {
      const languages = store.getState().app.language;
      return (
        <Link to={`/main/about/${cellValues.row.id}`}>
          <Button
            startIcon={<PreviewIcon />}
            variant="contained"
            color="success"
            sx={{ fontWeight: 600, margin: "0 auto" }}
            onClick={() => {
              store.dispatch(routesName("About"));
            }}
          >
            {languages === "Eng" ? "View" : "Xem chi tiết"}
          </Button>
        </Link>
      );
    },
  },
];

export const userData = [
  {
    id: 1,
    year: 2016,
    userRegister: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userRegister: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userRegister: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userRegister: 90000,
    userLost: 200,
  },
  {
    id: 5,
    year: 2020,
    userRegister: 85000,
    userLost: 500,
  },
];

export const teamMenu = [
  {
    id: 1,
    teamName: "React",
  },
  {
    id: 2,
    teamName: "Vue",
  },
  {
    id: 3,
    teamName: "Angular",
  },
];
