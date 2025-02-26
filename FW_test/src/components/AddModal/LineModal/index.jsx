import "./index.css";

function LineModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>라인 등록/수정</h2>
          <div className="toggle-container">
            <label>사용 여부</label>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <button className="modal-close" onClick={closeModal}>
            ✖
          </button>
        </div>

        <form>
          {/* 설명 섹션 */}
          <div className="form-group">
            <h5>라인을 등록/수정합니다.</h5>
            <h6>라인 정보를 입력하고 관리할 수 있습니다.</h6>
          </div>
          {/* 제품군 코드 입력 */}
          <div className="form-group">
            <label>라인코드</label>
            <input type="text" placeholder="라인코드를 입력하세요." />
          </div>
          <div className="form-group">
            <label>라인명</label>
            <input type="text" placeholder="라인명을 입력하세요." />
          </div>
          <div className="form-group">
            <label>공장 선택</label>
            <input type="text" placeholder="공장을 선택하세요." />
          </div>
          <div className="form-group">
            <label>설명</label>
            <textarea placeholder="설명을 입력하세요."></textarea>
          </div>
          <div className="form-group">
            <label>공정 선택</label>
            <input type="text" placeholder="공정 선택하세요." />
          </div>
          {/* 버튼 그룹 */}
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              취소
            </button>
            <button type="submit" className="save-btn">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LineModal;
