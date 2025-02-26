import "./index.css";

function PageTitle({ selectedMenu }) {
  let category = "";
  if (["제품군", "품목"].includes(selectedMenu)) {
    category = "품목정보관리";
  } else if (["공장", "라인", "공정"].includes(selectedMenu)) {
    category = "공정정보관리";
  } else if (["설비", "금형"].includes(selectedMenu)) {
    category = "설비정보관리";
  }
  return (
    <div className="page-title-container">
      <div className="page-title">
        <h3>&nbsp;&nbsp;&nbsp;{selectedMenu}</h3>
        <span>｜</span>
        <h6>생산정보관리 &nbsp;</h6>
        <span> &gt; </span>
        <h6> &nbsp;{category} &nbsp;</h6>
        <span> &gt; </span>
        <h6> &nbsp;&nbsp;&nbsp;{selectedMenu}</h6>
      </div>
    </div>
  );
}

export default PageTitle;
