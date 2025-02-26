import "./index.css";
import ProcessBar from "../ProcessBar";
import ProcessArea from "../ProcessArea";
import ProcessWrapper from "../ProcessWrapper";

function ProcessContents({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div>
      <div className="ProcessBar">
        <ProcessBar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
      <div className="ProcessArea">
        <ProcessArea />
      </div>
      <div className="ProcessWrapper">
        <ProcessWrapper />
      </div>
    </div>
  );
}

export default ProcessContents;
