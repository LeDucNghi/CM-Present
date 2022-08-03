import React, { useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { useGetUserTeamQuery } from "services/userServices";

DropdownFilter.propTypes = {
  options: PropTypes.array,
};

DropdownFilter.defaultProps = {
  options: [],
};

export default function DropdownFilter({ options }) {
  const [teamName, setTeamName] = React.useState("");

  // const { data, isSuccess } = useGetUserTeamQuery(teamName);

  return (
    <FormControl sx={{ minWidth: 80 }}>
      <InputLabel id="demo-simple-select-autowidth-label">Team</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        autoWidth
        label="Team"
      >
        {options.map((item, key) => {
          return (
            <MenuItem value={item.teamName} key={key}>
              {item.teamName}{" "}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
