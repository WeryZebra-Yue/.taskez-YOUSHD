import React from "react";
import "./Component.css";
function Icons({ name, icon }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "17px",
          fontWeight: 400,
          lineHeight: "17px",
          letterSpacing: "0.05em",
          textAlign: "left",
          color: name != "Projects" ? "#9A9A9A" : "",
          paddingLeft: "50px",
          display: "flex",
          paddingRight: "130px",
          justifyContent: "space-between",
          marginTop: "40px",
          fontWeight: name == "Projects" ? "500" : "400",

          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <img src={icon} />
          <div style={{ marginLeft: "30px" }}>{name}</div>
        </div>
      </div>
    </div>
  );
}

export default Icons;
