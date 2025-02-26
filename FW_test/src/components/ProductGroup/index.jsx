import { useEffect, useState } from "react";
import "./index.css";
import ProductCategory from "./ProductCategory";
import ProductContents from "./ProductContents";

function ProductGroup({ isModalOpen, setIsModalOpen, category, SubTitle }) {
  const [selectDepartment, setSelectDepartment] = useState("");
  useEffect(() => {
    console.log(selectDepartment);
  }, [selectDepartment]);
  return (
    <div className="test">
      <div className="ProductCategory">
        <ProductCategory
          setSelectDepartment={setSelectDepartment}
          SubTitle={SubTitle}
        />
      </div>
      <div className="ProductContents">
        <ProductContents
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          selectDepartment={selectDepartment}
        />
      </div>
    </div>
  );
}

export default ProductGroup;
