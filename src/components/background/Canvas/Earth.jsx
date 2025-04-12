import * as THREE from "three";
import { useEffect } from "react";



const Earth = ({ scene }) => {
  useEffect(() => {
    if (!scene) return;
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/images/earthTexture.jpg");

    const mat = new THREE.MeshStandardMaterial({
      map: earthTexture,
    });

    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(2, 0, 1); // 위치 조정 가능
    scene.add(mesh);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    scene.add(hemiLight);

    const animate = () =>{

      // y축으로 이동하며 회전하는 이슈 해결  0410

      requestAnimationFrame(animate); // 애니메이션이 부드럽게 보여지도록
      mesh.rotation.x = 0
      mesh.rotation.y +=  0.003 // 매 프레임마다 y축으로 회전 (지구만)


    }
    animate()



    return () => {
      scene.remove(mesh);
      scene.remove(hemiLight);
      geo.dispose();
      mat.dispose();
    };
  }, [scene]);

  return null;
};

export default Earth;