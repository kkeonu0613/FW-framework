import "./index.css";
import EquipmentBar from "../EquipmentBar";
import EquipmentArea from "../EquipmentArea";
import EquipmentWrapper from "../EquipmentWrapper";

function EquipmentContents({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div>
      <div className="EquipmentBar">
        <EquipmentBar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
      <div className="EquipmentArea">
        <EquipmentArea />
      </div>
      <div className="EquipmentWrapper">
        <EquipmentWrapper />
      </div>
    </div>
  );
}

export default EquipmentContents;
