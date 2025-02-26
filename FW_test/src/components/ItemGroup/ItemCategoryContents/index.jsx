import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function ItemCategoryContents() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product_categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("품목 분류 정보를 불러오는 데 실패했습니다.", error);
      });
  }, []);

  return (
    <div className="ItemCategoryContents">
      <div className="CategoryTitle">
        <div className="SubTitle">InterX 품목 분류</div>
      </div>
      <div>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category.category_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemCategoryContents;
