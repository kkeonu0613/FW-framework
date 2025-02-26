import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function FactoryCategoryContents() {
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
    <div className="FactoryCategoryContents">
      <div className="FactoryCategoryTitle">
        <div className="SubTitle">InterX</div>
      </div>
      <div>
        <ul>
          {departments.map((department, index) => (
            <li key={index}>{department.DEPARTMENT_NAME}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FactoryCategoryContents;
