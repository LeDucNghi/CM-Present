import * as React from "react";

import AddUserButton from "features/user/components/AddUserButton";
import AddUserForm from "features/user/components/AddUserForm";
import DataGrid from "components/Custom/CustomDataGrid";
import { Loading } from "components/Common/Loading/Loading";

export default function User({ allUserLoading, allUserError }) {
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  if (allUserLoading) return <Loading />;
  if (allUserError) return console.log(allUserError);
  else
    return (
      <div
        style={{
          height: 400,
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
            position: "relative",
          }}
        >
          <AddUserButton
            row={row}
            setRow={setRow}
            setOpen={setOpen}
            selectedRow={selectedRow}
          />
        </div>

        <AddUserForm open={open} setOpen={setOpen} />

        <DataGrid setSelectedRow={setSelectedRow} />
      </div>
    );
}
