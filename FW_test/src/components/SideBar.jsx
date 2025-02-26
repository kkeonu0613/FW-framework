import React from "react";
import symbolFw from "../components/images/Symbol-fw.svg";
import productFw from "../components/images/product-fw.svg";
import factoryFw from "../components/images/factory-fw.svg";
import processFw from "../components/images/process-fw.svg";

function SideBar({ setSelectedMenu }) {
  return (
    <div>
      <div className="test">
        <img src={symbolFw} alt="Symbol" style={{ marginRight: "10px" }} />
        <p>
          <b>Framework</b>
        </p>
      </div>
      <div className="SideOption">
        <img src={productFw} alt="product" style={{ marginRight: "10px" }} />
        <p>품목정보관리</p>
      </div>
      <ul>
        <li
          onClick={(e) => {
            setSelectedMenu(e.target.innerText);
          }}
        >
          제품군
        </li>
        <li
          onClick={(e) => {
            setSelectedMenu(e.target.innerText);
          }}
        >
          품목
        </li>
      </ul>
      <div className="SideOption">
        <img src={processFw} alt="process" style={{ marginRight: "10px" }} />
        공정정보관리
      </div>
      <ul>
        <li
          onClick={(e) => {
            setSelectedMenu(e.target.innerText);
          }}
        >
          공장
        </li>
        <li
          onClick={(e) => {
            setSelectedMenu(e.target.innerText);
          }}
        >
          라인
        </li>
        <li
          onClick={(e) => {
            setSelectedMenu(e.target.innerText);
          }}
        >
          공정
        </li>
      </ul>
      <div className="SideOption">
        <img src={factoryFw} alt="factory" style={{ marginRight: "10px" }} />
        설비정보관리
      </div>
      <ul>
        <li
          onClick={(e) => {
            setSelectedMenu(e.target.innerText);
          }}
        >
          설비
        </li>
        <li
          onClick={(e) => {
            setSelectedMenu(e.target.innerText);
          }}
        >
          금형
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
