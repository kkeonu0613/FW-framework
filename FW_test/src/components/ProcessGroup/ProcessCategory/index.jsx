import "./index.css";
import ProcessCategoryTitle from "../ProcessCategoryTitle";
import ProcessCategoryContents from "../ProcessCategoryContents";

function ProcessCategory({ SubTitle }) {
  return (
    <div>
      <div className="ProcessCategoryTitle">
        <ProcessCategoryTitle SubTitle={SubTitle} />
      </div>
      <div className="ProcessCategoryContents">
        <ProcessCategoryContents />
      </div>
    </div>
  );
}

export default ProcessCategory;
