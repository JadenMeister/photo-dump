import {useEffect} from "react";
import * as THREE from "three";

const BlueGlow = ({scene}) => {
    useEffect(()=>{

        // 푸른 빛 효과 (간단한 파티클 시스템)
        const blueGlowGeometry = new THREE.BufferGeometry()
        const blueGlowMaterial = new THREE.PointsMaterial({
            color: 0o73777,
            size: 0.3,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
        })

        const blueGlowPositions = []
        const blueGlowCount = 500

        for (let i = 0; i < blueGlowCount; i++) {
            // 화면 오른쪽에 집중된 파티클
            const x = Math.random() * 50 + 20
            const y = (Math.random() - 0.5) * 30
            const z = (Math.random() - 0.5) * 30

            blueGlowPositions.push(x, y, z)
        }

        blueGlowGeometry.setAttribute("position", new THREE.Float32BufferAttribute(blueGlowPositions, 3))

        const blueGlow = new THREE.Points(blueGlowGeometry, blueGlowMaterial)
        scene.add(blueGlow)

        return () => {
            scene.remove(blueGlow)
            blueGlowGeometry.dispose()
            blueGlowMaterial.dispose()
        }

    },[scene])
}

export default BlueGlow;