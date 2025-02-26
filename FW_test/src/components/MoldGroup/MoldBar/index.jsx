import "./index.css";
import AddModal from "../../AddModal";

function MoldBar({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div className="MoldBar">
      <div className="custom-bar">사용함 사용안함</div>
      <div className="action-bar">
        <button>삭제</button>
        <button onClick={() => setIsModalOpen(true)}>추가</button>
        {isModalOpen && (
          <AddModal
            // <MoldModal
            closeModal={() => setIsModalOpen(false)}
            category={category}
          />
        )}
      </div>
    </div>
  );
}
export default MoldBar;
