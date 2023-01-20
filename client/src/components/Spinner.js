import React from "react";

const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "999",
        background: "lightGray",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
