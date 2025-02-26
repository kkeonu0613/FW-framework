import "./index.css";
import ItemCategory from "./ItemCategory";
import ItemContents from "./ItemContents";

function ItemGroup({ isModalOpen, setIsModalOpen, category, SubTitle }) {
  return (
    <div className="test">
      <div className="ItemCategory">
        <ItemCategory SubTitle={SubTitle} />
      </div>
      <div className="ItemContents">
        <ItemContents
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
    </div>
  );
}

export default ItemGroup;
