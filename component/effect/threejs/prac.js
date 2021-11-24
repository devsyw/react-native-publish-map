import React from "react";
import {Alert, TouchableOpacity, View} from "react-native";
import * as THREE from "three";
import { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Asset } from "expo-asset";
import OrbitControlsView from 'expo-three-orbit-controls';

import ROOMOBJ from "../../../assets/3d/Room.obj";
import ROOMMTL from "../../../assets/3d/Room.mtl";
import GLBBOX from "../../../assets/3d/glbTest.glb"

let scene, renderer, ambientLight, pointLight, spotLight;

const ThreePrac = ({navigation, route, options, back}) => {
  const fov = 45;
  const aspect = 0.6;  // canvas 요소의 기본 비율 : 2
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(20,10,20)

  return (
    <GLView
      style={{flex:1}}
      onContextCreate={async (gl) => {

        // GL Parameter disruption
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        // Renderer declaration and set properties
        renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor("#fff");
        renderer.outputEncoding = THREE.sRGBEncoding;

        const controls = new OrbitControlsView( camera, renderer.domElement ); //  !  without THREE.
        //controls.enableZoom = true;

        // Scene declaration, add a fog, and a grid helper to see axes dimensions
        scene = new THREE.Scene();
        scene.background = new THREE.Color('white');
        scene.fog = new THREE.Fog("#3A96C4", 1, 10000);
        scene.add(new THREE.GridHelper(10, 10));

        // Add all necessary lights
        ambientLight = new THREE.AmbientLight(0x101010);
        scene.add(ambientLight);

        pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        //scene.add(pointLight);

        spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(0, 100, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

        let mtlLoad = new MTLLoader();
        const assetGlb = Asset.fromModule(require("../../../assets/3d/building_1.glb"));
        await assetGlb.downloadAsync();
        const assetObj = Asset.fromModule(require("../../../assets/3d/building_11.obj"));
        await assetGlb.downloadAsync();
        const assetMtl = Asset.fromModule(require("../../../assets/3d/building_11.mtl"));
        await assetGlb.downloadAsync();

        let glbLoad = new GLTFLoader();
        glbLoad.load(assetGlb.uri, function (gltf) { // 로드할 OBJ 파일 명을 입력합니다.
          model = gltf.scene;
          model.scale.set(0.01,0.01,0.01)
          scene.add(model)

        }, function (xhr) {
          // 모델이 로드되는 동안 호출되는 함수
          console.log('GLTFLoader: ', xhr.loaded / xhr.total * 100, '% loaded');
    
        }, function (error) {
          // 모델 로드가 실패했을 때 호출하는 함수
          console.error('GLTFLoader 로드 중 오류가 발생하였습니다.', error);
          Alert.alert('모델을 로드 중 오류가 발생하였습니다.', error);
    
        });



        //카메라 컨트롤
        // controls = new OrbitControls(camera, renderer.domElement);
        // controls.target.set( 0, 0.5, 0 );
        // controls.update();
        // controls.enablePan = false;
        // controls.enableDamping = true;

        // Render function
        const render = () => {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
          //controls.update();
          gl.endFrameEXP();
        };
        
        render();
        console.log(3)
      }}
    />
  );
}

export default ThreePrac;