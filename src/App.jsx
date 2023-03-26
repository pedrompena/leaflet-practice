import { useState } from "react";
import { Maps, SearchBox } from "./components";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  console.log(selectPosition);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ height: "100%", flex: 3 }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ flex: 1 }}>
        <SearchBox setSelectPosition={setSelectPosition} />
      </div>
    </div>
  );
}
export default App;
