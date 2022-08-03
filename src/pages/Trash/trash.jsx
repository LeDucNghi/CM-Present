import DataGrid from "components/Custom/CustomDataGrid";
import DeleteUser from "features/trash/components/DeleteUser";
import { Loading } from "components/Common/Loading/Loading";
import React from "react";

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

function Trash({ deletedUserLoading }) {
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        {/* 
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
            <DataGrid
              // getRowId={(row) => row.id}
              // onSelectionModelChange={(id) => onSelectionModelChange(id)}
              // rows={row}
              // columns={columns}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              // checkboxSelection
              // mode={mode}
              selectedRow={setSelectedRow}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box> */}
        <DataGrid selectedRow={setSelectedRow} />
      </div>
    );
}

export default Trash;
