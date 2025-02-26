import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function ItemArea() {
  // 예제 데이터 (API에서 가져올 데이터)
  const [Items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 아이템들 상태

  // API 호출로 제품 리스트 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8000/item_tbls")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  }, []);

  // 체크박스 클릭 처리
  const handleCheckboxChange = (item_code, isChecked) => {
    setSelectedItems((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, item_code]; // 선택된 아이템 추가
      } else {
        return prevSelected.filter((code) => code !== item_code); // 선택 해제된 아이템 제거
      }
    });
  };

  // 삭제 처리
  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 아이템을 선택해주세요.");
      return;
    }

    // 삭제 요청
    axios
      .request({
        method: "DELETE",
        url: "http://localhost:8000/delete_items", // 삭제 API 엔드포인트 (아이템 삭제)
        data: { item_codes: selectedItems }, // 선택된 아이템 코드들
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // 삭제 후 아이템 목록에서 해당 아이템들을 제거
        setItems((prevItems) =>
          prevItems.filter((item) => !selectedItems.includes(item.item_code))
        );
        setSelectedItems([]); // 선택된 아이템 초기화
        alert("선택된 아이템이 삭제되었습니다.");
      })
      .catch((error) => {
        console.error("아이템 삭제 실패", error);
        alert("아이템 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>활동</th>
            <th>이미지</th>
            <th>품목코드</th>
            <th>품목명</th>
            <th>제품군코드</th>
            <th>제품군명</th>
            <th>품목분류</th>
            <th>Eo No.</th>
            <th>Eo 날짜</th>
            <th>고객사</th>
            <th>소재</th>
            <th>크기(너비*길이*높이)</th>
            <th>중량(kg)</th>
            <th>설명</th>
          </tr>
        </thead>

        <tbody>
          {Items.map((item, index) => (
            <tr key={item.item_code}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleCheckboxChange(item.item_code, e.target.checked)
                  } // 체크박스 클릭 시 처리
                />
              </td>
              <td>
                <img
                  src={`/assets/uploads/${item.item_images}`}
                  alt="item image"
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{item.pd_code}</td>
              <td>{item.pd_name}</td>
              <td>{item.category_name}</td>
              <td>{item.eo_number}</td>
              <td>{item.eo_date}</td>
              <td>{item.client}</td>
              <td>{item.item_material}</td>
              <td>{item.item_dimensions}</td>
              <td>{item.item_weight}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default ItemArea;
