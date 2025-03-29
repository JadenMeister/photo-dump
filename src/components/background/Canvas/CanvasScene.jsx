import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import "../../../styles/Canvas.css"
import Stars from "../particies/Star/Stars";
import BlueGlow from "../particies/BlueGlow";
import Galaxies from "../particies/Galaxies";


const CanvasScene = () => {
    const mountRef = useRef(null)
    const sceneRef =  useRef(new THREE.Scene())
    const currentRef = mountRef.current
    const width = window.innerWidth
    const height = window.innerHeight


    useEffect(() => {
        const handelResize = () => {

            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        }

        window.addEventListener("resize", handelResize)

        return () =>{
            window.removeEventListener("resize", handelResize)
            currentRef.removeChild(renderer.domElement)
            renderer.dispose()

        }


        // Scene, Camera, Renderer 설정

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,

        })

        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        currentRef.appendChild(renderer.domElement)

        const animate = () =>{
            requestAnimationFrame(animate)
            sceneRef.current.rotation.y += 0.0005
            renderer.render(sceneRef.current, camera)
        }


    }, []);

    // const handleExploreClick = () => {
    //     setShowLogin(true)
    // }

    return (
        <>
        <div className="canvas-container" ref={mountRef}></div>
        <Stars scene={sceneRef.current} />
        <BlueGlow scene={sceneRef.current} />
        <Galaxies scene={sceneRef.current} />
        </>
    )

}

export default CanvasScene;