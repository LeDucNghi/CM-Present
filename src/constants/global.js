import PreviewIcon from "@mui/icons-material/Preview";
import { Button } from "@mui/material";
import { routesName } from "features/slice";
import { Link } from "react-router-dom";
import { store } from "store";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

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
        <Button>
          {cellValues.row.firstName || ""} {cellValues.row.lastName || ""}
        </Button>
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

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `2px solid ${
        theme.palette.mode === "light" ? "red" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
}));
