import {useEffect} from "react";
import * as THREE from "three";

//별 배경

const Stars = ({scene}) => {

    useEffect(()=>{

        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,
        });

        const starVertices = [];
        for(let i = 0; i < 15000; i++){
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = -Math.random() * 2000;
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)
        return () => {
            scene.remove(stars)
            starGeometry.dispose()
            starMaterial.dispose()
        }

    },[scene])

    return null;

}

export default Stars;