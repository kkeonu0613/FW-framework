import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function ProcessArea() {
  // 예제 데이터 (API에서 가져올 데이터)
  const [Processs, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/process_tbls")
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
            <th>공정코드</th>
            <th>공정명</th>
            <th>사업부</th>
            <th>설명</th>
          </tr>
        </thead>

        <tbody>
          {Processs.map((item, index) => (
            <tr key={item.pc_code}>
              <td>{index + 1}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.pc_code}</td>
              <td>{item.pc_name}</td>
              <td>{item.DEPARTMENT_NAME}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProcessArea;
