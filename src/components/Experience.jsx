import { Environment, OrbitControls} from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = ({loaderset}) => {
  return (
    <>
      <OrbitControls />
      <Avatar loaderset={loaderset} />
      <Environment preset="sunset"   background={true} />
      <directionalLight />

    </>
  );
};
