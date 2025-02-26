import React from "react";
import "./index.css";
import AddModal from "../../AddModal";

function ProductBar({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div className="ProductBar">
      <div className="custom-bar">사용함 사용안함</div>
      <div className="action-bar">
        <button>삭제</button>
        <button onClick={() => setIsModalOpen(true)}>추가</button>
        {isModalOpen && (
          <AddModal
            closeModal={() => setIsModalOpen(false)}
            category={category}
          />
        )}
      </div>
    </div>
  );
}

export default ProductBar;
