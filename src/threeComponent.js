import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useThreeContext } from './threeHooks';

const ThreeComponent = () => {

    let controls, renderer, scene, camera;
    let el = useRef(null);

    const initScene = () => {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);
    }

    const initCamera = () => {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 25;
        camera.position.y = 20;
        camera.position.x = 0;
    }

    const initRenderer = () => {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        el.current.appendChild(renderer.domElement);
    }

    const addLight = () => {
        let ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);

        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        scene.add(directionalLight);
    }

    const addOrbit = () => {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
    }

    const addEvents = () => {
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate.bind(this));
    }

    useEffect(() => {
        initScene();
        initCamera();
        initRenderer();
        addLight();
        addOrbit();
        addEvents();
        animate();
    }, []);

    let { ref } = useThreeContext()

    useEffect(() => {
        ref.current = scene;
    }, [ref, scene])

    return (
        <div ref={el}></div>
    )
}

export default ThreeComponent;