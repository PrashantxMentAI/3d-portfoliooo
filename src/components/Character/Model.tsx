import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { decryptFile } from "./utils/decrypt";
import { typingBoneNames, eyebrowBoneNames } from "../../data/boneData";

export default function Model({ hoverRef, ...props }: any) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const urlBlob = URL.createObjectURL(new Blob([encryptedBlob]));
        setBlobUrl(urlBlob);
      } catch (err) {
        console.error("Failed to decrypt model:", err);
      }
    }
    load();
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  if (!blobUrl) return null;

  return <ModelContent url={blobUrl} hoverRef={hoverRef} {...props} />;
}

function ModelContent({ url, hoverRef, ...props }: any) {
  const group = useRef<THREE.Group>(null);
  // useGLTF takes a second argument for draco decoder path, or true to use default CDN
  const { scene, animations } = useGLTF(url, "/draco/") as any;
  const { actions, mixer } = useAnimations(animations, group);


  // Material setup
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          if (mesh.name === "BODY.SHIRT") {
            const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
            newMat.color = new THREE.Color("#6b21a8"); // Brighter Purple
            newMat.metalness = 0.2;
            newMat.roughness = 0.5;
            mesh.material = newMat;
          } else if (mesh.name === "Pant") {
            const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
            newMat.color = new THREE.Color("#18181b");
            newMat.roughness = 0.8;
            mesh.material = newMat;
          }
        }
        child.castShadow = true;
        child.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });

    const footR = scene.getObjectByName("footR");
    const footL = scene.getObjectByName("footL");
    if (footR) footR.position.y = 3.36;
    if (footL) footL.position.y = 3.36;


    
    if (props.onLoaded) {
      props.onLoaded(scene);
    }
  }, [scene]);

  // Animation Setup
  useEffect(() => {
    if (!actions) return;

    // Introduction Animation
    const introAction = actions["introAnimation"];
    if (introAction) {
      introAction.setLoop(THREE.LoopOnce, 1);
      introAction.clampWhenFinished = true;
      setTimeout(() => {
        introAction.reset().play();
        setTimeout(() => {
          actions["Blink"]?.play().fadeIn(0.5);
        }, 2500);
      }, 2500);
    }

    // Key animations
    ["key1", "key2", "key5", "key6"].forEach((name) => {
      if (actions[name]) {
        actions[name]!.play();
        actions[name]!.timeScale = 1.2;
      }
    });

    // Typing animation (filtering tracks)
    const typingClip = THREE.AnimationClip.findByName(animations as any, "typing");
    if (typingClip) {
      const filteredTracks = typingClip.tracks.filter((track) =>
        typingBoneNames.some((boneName) => track.name.includes(boneName))
      );
      const filteredClip = new THREE.AnimationClip("typing_filtered", typingClip.duration, filteredTracks);
      const typingAction = mixer.clipAction(filteredClip);
      typingAction.enabled = true;
      typingAction.play();
      typingAction.timeScale = 1.2;
    }

    // Hover eyebrow logic
    let eyeBrowUpAction: THREE.AnimationAction | null = null;
    const browClip = THREE.AnimationClip.findByName(animations as any, "browup");
    if (browClip) {
      const filteredTracks = browClip.tracks.filter((track) =>
        eyebrowBoneNames.some((boneName) => track.name.includes(boneName))
      );
      const filteredBrowClip = new THREE.AnimationClip("browup_filtered", browClip.duration, filteredTracks);
      eyeBrowUpAction = mixer.clipAction(filteredBrowClip);
      eyeBrowUpAction.setLoop(THREE.LoopOnce, 1);
      eyeBrowUpAction.clampWhenFinished = true;
    }

    let isHovering = false;
    const onHoverFace = () => {
      if (eyeBrowUpAction && !isHovering) {
        isHovering = true;
        eyeBrowUpAction.reset();
        eyeBrowUpAction.enabled = true;
        eyeBrowUpAction.setEffectiveWeight(4);
        eyeBrowUpAction.fadeIn(0.5).play();
      }
    };
    const onLeaveFace = () => {
      if (eyeBrowUpAction && isHovering) {
        isHovering = false;
        eyeBrowUpAction.fadeOut(0.6);
      }
    };

    if (hoverRef && hoverRef.current) {
      hoverRef.current.addEventListener("mouseenter", onHoverFace);
      hoverRef.current.addEventListener("mouseleave", onLeaveFace);
    }

    return () => {
      if (hoverRef && hoverRef.current) {
        hoverRef.current.removeEventListener("mouseenter", onHoverFace);
        hoverRef.current.removeEventListener("mouseleave", onLeaveFace);
      }
    };
  }, [actions, animations, mixer, hoverRef]);



  return <primitive object={scene} ref={group} {...props} />;
}

// Ensure Drei preloads the draco decoder
// useGLTF.preload("/models/character.enc?v=2", "/draco/");
