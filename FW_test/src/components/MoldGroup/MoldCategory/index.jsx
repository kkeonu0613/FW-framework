import "./index.css";
import MoldCategoryTitle from "../MoldCategoryTitle";
import MoldCategoryContents from "../MoldCategoryContents";

function MoldCategory({ SubTitle }) {
  return (
    <div>
      <div className="MoldCategoryTitle">
        <MoldCategoryTitle SubTitle={SubTitle} />
      </div>
      <div className="MoldCategoryContents">
        <MoldCategoryContents />
      </div>
    </div>
  );
}

export default MoldCategory;
