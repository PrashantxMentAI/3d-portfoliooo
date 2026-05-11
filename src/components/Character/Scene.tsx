import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Model from "./Model";
import FloatingObjects from "./FloatingObjects";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import { useLoading } from "../../context/LoadingProvider";

function GsapIntegration({ character }: { character: THREE.Object3D | null }) {
  const { camera } = useThree();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (character && camera && !initialized) {
      setCharTimeline(character, camera as THREE.PerspectiveCamera);
      setAllTimeline();
      setInitialized(true);
    }
  }, [character, camera, initialized]);

  return null;
}

const Scene = () => {
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const [character, setCharacter] = useState<THREE.Object3D | null>(null);

  useLoading();

  useEffect(() => {
    // Legacy support for landing touch events if needed
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      // we can handle touch starts here if needed
    }
  }, []);

  return (
    <>
      <div className="character-container" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 10, pointerEvents: "none" }}>
        <div className="character-model" style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef} style={{ pointerEvents: "auto" }}></div>
          <Canvas
            gl={{ 
              antialias: true, 
              alpha: true, 
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
              stencil: false,
              powerPreference: "high-performance"
            }}
            dpr={[1, 2]}
          >
            <PerspectiveCamera makeDefault position={[0, 13.1, 24.7]} fov={14.5} zoom={1.1} />
            <ambientLight intensity={0.5} />
            <pointLight position={[-10, 5, 10]} intensity={1.5} color="#d946ef" />
            <directionalLight position={[10, 10, 5]} intensity={2.0} color="#fbcfe8" castShadow />
            <Environment preset="city" environmentIntensity={0.6} />

            <Model hoverRef={hoverDivRef} onLoaded={(scene: THREE.Object3D) => setCharacter(scene)} />

            <EffectComposer>
              <Bloom 
                luminanceThreshold={1.0} 
                mipmapBlur 
                intensity={0.5} 
              />
            </EffectComposer>

            <GsapIntegration character={character} />
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default Scene;
