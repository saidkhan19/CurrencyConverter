import React from "react";

const Error = ({ error }) => {
  return (
    <div>
      <p style={{ color: "red", textAlign: "center" }}>
        {error.message || "Something went wrong."}
      </p>
    </div>
  );
};

export default Error;
