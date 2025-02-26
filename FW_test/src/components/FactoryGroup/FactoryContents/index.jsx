import "./index.css";
import FactoryBar from "../FactoryBar";
import FactoryArea from "../FactoryArea";
import FactoryWrapper from "../FactoryWrapper";

function FactoryContents({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div>
      <div className="FactoryBar">
        <FactoryBar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
      <div className="FactoryArea">
        <FactoryArea />
      </div>
      <div className="FactoryWrapper">
        <FactoryWrapper />
      </div>
    </div>
  );
}

export default FactoryContents;
