import "./index.css";
import ProcessCategory from "./ProcessCategory";
import ProcessContents from "./ProcessContents";

function ProcessGroup({ isModalOpen, setIsModalOpen, category, SubTitle }) {
  return (
    <div className="test">
      <div className="ProcessCategory">
        <ProcessCategory SubTitle={SubTitle} />
      </div>
      <div className="ProcessContents">
        <ProcessContents
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
    </div>
  );
}

export default ProcessGroup;
