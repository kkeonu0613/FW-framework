import React from "react";
import ProductModal from "./ProductModal";
import ItemModal from "./ItemModal";
import FactoryModal from "./FactoryModal";
import LineModal from "./LineModal";
import ProcessModal from "./ProcessModal";
import EquipmentModal from "./EquipmentModal";
import MoldModal from "./MoldModal";
import DefaultModal from "./DefaultModal";

function AddModal({ closeModal, category }) {
  let modalComponent = null;

  switch (category) {
    case "제품군":
      modalComponent = <ProductModal closeModal={closeModal} />;
      break;
    case "품목":
      modalComponent = <ItemModal closeModal={closeModal} />;
      break;
    case "공장":
      modalComponent = <FactoryModal closeModal={closeModal} />;
      break;
    case "라인":
      modalComponent = <LineModal closeModal={closeModal} />;
      break;
    case "공정":
      modalComponent = <ProcessModal closeModal={closeModal} />;
      break;
    case "설비":
      modalComponent = <EquipmentModal closeModal={closeModal} />;
      break;
    case "금형":
      modalComponent = <MoldModal closeModal={closeModal} />;
      break;
    default:
      modalComponent = <DefaultModal closeModal={closeModal} />;
  }

  return <div>{modalComponent}</div>;
}

export default AddModal;
