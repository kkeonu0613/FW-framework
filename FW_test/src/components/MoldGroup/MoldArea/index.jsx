import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function MoldArea() {
  // 예제 데이터 (API에서 가져올 데이터)
  const [Molds, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/mold_tbls")
      .then((response) => {
        // 응답받은 데이터를 상태로 설정
        setItems(response.data);
      })
      .catch((error) => {
        console.error("API 호출 실패", error);
      });
  }, []);
  console.log(Molds);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>활동</th>
            <th>이미지</th>
            <th>금형 및 공구코드</th>
            <th>금형 및 공구명</th>
            <th>금형 및 공구호수</th>
            <th>공장명</th>
            <th>관리부서</th>
            <th>설명</th>
          </tr>
        </thead>

        <tbody>
          {Molds.map((item) => (
            <tr key={item.md_code}>
              <td>{item.md_code}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.md_images}</td>
              <td>{item.md_code}</td>
              <td>{item.md_tool_name}</td>
              <td>{item.md_tool_number}</td>
              <td>{item.ft_code}</td>
              <td>{item.md_depart}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MoldArea;
