import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <div className="container">
    
    <div className="container_wrapper">
    <button className="btn" id="player">Ask</button>

    </div>
    <div className="canvas_wrapper">

    <Canvas shadows camera={{ position: [0, 0, 6], fov: 10 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
        </Canvas>
    </div>


    </div>
  );
}

export default App;
