import ProductGroup from "../ProductGroup";
import ItemGroup from "../ItemGroup";
import "./index.css";
import { useState, useEffect } from "react";
import FactoryGroup from "../FactoryGroup";
import LineGroup from "../LineGroup";
import ProcessGroup from "../ProcessGroup";
import EquipmentGroup from "../EquipmentGroup";
import MoldGroup from "../moldGroup";

function PageContents({ isModalOpen, setIsModalOpen, category, selectedMenu }) {
  let contentComponent = null;
  const [SubTitle, setSubTitle] = useState("");
  useEffect(() => {
    if (category === "제품군" || category === "공장" || category === "공정") {
      setSubTitle("사업부목록");
    } else if (category === "품목") {
      setSubTitle("품목분류정보");
    }
  }, [category]);

  switch (selectedMenu) {
    case "제품군":
      contentComponent = (
        <ProductGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          SubTitle={SubTitle}
        />
      );
      break;
    case "품목":
      contentComponent = (
        <ItemGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          SubTitle={SubTitle}
        />
      );
      break;
    case "공장":
      contentComponent = (
        <FactoryGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          SubTitle={SubTitle}
        />
      );
      break;
    case "라인":
      contentComponent = (
        <LineGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          SubTitle={SubTitle}
        />
      );
      break;
    case "공정":
      contentComponent = (
        <ProcessGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          SubTitle={SubTitle}
        />
      );
      break;
    case "설비":
      contentComponent = (
        <EquipmentGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          SubTitle={SubTitle}
        />
      );
      break;
    case "금형":
      contentComponent = (
        <MoldGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
          SubTitle={SubTitle}
        />
      );
      break;
    default:
      contentComponent = (
        <DefaultGroup
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      );
  }

  return <div className="page-content">{contentComponent}</div>;
}

export default PageContents;
