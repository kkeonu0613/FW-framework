import "./index.css";
import FactoryCategory from "./FactoryCategory";
import FactoryContents from "./FactoryContents";

function FactoryGroup({ isModalOpen, setIsModalOpen, category, SubTitle }) {
  return (
    <div className="test">
      <div className="FactoryCategory">
        <FactoryCategory SubTitle={SubTitle} />
      </div>
      <div className="FactoryContents">
        <FactoryContents
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
    </div>
  );
}

export default FactoryGroup;
