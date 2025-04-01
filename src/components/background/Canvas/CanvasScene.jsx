import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import "../../../styles/Canvas.css"
import Stars from "../particies/Star/Stars";
import Galaxies from "../particies/Galaxies";
import Earth from "./Earth";


const CanvasScene = () => {
    const mountRef = useRef(null)
    const sceneRef =  useRef(new THREE.Scene())
    const rendererRef = useRef(null)
    const cameraRef = useRef(null)

    useEffect(() => {
        const currentRef = mountRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;



        //카메라 초기화
        cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        cameraRef.current.position.z = 5;

        // 랜더러 초기화
        rendererRef.current = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        rendererRef.current.setSize(width, height)
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))


        currentRef.appendChild(rendererRef.current.domElement);


        // 애니메이션 추가
        const animate = () =>{
            requestAnimationFrame(animate)
            sceneRef.current.rotation.x = 0
            sceneRef.current.rotation.y += 0.0005
            // sceneRef.current.rotation.z += 0.0005
            rendererRef.current.render(sceneRef.current, cameraRef.current)
        }
        animate()

        const handelResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            cameraRef.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        };

        window.addEventListener("resize", handelResize)

        return () =>{
            window.removeEventListener("resize", handelResize)
            if(currentRef && currentRef.contains(rendererRef.current.domElement)){
                currentRef.removeChild(rendererRef.current.domElement)
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }

        }


    }, []);



    return (
        <>
        <div className="canvas-container" ref={mountRef}></div>
        <Stars scene={sceneRef.current} />
        <Galaxies scene={sceneRef.current} />
            <Earth scene={sceneRef.current}/>
        </>
    )

}

export default CanvasScene;