import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import "../../../styles/Canvas.css"
import Stars from "../particies/Star/Stars";
import Galaxies from "../particies/Galaxies";
import Earth from "./Earth";
import CameraWithEarth from "../../../../3DModules/Camera.jsx";


const CanvasScene = () => {
    const mountRef = useRef(null)
    const sceneRef =  useRef(new THREE.Scene())
    const rendererRef = useRef(null)
    const cameraRef = useRef(null)

    // 회전 별도 분리를 위한 그룹 나누기 작업
    const earthSection = useRef(new THREE.Group())
    const backgroundSection = useRef(new THREE.Group())

    useEffect(() => {
        const currentRef = mountRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;



        //카메라 초기화 및 별 생성 ( 카메라가 보는 세로 시야각, 종횡비, 근거리 클리핑, 원거리 클리핑 순서)
        const isMobile = window.innerWidth < 768;
        cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
        cameraRef.current.position.z = 5;

        // 랜더러 초기화
        rendererRef.current = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        rendererRef.current.setSize(width, height)
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        currentRef.appendChild(rendererRef.current.domElement);

        sceneRef.current.add(earthSection.current)
        sceneRef.current.add(backgroundSection.current)

        // 애니메이션 추가
        const animate = () =>{
            requestAnimationFrame(animate)
            backgroundSection.current.rotation.x = 0
            backgroundSection.current.rotation.y += 0.0009 // 매 프레임마다 y축으로 회전 (배경만)
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
        <div ref={mountRef}></div>

            {/*그룹화 작업 적용 테스트}*/}
        <Stars scene={backgroundSection.current} />
        <Galaxies scene={backgroundSection.current} />
            <Earth  scene={earthSection.current} />
            {/*<CameraWithEarth parent={earthSection.current} />*/}

        </>
    )

}

export default CanvasScene;