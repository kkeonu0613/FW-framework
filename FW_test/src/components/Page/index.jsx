import "./index.css";
import PageTitle from "../PageTitle";
import PageContents from "../PageContents";

function Page({ selectedMenu, isModalOpen, setIsModalOpen, category }) {
  return (
    <div>
      <div className="PageTitle">
        <PageTitle selectedMenu={selectedMenu} />
      </div>
      <div className="PageContents">
        <PageContents
          selectedMenu={selectedMenu}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          category={category}
        />
      </div>
    </div>
  );
}

export default Page;
