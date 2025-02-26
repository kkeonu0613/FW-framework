import "./index.css";
import MoldBar from "../MoldBar";
import MoldArea from "../MoldArea";
import MoldWrapper from "../MoldWrapper";

function MoldContents({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div>
      <div className="MoldBar">
        <MoldBar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
      <div className="MoldArea">
        <MoldArea />
      </div>
      <div className="MoldWrapper">
        <MoldWrapper />
      </div>
    </div>
  );
}

export default MoldContents;
