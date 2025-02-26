import "./index.css";
import MoldCategory from "./MoldCategory";
import MoldContents from "./MoldContents";

function MoldGroup({ isModalOpen, setIsModalOpen, category, SubTitle }) {
  return (
    <div className="test">
      <div className="MoldCategory">
        <MoldCategory SubTitle={SubTitle} />
      </div>
      <div className="MoldContents">
        <MoldContents
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
    </div>
  );
}

export default MoldGroup;
