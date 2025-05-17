
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function CameraWithEarth() {
  const mountRef = useRef(null);

  useEffect(() => {
    // 씬, 카메라, 렌더러 세팅
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 조명
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const point = new THREE.PointLight(0xffffff, 1);
    point.position.set(5, 5, 5);
    scene.add(ambient, point);

    // 카메라 바디 (박스)
    const bodyGeo = new THREE.BoxGeometry(4, 2.5, 1.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    scene.add(body);

    // 렌즈 배럴(원통)
    const barrelGeo = new THREE.CylinderGeometry(0.8, 0.8, 1, 32);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(2.3, 0, 0);
    scene.add(barrel);

    // 렌즈 유리(투명 원판)
    const glassGeo = new THREE.CircleGeometry(0.8, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.3,
      roughness: 0,
      transmission: 1,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.rotation.y = Math.PI / 2;
    glass.position.set(2.8, 0, 0);
    scene.add(glass);

    // 지구 구(sphere) + 텍스처
    const loader = new THREE.TextureLoader();
    loader.load(earthTextureUrl, (texture) => {
      const earthGeo = new THREE.SphereGeometry(0.6, 32, 32);
      const earthMat = new THREE.MeshStandardMaterial({ map: texture });
      const earth = new THREE.Mesh(earthGeo, earthMat);
      earth.position.set(2.8, 0, 0);
      scene.add(earth);
    });

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // 언마운트시 정리
    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
      <div
          ref={mountRef}
          className="w-full h-[400px] bg-gray-100 rounded-lg shadow-lg"
      />
  );
}