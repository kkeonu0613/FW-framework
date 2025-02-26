import "./index.css";
import AddModal from "../../AddModal";

function ProcessBar({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div className="ProcessBar">
      <div className="custom-bar">사용함 사용안함</div>
      <div className="action-bar">
        <button>삭제</button>
        <button onClick={() => setIsModalOpen(true)}>추가</button>
        {isModalOpen && (
          <AddModal
            // <ProcessModal
            closeModal={() => setIsModalOpen(false)}
            category={category}
          />
        )}
      </div>
    </div>
  );
}
export default ProcessBar;
