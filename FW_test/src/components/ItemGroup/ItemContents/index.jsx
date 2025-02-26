import "./index.css";
import ItemBar from "../ItemBar";
import ItemArea from "../ItemArea";
import ItemWrapper from "../ItemWrapper";

function ItemContents({ isModalOpen, setIsModalOpen, category }) {
  return (
    <div>
      <div className="ItemBar">
        <ItemBar
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
      <div className="ItemArea">
        <ItemArea />
      </div>
      <div className="ItemWrapper">
        <ItemWrapper />
      </div>
    </div>
  );
}

export default ItemContents;
