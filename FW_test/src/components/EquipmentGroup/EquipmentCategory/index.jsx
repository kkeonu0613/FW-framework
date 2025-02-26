import "./index.css";
import EquipmentCategoryTitle from "../EquipmentCategoryTitle";
import EquipmentCategoryContents from "../EquipmentCategoryContents";

function EquipmentCategory({ SubTitle }) {
  return (
    <div>
      <div className="EquipmentCategoryTitle">
        <EquipmentCategoryTitle SubTitle={SubTitle} />
      </div>
      <div className="EquipmentCategoryContents">
        <EquipmentCategoryContents />
      </div>
    </div>
  );
}

export default EquipmentCategory;
