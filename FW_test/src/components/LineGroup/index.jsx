import "./index.css";
import LineCategory from "./LineCategory";
import LineContents from "./LineContents";

function LineGroup({ isModalOpen, setIsModalOpen, category, SubTitle }) {
  return (
    <div className="test">
      <div className="LineCategory">
        <LineCategory SubTitle={SubTitle} />
      </div>
      <div className="LineContents">
        <LineContents
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
    </div>
  );
}

export default LineGroup;
