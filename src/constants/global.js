import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PreviewIcon from "@mui/icons-material/Preview";
import { routesName } from "features/slice";
import { store } from "store";

export const drawer = [
  {
    id: 1,
    name: "Users",
    icon: <PersonIcon />,
  },

  {
    id: 2,
    name: "Profiles",
    icon: <AssignmentIndIcon />,
  },

  {
    id: 3,
    name: "About",
    icon: <InfoIcon />,
  },

  {
    id: 4,
    name: "Trash",
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
    age: null,
    email: "leducnghi28122000hiie@gmail.com",
    role: "member",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    age: 150,
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
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "age",
    headerName: "Age",
    // type: "number",
    width: 100,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,

    renderCell: (cellValues) => {
      return (
        <Link to={`/home/about/${cellValues.row.id}`}>
          <Button>
            {cellValues.row.firstName || ""} {cellValues.row.lastName || ""}
          </Button>
        </Link>
      );
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
  {
    field: "",
    headerName: "",
    width: 200,

    renderCell: (cellValues) => {
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
            View
          </Button>
        </Link>
      );
    },
  },
];
