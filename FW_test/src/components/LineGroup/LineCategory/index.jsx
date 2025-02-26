import "./index.css";
import LineCategoryTitle from "../LineCategoryTitle";
import LineCategoryContents from "../LineCategoryContents";

function LineCategory({ SubTitle }) {
  return (
    <div>
      <div className="LineCategoryTitle">
        <LineCategoryTitle SubTitle={SubTitle} />
      </div>
      <div className="LineCategoryContents">
        <LineCategoryContents />
      </div>
    </div>
  );
}

export default LineCategory;
