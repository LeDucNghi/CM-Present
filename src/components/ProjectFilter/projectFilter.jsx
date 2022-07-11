import * as React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { teamMenu } from "constants/global";
import { useGetUserTeamQuery } from "services/userServices";

export default function SelectAutoWidth() {
  const [teamName, setTeamName] = React.useState("");

  const { data, isSuccess } = useGetUserTeamQuery(teamName);

  React.useEffect(() => {
    console.log(
      "🚀 ~ file: projectFilter.jsx ~ line 14 ~ SelectAutoWidth ~ data",
      data
    );
  }, [isSuccess]);

  return (
    <div>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          autoWidth
          label="Age"
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
