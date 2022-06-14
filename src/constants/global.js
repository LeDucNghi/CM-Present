import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";

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
