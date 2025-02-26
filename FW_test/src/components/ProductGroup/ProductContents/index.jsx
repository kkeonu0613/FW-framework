import "./index.css";
import ProductBar from "../ProductBar";
import ProductArea from "../ProductArea";
import ProductWrapper from "../ProductWrapper";

function ProductContents({
  isModalOpen,
  setIsModalOpen,
  category,
  selectDepartment,
}) {
  return (
    <div>
      <div className="ProductBar">
        <ProductBar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
      <div className="ProductArea">
        <ProductArea category={category} selectDepartment={selectDepartment} />
      </div>
      <div className="ProductWrapper">
        <ProductWrapper />
      </div>
    </div>
  );
}

export default ProductContents;
