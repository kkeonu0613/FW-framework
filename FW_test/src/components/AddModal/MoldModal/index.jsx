import "./index.css";

function MoldModal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>금형 및 공구 등록/수정</h2>
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
            <h5>금형 및 공구을 등록/수정합니다.</h5>
            <h6>금형 및 공구 정보를 입력하고 관리할 수 있습니다.</h6>
          </div>
          {/* 제품군 코드 입력 */}
          <div className="form-group">
            <label>금형 및 공구코드</label>
            <input type="text" placeholder="금형 및 공구코드를 입력하세요." />
          </div>
          {/* 제품군명 입력 */}
          <div className="form-group">
            <label>금형 및 공구명</label>
            <input type="text" placeholder="금형 및 공구명을 입력하세요." />
          </div>
          {/* 설명 입력 */}
          <div className="form-group">
            <label>금형 및 공구호수수</label>
            <textarea placeholder="금형 및 공구호수를 입력하세요."></textarea>
          </div>
          {/* 설명 입력 */}
          <div className="form-group">
            <label>공장 선택</label>
            <textarea placeholder="공장을 선택하세요."></textarea>
          </div>
          {/* 제품군명 입력 */}
          <div className="form-group">
            <label>관리부서</label>
            <input type="text" placeholder="Eo No.를 입력하세요." />
          </div>
          <div className="form-group">
            <label>이미지 파일 업로드</label>
            <input type="text" placeholder="이미지 파일 업로드하세요." />
          </div>
          <div className="form-group">
            <label>설명</label>
            <textarea placeholder="설명을 입력하세요."></textarea>
          </div>
          <div className="form-group">
            <label>품목 선택 </label>
            <input type="text" placeholder="중량을 입력하세요." />
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

export default MoldModal;
