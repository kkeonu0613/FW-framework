import "./index.css";
import ItemCategoryTitle from "../ItemCategoryTitle";
import ItemCategoryContents from "../ItemCategoryContents";

function ItemCategory({ SubTitle }) {
  return (
    <div>
      <div className="ItemCategoryTitle">
        <ItemCategoryTitle SubTitle={SubTitle} />
      </div>
      <div className="ItemCategoryContents">
        <ItemCategoryContents />
      </div>
    </div>
  );
}

export default ItemCategory;
