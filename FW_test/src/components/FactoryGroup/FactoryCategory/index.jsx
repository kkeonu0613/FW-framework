import "./index.css";
import FactoryCategoryTitle from "../FactoryCategoryTitle";
import FactoryCategoryContents from "../FactoryCategoryContents";

function FactoryCategory({ SubTitle }) {
  return (
    <div>
      <div className="FactoryCategoryTitle">
        <FactoryCategoryTitle SubTitle={SubTitle} />
      </div>
      <div className="FactoryCategoryContents">
        <FactoryCategoryContents />
      </div>
    </div>
  );
}

export default FactoryCategory;
