import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function CategoryContents({ setSelectDepartment }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  }, []);

  return (
    <div className="CategoryContents">
      <div className="CategoryTitle">
        <div
          onClick={() => {
            setSelectDepartment("");
          }}
          className="SubTitle"
        >
          InterX
        </div>
      </div>
      <div>
        <ul>
          {departments.map((department, index) => (
            <li
              onClick={() => {
                setSelectDepartment(department.DEPARTMENT_NAME);
              }}
              key={index}
            >
              {department.DEPARTMENT_NAME}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryContents;
