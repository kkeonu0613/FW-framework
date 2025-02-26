import "./index.css";
import ProductCategoryTitle from "../ProductCategoryTitle";
import ProductCategoryContents from "../ProductCategoryContents";

function ProductCategory({ SubTitle, setSelectDepartment }) {
  return (
    <div>
      <div className="ProductCategoryTitle">
        <ProductCategoryTitle SubTitle={SubTitle} />
      </div>
      <div className="ProductCategoryContents">
        <ProductCategoryContents setSelectDepartment={setSelectDepartment} />
      </div>
    </div>
  );
}

export default ProductCategory;
