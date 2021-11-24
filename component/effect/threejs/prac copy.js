import React from "react";
import {Alert, TouchableOpacity, View} from "react-native";
import * as THREE from "three";
import { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Asset } from "expo-asset";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import ROOMOBJ from "../../../assets/3d/Room.obj";
import ROOMMTL from "../../../assets/3d/Room.mtl";

let scene, renderer, ambientLight, pointLight, spotLight, controls;

const ThreePrac = ({navigation, route, options, back}) => {
  const camera = new THREE.PerspectiveCamera(100, 0.4, 0.01, 1000);
  const exampleObject = new THREE.Object3D();

  let cameraInitialPositionX = 5;
  let cameraInitialPositionY = 2;
  let cameraInitialPositionZ = 8;

  const objLoadFn = async (mtl) => {

    let objLoad = new OBJLoader(); 
    objLoad.setMaterials(mtl);  // MTLLoader에서 로드한 materials 파일을 설정합니다. WaltHead
    objLoad.load('https://threejs.org/examples/models/obj/walt/WaltHead.obj', function (object) { // 로드할 OBJ 파일 명을 입력합니다.
      console.log('obj 로드 성공')
      object.position.x = 0;
      object.position.y = 0;
      object.position.z = 0;
      object.scale.set(0.1,0.1,0.1)
      scene.add(object);
      
    }, function (xhr) {
      // 모델이 로드되는 동안 호출되는 함수
      console.log('OBJLoader: ', xhr.loaded / xhr.total * 100, '% loaded');

    }, function (error) {
      // 모델 로드가 실패했을 때 호출하는 함수
      console.error('OBJLoader 로드 중 오류가 발생하였습니다.', error);
      alert('모델을 로드 중 오류가 발생하였습니다.', error);

    });
  }

  const glbLoadFn = () => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('js/libs/draco/gltf/');

    let glbLoad = new GLTFLoader();
    glbLoad.setDRACOLoader( dracoLoader );
    glbLoad.load( 'models/gltf/LittlestTokyo.glb', function ( gltf ) {
      const model = gltf.scene;
      model.position.set( 1, 1, 0 );
      model.scale.set( 0.1, 0.1, 0.1 );
      scene.add( model );

    });
  }

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

        // Scene declaration, add a fog, and a grid helper to see axes dimensions
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog("#3A96C4", 1, 10000);
        scene.add(new THREE.GridHelper(10, 10));

        // Add all necessary lights
        ambientLight = new THREE.AmbientLight(0x101010);
        scene.add(ambientLight);

        pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        spotLight = new THREE.SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

        let mtlLoad = new MTLLoader();
        //mtlLoad.setPath('../../../assets/3d/'); // MTLLoader Material 파일을 사용할 전역 경로를 설정합니다.
        //const [{ localUri }] = await Asset.loadAsync(require('../../../assets/3d/Room.mtl'));

        mtlLoad.load('https://threejs.org/examples/models/obj/walt/WaltHead.mtl', function (mtlTemp) { // 로드할 Material 파일 명을 입력합니다.
          mtlTemp.preload();
          objLoadFn(mtlTemp);

        }, function (xhr) {
          console.log('MTLLoader: ', xhr.loaded / xhr.total * 100, '% loaded'); // 로드되는 동안 호출되는 함수

        }, function (error) {
          // 로드가 실패했을때 호출하는 함수
          console.error('MTLLoader 로드 중 오류가 발생하였습니다.', error);
          Alert.alert('MTLLoader 로드 중 오류가 발생하였습니다.');
          
        });
        
        //카메라 초기 위치값
        camera.position.set(
          cameraInitialPositionX,
          cameraInitialPositionY,
          cameraInitialPositionZ
        );
        console.log(3)

        //카메라 컨트롤
        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set( 0, 0.5, 0 );
        controls.update();
        controls.enablePan = false;
        controls.enableDamping = true;
        console.log(4)

        // Render function
        const render = () => {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
          //controls.update();
          gl.endFrameEXP();
        };
        console.log(5)
        render();

      }}
    />
  );
}

export default ThreePrac;