import "./index.css";

function EquipmentModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>설비 등록/수정</h2>
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
            <h5>설비를 등록/수정합니다.</h5>
            <h6>설비 정보를 입력하고 관리할 수 있습니다.</h6>
          </div>
          {/* 제품군 코드 입력 */}
          <div className="form-group">
            <label>설비종류</label>
            <input type="text" placeholder="설비코드를 입력하세요." />
          </div>
          {/* 제품군명 입력 */}
          <div className="form-group">
            <label>설비코드</label>
            <input type="text" placeholder="설비코드를 입력하세요." />
          </div>
          {/* 설명 입력 */}
          <div className="form-group">
            <label>설비명</label>
            <textarea placeholder="설비명을 입력하세요."></textarea>
          </div>
          {/* 설명 입력 */}
          <div className="form-group">
            <label>공장 선택</label>
            <textarea placeholder="공장 선택하세요."></textarea>
          </div>
          {/* 제품군명 입력 */}
          <div className="form-group">
            <label>제작사</label>
            <input type="text" placeholder="제작사를 입력하세요." />
          </div>
          <div className="form-group">
            <label>공급사</label>
            <input type="text" placeholder="공급사를 입력하세요." />
          </div>
          <div className="form-group">
            <label>모델번호</label>
            <input type="text" placeholder="모델번호를 입력하세요." />
          </div>
          <div className="form-group">
            <label>설치일</label>
            <input type="text" placeholder="소재를 입력하세요." />
          </div>
          <div className="form-group">
            <label>업로드 AAS파일 </label>
            <input type="text" placeholder="크기을 입력하세요." />
          </div>
          <div className="form-group">
            <label>설명</label>
            <textarea placeholder="설명을 입력하세요."></textarea>
          </div>
          <div className="form-group">
            <label>금형및 공구</label>
            <input type="text" placeholder="금형 및 공구 선택하세요." />
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

export default EquipmentModal;
