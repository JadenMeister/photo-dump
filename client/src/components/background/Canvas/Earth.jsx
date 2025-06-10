import * as THREE from "three";
import { useEffect } from "react";

const Earth = ({ scene, setAnimationComplete }) => {
  useEffect(() => {
    if (!scene) return;

    const isMobile = window.innerWidth < 768;

    const geo = new THREE.SphereGeometry(isMobile ? 0.6 : 1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/images/earthTexture.jpg"); // 지구 텍스처 로드

    const mat = new THREE.MeshStandardMaterial({
      map: earthTexture,
    });

    const mesh = new THREE.Mesh(geo, mat);

    // 초기 위치 설정 (화면 중앙)
    // 0,0,0은 씬의 중앙을 의미합니다.
    const initialPosition = {
      x: 0,
      y: 0,
      z: 0
    };

    // 최종 위치 설정
    // 데스크톱: 화면 오른쪽에 지구 하나 정도의 여백을 두고 배치.
    // 모바일: 화면 중앙에 배치. (카메라와 지구 크기에 따라 미세 조정 필요)
    const finalPosition = {
      x: isMobile ? 0 : 0, // 모바일: x축 중앙, 데스크톱: x축 오른쪽으로 이동
      y: isMobile ? 0 : 0,   // 모바일: y축 중앙, 데스크톱: y축 중앙
      z: isMobile ? 0 : 2    // 모바일: z축 중앙, 데스크톱: z축 살짝 앞으로 (원근감)
    };

    // 초기 위치 설정 후 씬에 지구 mesh를 추가합니다.
    mesh.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    scene.add(mesh);

    // 반구형 광원 추가 (빛 효과)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemiLight);

    // 애니메이션 변수 설정
    let startTime = Date.now();
    const animationDuration = 2000; // 2초 애니메이션
    let isAnimating = true;

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);

      // 지구 회전 (x축은 0으로 고정, y축으로만 회전)
      mesh.rotation.x = 0;
      mesh.rotation.y += 0.0009;

      // 초기 2초 동안만 위치 애니메이션을 수행합니다.
      if (isAnimating) {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1); // 0에서 1 사이의 진행도

        const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easedProgress = easeInOut(progress);

        // 현재 위치를 계산하여 업데이트합니다.
        mesh.position.x = initialPosition.x + (finalPosition.x - initialPosition.x) * easedProgress;
        mesh.position.y = initialPosition.y + (finalPosition.y - initialPosition.y) * easedProgress;
        mesh.position.z = initialPosition.z + (finalPosition.z - initialPosition.z) * easedProgress;

        // 애니메이션 완료 체크
        if (progress >= 1) {
          isAnimating = false; // 애니메이션 중지
          mesh.position.set(finalPosition.x, finalPosition.y, finalPosition.z); // 최종 위치로 확정
          if (setAnimationComplete) {
            setAnimationComplete(true); // SpaceBackground에 애니메이션 완료를 알립니다.
          }
        }
      }
    };
    animate(); // 애니메이션 시작

    // 클린업 함수
    return () => {
      scene.remove(mesh); // 지구 mesh 제거
      scene.remove(hemiLight); // 광원 제거
      geo.dispose(); // 지오메트리 리소스 해제
      mat.dispose(); // 재질 리소스 해제
    };
  }, [scene, setAnimationComplete]);

  return null;
};

export default Earth;
