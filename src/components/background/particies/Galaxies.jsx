import {useEffect} from "react";
import * as THREE from "three";



const Galaxies =({scene})=>{
    useEffect(()=>{
        // 원거리 은하 효과 추가
        const galaxyGeometry = new THREE.BufferGeometry()
        const galaxyMaterial = new THREE.PointsMaterial({
            color: 0x8888ff,
            size: 0.2,
            transparent: true,
            opacity: 0.6,
        })

        const galaxyPositions = []
        const galaxyCount = 1000

        for (let i = 0; i < galaxyCount; i++) {
            const radius = 100 + Math.random() * 900
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI - Math.PI / 2

            const x = radius * Math.cos(theta) * Math.cos(phi)
            const y = radius * Math.sin(phi)
            const z = radius * Math.sin(theta) * Math.cos(phi)

            galaxyPositions.push(x, y, z)
        }

        galaxyGeometry.setAttribute("position", new THREE.Float32BufferAttribute(galaxyPositions, 3))

        const galaxies = new THREE.Points(galaxyGeometry, galaxyMaterial)
        scene.add(galaxies)

    },[scene])
}

export default Galaxies;