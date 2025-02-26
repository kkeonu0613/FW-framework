import "./index.css";
import EquipmentCategory from "./EquipmentCategory";
import EquipmentContents from "./EquipmentContents";

function EquipmentGroup({ isModalOpen, setIsModalOpen, category, SubTitle }) {
  return (
    <div className="test">
      <div className="EquipmentCategory">
        <EquipmentCategory SubTitle={SubTitle} />
      </div>
      <div className="EquipmentContents">
        <EquipmentContents
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
    </div>
  );
}

export default EquipmentGroup;
