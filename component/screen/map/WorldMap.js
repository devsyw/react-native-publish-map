import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Platform, Dimensions, Text } from 'react-native';
import {scale, verticalScale, moderateScale, width, height} from '../scaling';
import { MapStyle, UserMarker } from './KogWorldMapComp';
import { EmojiModal } from '../modal/ModalComp';

/** 상단 스테이터스 바 */
import { StatusBar } from 'expo-status-bar';

/** React-Native-Map lib */
import { PROVIDER_GOOGLE} from 'react-native-maps';
import MapView from 'react-native-map-clustering';

/** 하단 모달에 들어가는 이미지 */
const financeMapBtn = require("../../asset/button/wm_finance_content_btn.png")
const healthMapBtn = require("../../asset/button/wm_health_content_btn.png")

/** 하단 모달에 들어가는 이모지 */
const emoji1 = require("../../asset/image/wm_emoji1_img.png")
const emoji2 = require("../../asset/image/wm_emoji2_img.png")
const emoji3 = require("../../asset/image/wm_emoji3_img.png")
const emoji4 = require("../../asset/image/wm_emoji4_img.png")

/** 오른쪽 상단 메뉴바 안에 들어가는 이미지 */
const groupBtn = require("../../asset/button/wm_group_btn.png")
const noticeBtn = require("../../asset/button/wm_notice_btn.png")
const settingBtn = require("../../asset/button/wm_setting_icon.png")

/** 맵위에 떠있는 이미지 */
const goMapNaviBtn = require("../../asset/button/wm_locate_world_btn.png")
const menuBtn = require("../../asset/button/wm_menu_btn.png")
const myCollectionBtn = require("../../asset/button/wm_my_collection_btn.png")
const myProfileBtn = require("../../asset/button/wm_my_profile_btn.png")
const locationBtn = require("../../asset/button/wm_location_btn.png")


export default function WorldMap({navigation, route, options, back}){
    /** 구글맵 객체 */
    const backgroundMap = useRef(); 

    /** 모달팝업(상대방/이모지) */
    const [ modalVisible, setModalVisible ] = useState({
        modalYn : false,
        sender : {},
        user : {}
    });

    /** 유저 마커 클릭이벤트(포커싱 후 모달띄우기) */
    const pressMarker = (coordinate) => {
        backgroundMap.current.animateToRegion(coordinate, 500)
        setModalVisible({ //이렇게 모달컴포넌트로 파라미터 넘기면 됩니다.
            modalYn : true,
            sender : {}, 
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
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
            
            {/** Google Map View */}
            <MapView ref={backgroundMap} style={styles.map} customMapStyle={MapStyle} provider={PROVIDER_GOOGLE}
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

            {/**  */}
            {/* <View style={styles.topGoldArea}>
                
            </View> */}

            {/** 왼쪽 위 맵 이동버튼 */}
            <TouchableOpacity style={styles.leftTopBtn}>
                <Image style={styles.btnSize} source={goMapNaviBtn} />
            </TouchableOpacity>

            {/** 왼쪽 아래 내 컬렉션 버튼 */}
            <TouchableOpacity style={styles.leftBottomBtn}>
                <Image style={styles.btnSize} source={myCollectionBtn} />
            </TouchableOpacity>

            {/** 오른쪽 위 메뉴 버튼 */}
            <TouchableOpacity style={styles.rightTopBtn}>
                <Image style={styles.btnSize} source={menuBtn} />
            </TouchableOpacity>

            {/** 오른쪽 아래 내 프로필 버튼 */}
            <TouchableOpacity style={styles.rightBottomBtn}>
                <Image style={styles.btnSize} source={myProfileBtn} />
            </TouchableOpacity>

            {/** 중앙 내 위치(로케이션) 버튼 */}
            <TouchableOpacity style={styles.centerLocationArea}>
                <View style={styles.centerLocation}></View>
                <View style={{position: 'absolute', zIndex : 2}}>
                    <Image style={styles.btnLocSize} source={locationBtn} />
                </View>
            </TouchableOpacity>

            <EmojiModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container : {
        ...StyleSheet.absoluteFill,
        flex : 1,
        justifyContent: 'center', 
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
    topGoldArea : {
        // bottom : verticalScale(40),
        // justifyContent: 'center', 
        // alignItems: 'center',
        // marginTop : verticalScale(600),
        width : moderateScale(60),
        height : moderateScale(60),
        backgroundColor : '#fff',
        borderRadius : 200,
        opacity : 0.8,
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
        backgroundColor : '#fff',
        borderRadius : 200,
        opacity : 0.8,
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
        bottom : verticalScale(40),
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop : verticalScale(600),
    },




    modalPopArea : {
        flex : 1,
        justifyContent : 'flex-end',
        alignItems : 'center',
    },
    modalPop : {
        position : 'absolute',
        bottom : 0,
        justifyContent : 'center',
        alignItems : 'center',
        width : width,
        height : height/2,
        borderTopLeftRadius : moderateScale(20),
        borderTopRightRadius : moderateScale(20),
        backgroundColor : '#fff',
        opacity : 0.95,
    },
    modalBtn : {
        flex : 1, 
        flexDirection : 'row', 
        justifyContent : 'space-around',
    },
    modalTxt : {
        color : '#fff', 
        fontSize : moderateScale(16),
        textAlign : 'center',
    },
    modalSubTxt : {
        color : '#c4c4c4', 
        fontSize : moderateScale(14),
        marginTop : moderateScale(5),
        textAlign : 'center',
    },  
    modalTxtYn : {
        color : '#fff', 
        fontSize : moderateScale(16),
        fontWeight : 'bold',
    },
    modalYnBtn : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center',
    },
    modalQBox : {
        flex : 1.5, 
        justifyContent : 'center', 
        alignItems : 'center',
    },
    modalSubQBox : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center',
    }
});



const bottomSheet = StyleSheet.create({

});