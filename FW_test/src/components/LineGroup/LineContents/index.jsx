import "./index.css";
import LineBar from "../LineBar";
import LineArea from "../LineArea";
import LineWrapper from "../LineWrapper";

function LineContents({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div>
      <div className="LineBar">
        <LineBar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
      <div className="LineArea">
        <LineArea />
      </div>
      <div className="LineWrapper">
        <LineWrapper />
      </div>
    </div>
  );
}

export default LineContents;
