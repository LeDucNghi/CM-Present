import React from "react";
import { useParams } from "react-router-dom";

function About(props) {
  const { userId } = useParams();
  console.log("🚀 ~ file: about.jsx ~ line 6 ~ About ~ userId", userId);
  return <div>about</div>;
}

export default About;
