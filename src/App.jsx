import "./App.css";
import Home from "./components/Home";
import Database from "./components/Database";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [form, setForm] = useState(0);
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home form={form} setForm={setForm} />} />
          <Route
            path="/db/*"
            element={<Database form={form} setForm={setForm} />}
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
