import "./Project.scss";

import * as React from "react";

import { Images } from "constants/images";

export default function Projects() {
  return (
    <div className="project_container">
      <img src={Images.EMPTY} alt="" />
      <p className="project_text">Coming soon</p>
    </div>
  );
}
