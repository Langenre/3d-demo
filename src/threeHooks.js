import { useState, useRef, useCallback, useMemo } from "react";
import constate from "constate";
import * as THREE from "three";

const cubeGeo = new THREE.BoxGeometry(5, 0.5, 5);

function useThree() {
    const [type, setType] = useState(1)
    const [height, setHeight] = useState(1);
    const [anzl, setAnzl] = useState(1);
    const [anzjl, setAnzjl] = useState(1);
    const [objects, setObjects] = useState([]);
    const ref = useRef(null);

    const cubeMaterial = useMemo(() => {
        switch (type) {
            case 1: return new THREE.MeshPhongMaterial({ color: new THREE.Color("#BBDEFB") });
            case 2: return new THREE.MeshPhongMaterial({ color: new THREE.Color("#455A64") });
            case 3: return new THREE.MeshPhongMaterial({ color: new THREE.Color("#607D8B") });
            case 4: return new THREE.MeshPhongMaterial({ color: new THREE.Color("#BDBDBD") });
            default: break;
        }
    }, [type])

    const add = useCallback(() => {
        if (anzjl === 1) {
            for (let i = 0; i < anzl; i++) {
                const cube = new THREE.Mesh(cubeGeo, cubeMaterial);
                cube.position.set(0, height, 0);
                ref.current.add(cube);
                setObjects(o => ([...o, cube.uuid]))
            }
            setHeight(h => h + anzl);
        }

        if (anzjl === 4) {
            const geometry = new THREE.BoxGeometry(2.3, 0.5, 2.3);
            for (let i = 0; i < anzl; i++) {
                let cube1 = new THREE.Mesh(geometry, cubeMaterial);
                cube1.position.set(-1.35, height + i, -1.35);
                ref.current.add(cube1);

                var cube2 = new THREE.Mesh(geometry, cubeMaterial);
                cube2.position.set(-1.35, height + i, 1.35);
                ref.current.add(cube2);

                var cube3 = new THREE.Mesh(geometry, cubeMaterial);
                cube3.position.set(1.35, height + i, -1.35);
                ref.current.add(cube3);

                var cube4 = new THREE.Mesh(geometry, cubeMaterial);
                cube4.position.set(1.35, height + i, 1.35);
                ref.current.add(cube4);

                setObjects(o => ([...o, cube1.uuid, cube2.uuid, cube3.uuid, cube4.uuid]))
            }
            setHeight(h => h + anzl);
        }

    }, [ref, height, setHeight, setObjects, anzjl, anzl, cubeMaterial])

    const remove = useCallback(() => {
        const object = ref.current.getObjectByProperty('uuid', objects[objects.length - 1]);
        object.geometry.dispose();
        object.material.dispose();
        ref.current.remove(object);
        setObjects(o => o.slice(0, -1));
        setHeight(h => h - 1);
    }, [objects, setObjects, ref])

    return { type, setType, anzl, setAnzl, anzjl, setAnzjl, ref, add, remove };
}

const [ThreeProvider, useThreeContext] = constate(useThree);

export { ThreeProvider, useThreeContext }
