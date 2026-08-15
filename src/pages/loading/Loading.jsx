import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { motion } from "framer-motion";
import "./loading.css";

export default function Loading() {
  return (
    <motion.div
      className="container-loading-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="loader__content">
        <HashLoader color="#4bd5ff" className="loader__icon" size={85} />
      </div>
    </motion.div>
  );
}
