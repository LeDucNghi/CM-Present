import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import Swal from "sweetalert2";
import { routesName } from "features/drawer/drawerSlice";
import { store } from "app/store";

export const Toast = Swal.mixin({
  // customClass : {
  //   container : ''
  // },
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

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
