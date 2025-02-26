import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function ItemModal({ closeModal }) {
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [eoNumber, setEoNumber] = useState("");
  const [eoDate, setEoDate] = useState("");
  const [client, setClient] = useState("");
  const [itemMaterial, setItemMaterial] = useState("");
  const [itemDimensions, setItemDimensions] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [itemStatus, setItemStatus] = useState(false);
  const [itemImagePath, setItemImagePath] = useState(""); // 이미지 경로
  const [imagePreview, setImagePreview] = useState(""); // 이미지 미리보기 URL

  // 제품군 코드 및 품목분류 목록 불러오기
  const [productCodes, setProductCodes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product_tbls")
      .then((response) => setProductCodes(response.data))
      .catch((error) => console.error("API 호출 실패", error));

    axios
      .get("http://localhost:8000/product_categories")
      .then((response) => setProductCategories(response.data))
      .catch((error) => console.error("API 호출 실패", error));
  }, []);

  // 이미지 변경 핸들러
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // 이미지 업로드 API 호출
        const uploadResponse = await axios.post(
          "http://localhost:8000/upload_image", // FastAPI 이미지 업로드 API
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // 서버에서 반환된 이미지 경로
        const uploadedFilePath = uploadResponse.data.filePath;

        // 이미지 경로 저장
        setItemImagePath(uploadedFilePath); // React state에 이미지 경로 저장

        // 이미지 미리보기
        setImagePreview(URL.createObjectURL(file)); // 미리보기 URL 설정
      } catch (error) {
        console.error("이미지 업로드 실패", error);
        setErrorMessage("이미지 업로드에 실패했습니다.");
      }
    }
  };
  // **품목 저장 핸들러**
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemCode.trim()) return setErrorMessage("품목 코드를 입력해주세요.");
    if (!itemName.trim()) return setErrorMessage("품목명을 입력해주세요.");
    if (!categoryName.trim())
      return setErrorMessage("품목분류를 입력해주세요.");

    setErrorMessage("");

    const eoTimestamp = eoDate ? new Date(eoDate).toISOString() : null;

    const newItem = {
      item_code: itemCode,
      item_name: itemName,
      category_name: categoryName,
      pd_code: productCode,
      eo_number: eoNumber,
      eo_date: eoTimestamp,
      client: client,
      item_material: itemMaterial,
      item_dimensions: itemDimensions,
      item_weight: itemWeight,
      description: description,
      item_status: itemStatus,
      item_images: itemImagePath, // 업로드된 이미지 경로
      item_maker: 1,
      item_modi: 1,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/item_tbls",
        newItem
      );
      console.log("Item saved", response.data);
      closeModal();
    } catch (error) {
      console.error("Error saving item", error.response?.data || error.message);
      setErrorMessage("품목 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>품목 등록/수정</h2>
          <div className="toggle-container">
            <label>사용 여부</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={itemStatus}
                onChange={() => setItemStatus(!itemStatus)}
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
            <h5>품목을 등록/수정합니다.</h5>
            <h6>품목 정보를 입력하고 관리할 수 있습니다.</h6>
          </div>

          {/* 품목코드 입력 */}
          <div className="form-group">
            <label>품목코드 *</label>
            <input
              type="text"
              placeholder="품목코드를 입력하세요."
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </div>

          {/* 품목명 입력 */}
          <div className="form-group">
            <label>품목명 *</label>
            <input
              type="text"
              placeholder="품목명을 입력하세요."
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          {/* 품목분류 입력 (드롭다운 목록) */}
          <div className="form-group">
            <label>품목분류 *</label>
            <select
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              <option value="">품목분류를 선택하세요</option>
              {productCategories.map((category, index) => (
                <option key={index} value={category.category_name}>
                  {category.category_name} - {category.category_path}
                </option>
              ))}
            </select>
          </div>

          {/* 제품군 코드 선택 */}
          <div className="form-group">
            <label>제품군 *</label>
            <select
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            >
              <option value="">제품군을 선택하세요</option>
              {productCodes.map((product, index) => (
                <option key={index} value={product.pd_code}>
                  {product.pd_name}
                </option>
              ))}
            </select>
          </div>

          {/* Eo No. 입력 */}
          <div className="form-group">
            <label>Eo No.</label>
            <input
              type="text"
              placeholder="Eo 번호를 입력하세요."
              value={eoNumber}
              onChange={(e) => setEoNumber(e.target.value)}
            />
          </div>

          {/* Eo 날짜 입력 */}
          <div className="form-group">
            <label>Eo 날짜</label>
            <input
              type="date"
              value={eoDate}
              onChange={(e) => setEoDate(e.target.value)}
            />
          </div>

          {/* 고객사 입력 */}
          <div className="form-group">
            <label>고객사</label>
            <input
              type="text"
              placeholder="고객사를 입력하세요."
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>

          {/* 소재 입력 */}
          <div className="form-group">
            <label>소재</label>
            <input
              type="text"
              placeholder="소재를 입력하세요."
              value={itemMaterial}
              onChange={(e) => setItemMaterial(e.target.value)}
            />
          </div>

          {/* 크기 입력 */}
          <div className="form-group">
            <label>크기</label>
            <input
              type="text"
              placeholder="크기를 입력하세요."
              value={itemDimensions}
              onChange={(e) => setItemDimensions(e.target.value)}
            />
          </div>

          {/* 중량 입력 */}
          <div className="form-group">
            <label>중량</label>
            <input
              type="text"
              placeholder="중량을 입력하세요."
              value={itemWeight}
              onChange={(e) => setItemWeight(e.target.value)}
            />
          </div>

          {/* 이미지파일 업로드 */}
          <div className="form-group">
            <label>이미지파일 업로드</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="미리보기" width="100" />
              </div>
            )}
          </div>

          {/* 설명 입력 */}
          <div className="form-group">
            <label>설명</label>
            <textarea
              placeholder="품목에 대한 설명을 입력하세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 버튼 그룹 */}
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              취소
            </button>
            <button type="submit" className="submit-btn">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemModal;
