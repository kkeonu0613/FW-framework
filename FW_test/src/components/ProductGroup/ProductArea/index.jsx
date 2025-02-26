import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function ProductArea({ selectDepartment, category }) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    console.log("선택한 사업부:", selectDepartment);
    const fetchProducts = () => {
      axios
        .get("http://localhost:8000/product_tbls", {
          params: { DEPARTMENT_NAME: selectDepartment },
        })
        .then((response) => {
          console.log("API 응답 데이터:", response.data); // API 응답 출력
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("API 호출 실패", error);
        });
    };
    fetchProducts();
  }, [selectDepartment, category]);

  // 체크박스 클릭 처리
  const handleCheckboxChange = (pd_code, isChecked) => {
    setSelectedProducts((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, pd_code];
      } else {
        return prevSelected.filter((code) => code !== pd_code);
      }
    });
  };

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
      alert("삭제할 제품을 선택해주세요.");
      return;
    }

    // 삭제 요청
    axios
      .request({
        method: "DELETE",
        url: "http://localhost:8000/delete_products",
        data: { pd_codes: selectedProducts }, // FastAPI가 인식할 수 있도록 요청 본문에 데이터 포함
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // 서버에서 삭제가 성공적으로 처리되면, 클라이언트에서 목록 갱신
        setSelectedProducts([]); // 선택된 제품 초기화
        alert("선택된 제품이 삭제되었습니다.");
      })
      .catch((error) => {
        console.error("제품 삭제 실패", error);
        alert("제품 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>활동</th>
            <th>제품군코드</th>
            <th>제품군명</th>
            <th>사업부</th>
            <th>설명</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item, index) => (
            <tr key={item.pd_code}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleCheckboxChange(item.pd_code, e.target.checked)
                  }
                  checked={selectedProducts.includes(item.pd_code)}
                />
              </td>
              <td>{item.pd_code}</td>
              <td>{item.pd_name}</td>
              <td>{item.DEPARTMENT_NAME}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-bar">
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
}

export default ProductArea;
