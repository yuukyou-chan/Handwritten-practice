import logo from "./logo.svg";
import "./App.css";
import InputNumber from "./component/InputNumber";
import { useState } from "react";

function App() {
  const [value, setValue] = useState();
  return (
    <div className="App">
      <div>{value}</div>
      <InputNumber onChange={setValue}></InputNumber>
    </div>
  );
}

export default App;
