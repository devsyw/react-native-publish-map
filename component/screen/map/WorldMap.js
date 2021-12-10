import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Platform, Dimensions, Text, Animated } from 'react-native';
import {scale, verticalScale, moderateScale, width, height} from '../scaling';
import { MapStyle1, UserMarker, GoldBar } from './KogWorldMapComp';
import { EmojiModal, WorldModal } from '../modal/ModalComp';

/** 상단 스테이터스 바 */
import { StatusBar } from 'expo-status-bar';

/** React-Native-Map lib */
import { PROVIDER_GOOGLE} from 'react-native-maps';
import MapView from 'react-native-map-clustering';

/** 오른쪽 상단 메뉴바 안에 들어가는 이미지 */
const groupBtn = require("../../asset/button/wm_group_btn.png")
const noticeBtn = require("../../asset/button/wm_notice_btn.png")
const settingBtn = require("../../asset/button/wm_setting_btn.png")

/** 맵위에 떠있는 이미지 */
const goMapNaviBtn = require("../../asset/button/wm_locate_world_btn.png")
const menuBtn = require("../../asset/button/wm_menu_btn.png")
const locationBtn = require("../../asset/button/wm_location_btn.png")


export default function WorldMap({navigation, route, options, back}){
    /** 맵 스타일 */
    const [mapSt, setMapSt] = useState(MapStyle1);

    /** 구글맵 객체 */
    const backgroundMap = useRef(); 

    /** 메뉴버튼 클릭시 메뉴리스트 나오는 화면 제어 */
    const [btnState, setBtnState] = useState(true);
    const listBtn = useRef(new Animated.Value(0)).current;

    /** 메뉴 오픈 애니메이션 */
    const openList = () => {
        Animated.timing(listBtn, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setBtnState(false)
    };

    /** 메뉴 닫기 애니메이션 */
    const closeList = () => {
        Animated.timing(listBtn, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setBtnState(true)
    };

    /** 모달팝업(상대방/이모지) */
    const [ modalVisible, setModalVisible ] = useState({
        modalYn : false,
        sender : {},
        user : {}
    });

    /** 유저 마커 클릭이벤트(포커싱 후 이모지 모달띄우기) */
    const pressMarker = (coordinate) => {
        backgroundMap.current.animateToRegion(coordinate, 500)
        setModalVisible({ //이렇게 모달컴포넌트로 파라미터 넘기면 됩니다.
            modalYn : true,
            sender : {}, 
            user : {}
        })
    }

    /** 모달팝업(월드/랜드) */
    const [ worldModalVisible, setWorldModalVisible ] = useState({
        modalYn : false,
        user : {}
    });

    /** 유저 마커 클릭이벤트(포커싱 후 이모지 모달띄우기) */
    const pressWorldBtn = () => {
        setWorldModalVisible({ //이렇게 모달컴포넌트로 파라미터 넘기면 됩니다.
            modalYn : true,
            user : {}
        })
    }

    /** 임의 좌표값 */
    const coordinateList = [
        {latitude: 37.78825, longitude: -122.4324},
        {latitude: 37.38825, longitude: -122.2324},
        {latitude: 37.18825, longitude: -122.6324},
        {latitude: 37.71825, longitude: -122.4324},
        {latitude: 37.32825, longitude: -122.2324},
        {latitude: 37.13825, longitude: -122.6324},
        {latitude: 37.74825, longitude: -122.4324},
        {latitude: 37.35825, longitude: -122.2324},
        {latitude: 37.16825, longitude: -122.6324}
    ]
    
    return (
        <View style={styles.container}>
            
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
            
            {/** Google Map View */}
            <MapView ref={backgroundMap} style={styles.map} customMapStyle={mapSt} provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
                {/** 마커 */}
                <UserMarker key={1} coordinate={coordinateList[0]} onPress={()=>pressMarker(coordinateList[0])} mapRef={backgroundMap}/>
                <UserMarker key={2} coordinate={coordinateList[1]} onPress={()=>pressMarker(coordinateList[1])} mapRef={backgroundMap}/>
                <UserMarker key={3} coordinate={coordinateList[2]} onPress={()=>pressMarker(coordinateList[2])} mapRef={backgroundMap}/>
                <UserMarker key={4} coordinate={coordinateList[3]} onPress={()=>pressMarker(coordinateList[3])} mapRef={backgroundMap}/>
                <UserMarker key={5} coordinate={coordinateList[4]} onPress={()=>pressMarker(coordinateList[4])} mapRef={backgroundMap}/>
                <UserMarker key={6} coordinate={coordinateList[5]} onPress={()=>pressMarker(coordinateList[5])} mapRef={backgroundMap}/>
                <UserMarker key={7} coordinate={coordinateList[6]} onPress={()=>pressMarker(coordinateList[6])} mapRef={backgroundMap}/>
                <UserMarker key={8} coordinate={coordinateList[7]} onPress={()=>pressMarker(coordinateList[7])} mapRef={backgroundMap}/>
                <UserMarker key={9} coordinate={coordinateList[8]} onPress={()=>pressMarker(coordinateList[8])} mapRef={backgroundMap}/>
            </MapView>

            {/** 메뉴버튼 클릭시 노출되는 메뉴리스트 */}
            <Animated.View
                style={[
                styles.fadingMenu,
                {
                    opacity: listBtn
                }
                ]}
            >
                {/** padding */}
                <TouchableOpacity style={styles.menuListEle}></TouchableOpacity>

                {/** 그룹리스트 버튼 */}
                <TouchableOpacity style={styles.menuListEle}>
                    <Image style={styles.btnSize} source={groupBtn}/>

                    {/** 변동사항 또는 알람 알림 빨간동그라미 */}
                    <View style={styles.alram}></View>
                </TouchableOpacity>

                {/** 공지사항 버튼 */}
                <TouchableOpacity style={styles.menuListEle}>
                    <Image style={styles.btnSize} source={noticeBtn}/>

                    {/** 변동사항 또는 알람 알림 빨간동그라미 */}
                    <View style={styles.alram}></View>
                </TouchableOpacity>

                {/** 환경설정 버튼 */}
                <TouchableOpacity style={styles.menuListEle}>
                    <Image style={styles.btnSize} source={settingBtn}/>

                    {/** 변동사항 또는 알람 알림 빨간동그라미 */}
                    {/* <View style={styles.alram}></View> */}
                </TouchableOpacity>
            </Animated.View>

            {/** 왼쪽 위 랜드/월드 이동버튼 */}
            <TouchableOpacity style={styles.leftTopBtn} onPress={() => pressWorldBtn()}>
                <Image style={styles.btnSize} source={goMapNaviBtn} />
            </TouchableOpacity>

            {/** 오른쪽 위 메뉴 버튼 */}
            <TouchableOpacity style={styles.rightTopBtn} onPress={() => {btnState ? openList() : closeList()}}>
                <Image style={styles.btnSize} source={menuBtn} />
                
                {/** 변동사항 또는 알람 알림 빨간동그라미 */}
                <View style={styles.alram}></View>
            </TouchableOpacity>

            {/** 골드바 */}
            <View style={styles.goldCover}>
                <GoldBar gold={'10,000'} />
            </View>
            
            {/** 중앙 내 위치(로케이션) 버튼 */}
            <TouchableOpacity style={styles.centerLocationArea}>
                <View style={styles.centerLocation}>
                    <Image style={styles.btnLocSize} source={locationBtn} />
                </View>
            </TouchableOpacity>
            
            {/** 랜드/월드 이동 버튼 클릭시 맵 이동 언더팝업 */}
            <WorldModal modalVisible={worldModalVisible} setModalVisible={setWorldModalVisible} map={setMapSt}/>

            {/** 친구 마커 클릭시 뜨는 이모지 언더팝업 */}
            <EmojiModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        ...StyleSheet.absoluteFill,
        flex : 1,
        justifyContent: 'space-between', 
        alignItems: 'center',
    }, 
    map : {
        ...StyleSheet.absoluteFill,
    },
    btnSize : {
        width: moderateScale(25), 
        height: moderateScale(25)
    },
    btnLocSize : {
        width: moderateScale(35), 
        height: moderateScale(35)
    },

    menuListEle : {
        width : moderateScale(50),
        height : moderateScale(50),
        justifyContent : 'center',
        alignItems : 'center',
    },
    leftTopBtn : {
        position : 'absolute',
        top : verticalScale(40),
        left : scale(20),
        width : moderateScale(50),
        height : moderateScale(50),
        backgroundColor : '#fff',
        borderRadius : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    leftBottomBtn : {
        position : 'absolute',
        bottom : verticalScale(40),
        left : scale(20),
        width : moderateScale(50),
        height : moderateScale(50),
        backgroundColor : '#fff',
        borderRadius : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    rightTopBtn : {
        position : 'absolute',
        top : verticalScale(40),
        right : scale(20),
        width : moderateScale(50),
        height : moderateScale(50),
        backgroundColor : '#fff',
        borderRadius : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    rightBottomBtn : {
        position : 'absolute',
        bottom : verticalScale(40),
        right : scale(20),
        width : moderateScale(50),
        height : moderateScale(50),
        backgroundColor : '#fff',
        borderRadius : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    centerLocation : {
        width : moderateScale(60),
        height : moderateScale(60),
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor : '#fff',
        borderRadius : 200,
        opacity : 0.95,
        ...Platform.select({ 
            ios: { 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
            }, 
            android: { 
                elevation: 4, 
            }, 
        }),
    },
    centerLocationArea : {
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom : verticalScale(20),
    },
    fadingMenu : {
        position : 'absolute',
        top : verticalScale(40),
        right : scale(20),
        padding : 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius : moderateScale(20),
        justifyContent : 'center',
        alignItems : 'center',
    },
    alram : {
        width : moderateScale(10), 
        height : moderateScale(10), 
        backgroundColor : '#FA517A', 
        position : 'absolute', 
        right : moderateScale(12), 
        top : moderateScale(12), 
        borderRadius : 100
    },
    goldCover : {
        justifyContent: 'center', 
        alignItems: 'center',
        ...Platform.select({ 
            ios: { 
                marginTop : verticalScale(50),
            }, 
            android: { 
                marginTop : verticalScale(50),
            }, 
        }),
    }
});