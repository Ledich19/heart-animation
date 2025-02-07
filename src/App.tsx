import './App.css'
import Animation1 from './components/Animation_1';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Animation1 />} />
        <Route path="animation_1" element={<Animation1 />} />
        <Route path="animation_2" element={<Animation1 />} />
      </Routes>
    </>
  );
}

export default App;

