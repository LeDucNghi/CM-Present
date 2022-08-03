import * as React from "react";

import DropdownFilter from "components/DropdownFilter/DropdownFilter";

export default function TeamFilter() {
  const teamMenu = [
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
  return (
    <>
      <DropdownFilter options={teamMenu} />
    </>
  );
}
