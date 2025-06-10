
import { useEffect, useRef } from "react"
import * as THREE from "three"
import Stars from "../particies/Star/Stars";
import Galaxies from "../particies/Galaxies";
import Earth from "./Earth";



const CanvasScene = ({ setAnimationComplete }) => {
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

        // 카메라 초기화 (카메라가 보는 세로 시야각, 종횡비, 근거리 클리핑, 원거리 클리핑 순서)
        cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
        cameraRef.current.position.z = 5; // 카메라 z 위치 설정

        // 랜더러 초기화
        rendererRef.current = new THREE.WebGLRenderer({
            antialias: true, // 안티엘리어싱 활성화
            alpha: true,     // 배경 투명도 활성화
        });
        rendererRef.current.setSize(width, height); // 렌더러 크기 설정
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 픽셀 비율 설정
        currentRef.appendChild(rendererRef.current.domElement); // DOM에 렌더러의 캔버스 추가

        // 씬에 지구와 배경 섹션을 추가합니다.
        sceneRef.current.add(earthSection.current);
        sceneRef.current.add(backgroundSection.current);

        // 애니메이션 루프
        const animate = () =>{
            requestAnimationFrame(animate); // 브라우저의 다음 프레임에 애니메이션 호출을 요청합니다.

            // 배경만 회전시킵니다. 지구는 Earth 컴포넌트 내부에서 자체적으로 애니메이션합니다.
            backgroundSection.current.rotation.x = 0;
            backgroundSection.current.rotation.y += 0.000009; // 매 프레임마다 y축으로 회전

            // 씬을 렌더링합니다.
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        animate(); // 애니메이션 시작

        // 리사이즈 이벤트 핸들러
        const handelResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            cameraRef.current.aspect = width / height; // 카메라 종횡비 업데이트
            cameraRef.current.updateProjectionMatrix(); // 카메라 투영 행렬 업데이트
            rendererRef.current.setSize(width, height); // 렌더러 크기 업데이트
        };

        window.addEventListener("resize", handelResize); // 리사이즈 이벤트 리스너 추가

        // 클린업 함수
        return () =>{
            window.removeEventListener("resize", handelResize); // 이벤트 리스너 제거
            // DOM에서 렌더러의 캔버스 제거
            if(currentRef && currentRef.contains(rendererRef.current.domElement)){
                currentRef.removeChild(rendererRef.current.domElement);
            }
            // 렌더러 리소스 해제
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        }
    }, []);


    return (
        <>
            <div ref={mountRef}></div>
            {/* 배경 요소들 */}
            <Stars scene={backgroundSection.current} />
            <Galaxies scene={backgroundSection.current} />
            <Earth
                scene={earthSection.current}
                setAnimationComplete={setAnimationComplete}
            />

        </>
    )
}

export default CanvasScene;
