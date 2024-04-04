import React, { useRef , useState } from 'react'
import { useFrame, useLoader } from "@react-three/fiber";
import {FileLoader,MathUtils} from "three"
import { useEffect, useMemo } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei"


const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};


export function Model(props) {
  const { scene,  nodes, materials ,animations } = useGLTF('660d047d3b585fbcc4fa776a.glb')

  const { animations: idleanimation } = useFBX("animations/Idle (3).fbx");
  const { animations: talkinganimation } = useFBX("animations/Talking (1).fbx" );

  const [animation, setAnimation] = useState("idle");

  const [lypsyncstate , setLypsync ] = useState(null);

  let currentaudio = useRef(null)
  let currentlypsync = useRef(null)


  idleanimation[0].name = "idle";
  talkinganimation[0].name = "talk";

  const group = useRef();
  const { actions } = useAnimations(
    [idleanimation[0], talkinganimation[0]],
    group
  );

  const audio = useMemo(() => new Audio('audio/welcome.mp3'))
  const audio2 = useMemo(() => new Audio('audio/html.mp3'))

  audio.addEventListener("ended",function() {

    setAnimation("idle")

    console.log("aduio ended")

    nodes.Wolf3D_Head.morphTargetInfluences[
      nodes.Wolf3D_Head.morphTargetDictionary["viseme_I"]
    ] = 1;
    nodes.Wolf3D_Teeth.morphTargetInfluences[
      nodes.Wolf3D_Teeth.morphTargetDictionary["viseme_I"]
    ] = 1;


  });

  audio2.addEventListener("ended",function() {

    setAnimation("idle")

    console.log("aduio ended")

    nodes.Wolf3D_Head.morphTargetInfluences[
      nodes.Wolf3D_Head.morphTargetDictionary["viseme_I"]
    ] = 1;
    nodes.Wolf3D_Teeth.morphTargetInfluences[
      nodes.Wolf3D_Teeth.morphTargetDictionary["viseme_I"]
    ] = 1;


  });

  const jsonFile = useLoader(FileLoader,'audio/welcome.json')

  const jsonFile2 = useLoader(FileLoader,'audio/html.json')

  const lipsync = JSON.parse(jsonFile)
  const lipsync2 = JSON.parse(jsonFile2)


  useEffect(() => {

    if(animation && actions[animation]){

      
      actions[animation].reset().fadeIn(0.5).play();

    }

    if(animation === "talk"){
      

      currentaudio.current.play()

    }



    return () => actions[animation].fadeOut(0.5);
  }, [animation]);





  useFrame(() => {



      if(currentlypsync.current) {


        const currentAudioTime = currentaudio.current.currentTime

        Object.values(corresponding).forEach((value) => {
  
          nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[value]] = 0
          nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[value]] = 0
  
        })
  
        for(let i= 0; i < currentlypsync.current.mouthCues.length;i++) {
            const mouthCure = currentlypsync.current.mouthCues[i]
  
  
  
            if(currentAudioTime >= mouthCure.start && currentAudioTime <= mouthCure.end ) {
                console.log(mouthCure.value)
  
                nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[corresponding[mouthCure.value]]] = 
                MathUtils.lerp(
                  nodes.Wolf3D_Head.morphTargetInfluences[
                    nodes.Wolf3D_Head.morphTargetDictionary[
                      corresponding[mouthCure.value]
                    ]
                  ],
                  1,
                  0.5
                );
                
              
                nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[corresponding[mouthCure.value]]] = 
                MathUtils.lerp(
                  nodes.Wolf3D_Teeth.morphTargetInfluences[
                    nodes.Wolf3D_Teeth.morphTargetDictionary[
                      corresponding[mouthCure.value]
                    ]
                  ],
                  1,
                  0.5
                );
                
                break;
  
            }
            // else 
            // {
            //   setAnimation("idle")
  
            // }
  
        }
      }

    

  })

  useEffect(() => {


    document.getElementById("player").addEventListener("click" , () => {
      currentaudio.current = audio2
      currentlypsync.current = lipsync2
      setAnimation("talk")


    })

    document.getElementById("welcome").addEventListener("click" , () => {

      console.log(audio)
      currentaudio.current = audio
      currentlypsync.current = lipsync
      setAnimation("talk")
    })


},[])


  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload('660d047d3b585fbcc4fa776a.glb')