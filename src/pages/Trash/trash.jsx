import { CustomDataGrid } from "constants/styledMUI";
import DeleteUser from "components/DeleteUser/deleteUser";
import { Loading } from "components/Loading";
import React from "react";
import { columns } from "constants/global";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "components/TabPanel/tabPanel";

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

function Trash({ deletedUserLoading }) {
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );
  const mode = useSelector((state) => state.app.mode);
  // const languages = useSelector((state) => state.app.language);

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (deletedUserListStorage && deletedUserListStorage.length !== 0) {
      setRow(deletedUserListStorage);
    }
  }, [deletedUserListStorage, row]);

  const onSelectionModelChange = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowData = row.filter((row1) => selectedIDs.has(row1.id));
    setSelectedRow(selectedRowData);
    console.log("selectedRowData trash", selectedRowData);
  };

  if (deletedUserLoading) return <Loading />;
  else
    return (
      <div style={{ height: 400, width: "100%" }}>
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
          }}
        >
          <DeleteUser row={row} setRow={setRow} selectedRow={selectedRow} />
        </div>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 224,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} disabled />
            <Tab label="Item Three" {...a11yProps(2)} disabled />
          </Tabs>
          <TabPanel value={value} index={0}>
            <CustomDataGrid
              getRowId={(row) => row.id}
              onSelectionModelChange={(id) => onSelectionModelChange(id)}
              rows={row}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              mode={mode}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>

        {/* <CustomDataGrid
          getRowId={(row) => row.id}
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          mode={mode}
        /> */}
      </div>
    );
}

export default Trash;
