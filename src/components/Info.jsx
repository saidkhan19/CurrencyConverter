import React from "react";

const Info = () => {
  return (
    <div style={{ maxWidth: "302px" }}>
      <p>Currency converter application.</p>
      <p>
        It was built as a practice project by{" "}
        <a href="https://github.com/saidkhan19" target="_blank">
          Sayid
        </a>
        . Repository - <a href="#">GitHub</a>
      </p>
      <p>
        Design -{" "}
        <a
          href="https://dribbble.com/shots/2880346/attachments/2880346-Currency-Converter-Ui-Design?mode=media"
          target="_blank"
        >
          link
        </a>{" "}
        by{" "}
        <a href="https://dribbble.com/ildiesign" target="_blank">
          Ildiko Gaspar
        </a>
      </p>
      <p>APIs</p>
      <ul>
        <li>
          <a href="https://currencyapi.com/">Currency API</a> for rates
        </li>
        <li>
          <a href="https://polygon.io/">Polygon.io</a> for historical rates
        </li>
      </ul>
    </div>
  );
};

export default Info;
