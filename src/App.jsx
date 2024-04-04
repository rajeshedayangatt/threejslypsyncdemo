import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useEffect, useState } from "react";

function App() {

  const [loader , setLoader ] = useState(0);
  const [showLoader , setShowLoader ] = useState(true);


  const handleLoadercount = (count) => {

    if(count > 99) {
      setShowLoader(false)
    }

  }

  return (
    <div className="container">

      
      
      <div className="container_wrapper" style={{ display : showLoader ? "none" : "block"}}>
        <button className="btn" id="welcome">Welcome</button>

        <button className="btn" id="player">Ask</button>
        </div>
        <div className="canvas_wrapper">

        <Canvas shadows camera={{ position: [0, 0, 6], fov: 10 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience loaderset={handleLoadercount} />
        </Canvas>
      </div>

    <div class="loading-page" style={{ display : showLoader ? "flex" : "none"}}>
      <div class="counter">
        <p>loading</p>
        {/* <h1>{loader}%</h1> */}
        <hr/>
      </div>
    </div>
    </div>
  );
}

export default App;
