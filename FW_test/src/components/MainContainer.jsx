import Nav from "./Nav";
import Page from "./Page";

function MainContainer({
  selectedMenu,
  isModalOpen,
  setIsModalOpen,
  category,
}) {
  return (
    <div>
      <div className="Nav">
        <Nav />
      </div>
      <div className="Page">
        <Page
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedMenu={selectedMenu}
          category={category}
        />
      </div>
    </div>
  );
}

export default MainContainer;
