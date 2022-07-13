import * as React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { teamMenu } from "constants/global";
import { useGetUserTeamQuery } from "services/userServices";

export default function TeamFilter() {
  const [teamName, setTeamName] = React.useState("");

  const { data, isSuccess } = useGetUserTeamQuery(teamName);
  console.log(
    "🚀 ~ file: projectFilter.jsx ~ line 14 ~ SelectAutoWidth ~ data, isSuccess",
    data,
    isSuccess
  );

  return (
    <div>
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
          {teamMenu.map((item, key) => {
            return (
              <MenuItem value={item.teamName} key={key}>
                {item.teamName}{" "}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
