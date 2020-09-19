import React from "react";

const DriverDetails = (props) => {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <h5 className="mb-1">Date of Birth</h5>
        <p>
          {new Date(props.dateOfBirth).toLocaleDateString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </li>
      <li className="list-group-item">
        <h5 className="mb-1">Nationality</h5>
        <p>{props.nationality}</p>
      </li>
      <li className="list-group-item">
        <h5 className="mb-1">Number</h5>
        <p>{props.permanentNumber}</p>
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

export default DriverDetails;
