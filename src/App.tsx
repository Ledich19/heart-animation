import './App.css'
import Animation1 from './components/Animation_1';
import Animation2 from './components/Animation_2';
import Animation3 from './components/Animation_3';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Animation3 />} />
        <Route path="animation_1" element={<Animation1 />} />
        <Route path="animation_2" element={<Animation2 />} />
        <Route path="animation_3" element={<Animation3 />} />

      </Routes>
    </>
  );
}

export default App;

