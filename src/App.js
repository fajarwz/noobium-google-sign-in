import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign-in/google" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
