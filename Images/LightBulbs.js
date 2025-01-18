import { randFloat } from "three/src/math/MathUtils.js";
import { max } from "three/tsl";
import * as THREE from 'three';
import gsap from 'gsap';

export default class LightBulbs{
    constructor(scene,Amount,minX,minZ,maxX,maxZ,intensity,angle,pen){
        this.LightbulbList = [];
        this.minX = minX,
        this.minZ = minZ,
        this.MaxX = maxX,
        this.MaxZ = maxZ
        const discoLightOriginal = new THREE.SpotLight();
        discoLightOriginal.angle = angle;
        discoLightOriginal.penumbra = pen;
        discoLightOriginal.intensity = intensity;
        for(let i = 0; i < Amount; i++)
        {
            //Making Random LightBulbs that goes fly around
            const discoLight = discoLightOriginal.clone();
            discoLight.color.set(new THREE.Color(Math.random(),Math.random(),Math.random()))
            const x = randFloat(this.minX,this.MaxX);
            const z = randFloat(this.minZ,this.MaxZ);
            discoLight.position.set(x,4,z);
            discoLight.target.position.set(x,0,z)
            setInterval(()=>
            {
                const time = randFloat(2,4)
                const NewX  = randFloat(this.minX,this.MaxX);
                const NewZ = randFloat(this.minZ,this.MaxZ);
                gsap.timeline()
                .to(discoLight.position,
                {
                    x: NewX,
                    z: NewZ,
                    duration: time,
                })
                .to(discoLight.target.position,
                {
                    x: NewX,
                    z: NewZ,
                    duration: time,
                })
            },2000);
            scene.add(discoLight.target)
            scene.add(discoLight)
            this.LightbulbList.push(discoLight);
        }
    }
    remove(scene)
    {
        for(const SpotLight of this.LightbulbList)
        {
            scene.remove(SpotLight.target)
            scene.remove(SpotLight)
        }
        this.LightbulbList.length = 0;
    }
}