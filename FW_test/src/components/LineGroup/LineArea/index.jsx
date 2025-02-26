import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function LineArea() {
  // 예제 데이터 (API에서 가져올 데이터)
  const [Lines, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/line_tbls")
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
            <th>라인코드</th>
            <th>라인명</th>
            <th>공장명</th>
            <th>설명</th>
          </tr>
        </thead>

        <tbody>
          {Lines.map((item, index) => (
            <tr key={item.li_code}>
              <td>{index + 1}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.li_code}</td>
              <td>{item.li_name}</td>
              <td>{item.ft_code}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default LineArea;
