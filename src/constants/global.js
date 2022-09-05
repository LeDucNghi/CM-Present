import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import { routesName } from "features/drawer/drawerSlice";
import { store } from "app/store";

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
