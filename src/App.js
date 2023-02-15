import "./App.css";
import logo from "./Images/logo.png";
import LearningTool from "./Components/LearningTool";
import { DataProvider } from "./Context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <img src={logo} alt="Weborigo logo" className="logo_image" />
        <LearningTool />
      </DataProvider>
    </div>
  );
}

export default App;
