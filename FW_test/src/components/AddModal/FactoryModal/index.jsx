import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function FactoryModal({ closeModal }) {
  const [factoryCode, setFactoryCode] = useState(""); // 공장 코드 상태
  const [factoryName, setFactoryName] = useState(""); // 공장명 상태
  const [description, setDescription] = useState(""); // 설명 상태
  const [factoryStatus, setFactoryStatus] = useState(false); // 사용 여부 상태
  const [departments, setDepartments] = useState([]); // 사업부 목록 상태
  const [selectedDepartment, setSelectedDepartment] = useState(""); // 선택된 사업부 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태

  // 사업부 목록 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8000/departments") // 사업부 목록 불러오기
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  }, []);

  // 입력값을 FastAPI 서버로 전송하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력값 검증
    if (!factoryCode.trim()) {
      setErrorMessage("공장 코드를 입력해주세요.");
      return;
    }
    if (!factoryName.trim()) {
      setErrorMessage("공장명을 입력해주세요.");
      return;
    }
    if (!selectedDepartment.trim()) {
      setErrorMessage("사업부를 선택해주세요.");
      return;
    }

    // 오류 메시지 초기화
    setErrorMessage("");

    const newFactory = {
      ft_code: factoryCode, // 공장 코드
      ft_name: factoryName, // 공장명
      description: description, // 설명
      ft_status: factoryStatus, // 사용 여부
      DEPARTMENT_NAME: selectedDepartment, // 사업부명
      ft_maker: 1,
      ft_modi: 1,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/factory_tbls",
        newFactory
      );
      console.log("Factory saved", response.data);
      closeModal();
    } catch (error) {
      console.error(
        "Error saving factory",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>공장 등록/수정</h2>
          <div className="toggle-container">
            <label>사용 여부</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={factoryStatus}
                onChange={() => setFactoryStatus(!factoryStatus)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <button className="modal-close" onClick={closeModal}>
            ✖
          </button>
        </div>

        {/* 오류 메시지 표시 */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5>공장을 등록/수정합니다.</h5>
            <h6>공장 정보를 입력하고 관리할 수 있습니다.</h6>
          </div>

          {/* 공장 코드 입력 */}
          <div className="form-group">
            <label>공장 코드 *</label>
            <input
              type="text"
              placeholder="공장 코드를 입력하세요."
              value={factoryCode}
              onChange={(e) => setFactoryCode(e.target.value)}
            />
          </div>

          {/* 공장명 입력 */}
          <div className="form-group">
            <label>공장명 *</label>
            <input
              type="text"
              placeholder="공장명을 입력하세요."
              value={factoryName}
              onChange={(e) => setFactoryName(e.target.value)}
            />
          </div>

          {/* 사업부 선택 */}
          <div className="form-group">
            <label>사업부 *</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">사업부를 선택하세요</option>
              {departments.map((department, index) => (
                <option key={index} value={department.DEPARTMENT_NAME}>
                  {department.DEPARTMENT_NAME}
                </option>
              ))}
            </select>
          </div>

          {/* 설명 입력 */}
          <div className="form-group">
            <label>설명</label>
            <textarea
              placeholder="설명을 입력하세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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

export default FactoryModal;
