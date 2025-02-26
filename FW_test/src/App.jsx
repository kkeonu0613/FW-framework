import { useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import MainContainer from "./components/MainContainer";
import PageTitle from "./components/PageTitle";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("제품군");

  // 제품군 추가 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const category = selectedMenu;
  return (
    <div className="App">
      <div className="SideBar">
        <SideBar setSelectedMenu={setSelectedMenu} />
      </div>
      <div className="MainContainer">
        <MainContainer
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          selectedMenu={selectedMenu}
          category={category}
        />
      </div>
    </div>
  );
}

export default App;
