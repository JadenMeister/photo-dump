import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef } from "react";

const Earth = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, w / h, 0.1, 10);
    camera.position.z = 2.5;
    //  카메라의 x, y, z 좌표
    camera.position.set(1, 2, 1);
    // 카메라가 바라보는 지점의 x, y, z 좌표
    camera.lookAt(2, 3, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    controls.enableZoom = false;

    const geo = new THREE.SphereGeometry(1, 64, 64);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/images/earthTexture.jpg");

    const mat = new THREE.MeshStandardMaterial({
      map: earthTexture, // 지구 텍스처 적용
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.0);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
    scene.add(hemiLight);

    function animate(t = 0) {
      requestAnimationFrame(animate); // 애니메이션이 부드럽게 보여지도록
      mesh.rotation.y = t * 0.0001; // 매 프레임마다 y축으로 회전
      controls.update();
      renderer.render(scene, camera); //반복 호출 (애니메이션)
    }
    animate();
    return () => {
      const currentRef = mountRef.current;
      if (currentRef && currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Earth;
