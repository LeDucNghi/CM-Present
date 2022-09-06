import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import { routesName } from "features/drawer/drawerSlice";
import { store } from "app/store";

export const columns = [
  {
    field: "id",
    renderHeader: () => {
      const languages = store.getState().drawer.language;
      return <p>{languages === "VN" ? "STT" : "ID"} </p>;
    },
    width: 70,
  },

  {
    field: "firstName",
    renderHeader: () => {
      const languages = store.getState().drawer.language;
      return <p>{languages === "VN" ? "Tên họ" : "First name"} </p>;
    },
    width: 200,
  },

  {
    field: "lastName",
    renderHeader: () => {
      const languages = store.getState().drawer.language;
      return <p>{languages === "VN" ? "Tên cuối" : "Last name"} </p>;
    },
    width: 200,
  },

  {
    field: "email",
    renderHeader: () => {
      const languages = store.getState().drawer.language;
      return <p>{languages === "VN" ? "Email" : "Email"} </p>;
    },
    width: 300,
  },

  {
    field: "age",
    renderHeader: () => {
      const languages = store.getState().drawer.language;
      return <p>{languages === "VN" ? "Tuổi" : "Age"} </p>;
    },
    width: 150,
  },

  // {
  //   field: "fullName",
  //   renderHeader: () => {
  //     const languages = store.getState().drawer.language;
  //     return <p>{languages === "VN" ? "Tên đầy đủ" : "Full name"} </p>;
  //   },
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 300,

  //   renderCell: (cellValues) => {
  //     return (
  //       <Button>
  //         {cellValues.row.firstName || ""} {cellValues.row.lastName || ""}
  //       </Button>
  //     );
  //   },
  // },

  {
    field: "role",
    renderHeader: () => {
      const languages = store.getState().drawer.language;
      return <p>{languages === "VN" ? "Chức vụ" : "Role"} </p>;
    },
    width: 200,
  },

  {
    field: " ",
    headerName: "",
    width: 250,

    renderCell: (cellValues) => {
      const languages = store.getState().drawer.language;
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

export const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
