import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function EquipmentArea() {
  // 예제 데이터 (API에서 가져올 데이터)
  const [Equipments, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/equipment_tbls")
      .then((response) => {
        // 응답받은 데이터를 상태로 설정
        setItems(response.data);
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>활동</th>
            <th>이미지</th>
            <th>설비종류</th>
            <th>설비코드</th>
            <th>설비명</th>
            <th>공장명</th>
            <th>제작사</th>
            <th>공급사</th>
            <th>모델번호</th>
            <th>설치일</th>
            <th>설명</th>
          </tr>
        </thead>

        <tbody>
          {Equipments.map((item, index) => (
            <tr key={item.eq_code}>
              <td>{index + 1}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.eq_images}</td>
              <td>{item.eq_type}</td>
              <td>{item.eq_code}</td>
              <td>{item.eq_name}</td>
              <td>{item.ft_code}</td>
              <td>{item.eq_make}</td>
              <td>{item.eq_supplier}</td>
              <td>{item.eq_model}</td>
              <td>{item.eq_date}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default EquipmentArea;
