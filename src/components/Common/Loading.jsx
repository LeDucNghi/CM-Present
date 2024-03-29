import { selectLanguage, selectMode } from "features/drawer/drawerSlice";

import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  borderRadius: "50%",
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around",
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

const containerStyle = {
  width: "100%",
  height: "100vh",
  background: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export const Loading = () => {
  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);

  return (
    <div
      style={{
        ...containerStyle,
        color: `${mode === "dark" ? "#fff" : ""}`,
      }}
    >
      <p>
        {languages === "VN" ? `Vui lòng đợi...` : `Please wait a minutes...`}{" "}
      </p>
      <div
        style={{
          paddingTop: "1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={LoadingContainer}
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            style={{
              ...LoadingDot,
              backgroundColor: `${mode === "dark" ? "#fff" : "black"}`,
            }}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={{
              ...LoadingDot,
              backgroundColor: `${mode === "dark" ? "#fff" : "black"}`,
            }}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={{
              ...LoadingDot,
              backgroundColor: `${mode === "dark" ? "#fff" : "black"}`,
            }}
            variants={DotVariants}
            transition={DotTransition}
          />
        </motion.div>
      </div>
    </div>
  );
};
