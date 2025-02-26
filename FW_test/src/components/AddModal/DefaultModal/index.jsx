import "./index.css";

function DefaultModal({ closeModal }) {
  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <h2>등록되지 않은것</h2>
          <form>
            <div className="form-group">
              <h5>등록안됨됨.</h5>
              <h6>등록안됨됨.</h6>
            </div>

            <button type="submit">저장</button>
          </form>
          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default DefaultModal;
