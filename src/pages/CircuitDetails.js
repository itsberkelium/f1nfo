import React from "react";

const CircuitDetails = (props) => {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <h5 className="mb-1">Nationality</h5>
        <p>{props.nationality}</p>
      </li>
      <li className="list-group-item">
        <p>
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Click for more info
          </a>
        </p>
      </li>
    </ul>
  );
};

export default CircuitDetails;
