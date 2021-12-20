import React, { useRef, useState } from "react";
import { 
    Dimensions, 
    Modal, 
    Platform, 
    StyleSheet, 
    Text, 
    View, 
    Animated,
    Image
} from "react-native";
import { Marker } from "react-native-maps";
import { height, moderateScale, scale, verticalScale } from "../scaling";
import * as Progress from 'react-native-progress';
import { useEffect } from "react";

/** 상단 골드 현황 */
const coinIcon = require("../../asset/icon/wm_coin_icon.png")
export const GoldBar = ({gold}) => {
    return (
        <View style={styles.topGoldBar}>
            <Image source={coinIcon} style={styles.topGoldIcon}/>
            <Text style={styles.topGoldTxt}>{gold}</Text>
        </View>
    )
}

/** 커스텀 유저 마커 , 12.20 수정 */
const crt = require('../../asset/image/wm_user_character_img.png'); //캐릭터
const heartIcon = require('../../asset/icon/mp_ethereum_icon.png'); //하트아이콘, 지금은 아무거나 가져옴
export const UserMarker = ({key, coordinate, onPress, mapRef, mapDelta}) => {
    const defaultSize = moderateScale(120);
    const [markerSize, setMarkerSize] = useState(moderateScale(defaultSize))
    
    useEffect(() => {
        const minSize = moderateScale(40);
        const maxSize = moderateScale(120);
        const minZoom = 0.02;
        const maxZoom = 0.7;
        const maxOverZoom = 10;
        const flagZoom = 0.01;
        const flagData = maxSize * flagZoom;
        const deltaSize = parseFloat(mapDelta.latitudeDelta) * parseFloat(mapDelta.longitudeDelta) * 100;
        

                let resize = (flagData / (maxSize * deltaSize)) * maxSize;
                resize > maxSize ? resize = maxSize : null;
                return resize > minSize ? setMarkerSize(resize) : setMarkerSize(minSize)

    }, [mapDelta])

    /** 아바타 머리 위 체력게이지 */
    const HpBar = () => {
        return (
            <Progress.Bar progress={1} width={scale(60)} height={verticalScale(6)} borderRadius={moderateScale(10)} color={"#CC00FF"} />
        )
    }
    
     
    return (
        <Marker
            key={key}
            coordinate={coordinate}
            onPress={onPress}
            style={styles.markerArea}
        >
            <Text style={styles.markerName}>일이삼사오육칠팔구십</Text>
            <View style={styles.markerHpArea}>
                <Image source={heartIcon} style={styles.markerHeartIcon}/>
                <HpBar />
            </View>
            
            <Image source={crt} style={[styles.markerCrt, {width : markerSize, height : markerSize}]}/>
        </Marker>
    )
}

/** 이모지 발송 모션 */
export const EmojiSendMotion = ({img, setCount}) => {
    let fadeAnim = useRef(new Animated.Value(1)).current;
    let imgResize = useRef(new Animated.Value(1)).current;

    const resize = () => {
        Animated.timing(imgResize, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {setCount ? setCount(false) : null})
    }

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    fadeOut();
    resize();

    return (
        <Animated.View
            style={[
                styles.sendEmojiCon,
                {
                    opacity: fadeAnim,
                    transform : [{ scale : imgResize }]
                }
            ]}
        >
            <View style={styles.sendEmoji}>
                <Image style={[styles.sendEmojiImg]} source={img} /> 
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    markerCrt : {
        resizeMode : 'contain',
    },
    sendEmojiCon : {
        ...StyleSheet.absoluteFill,
        flex : 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    sendEmoji : {
        position : "absolute",
        flex : 1,
    },
    sendEmojiImg : {
        width : 200,
        height : 200,
        justifyContent : 'center',
        alignItems : 'center',
    },
    markerArea : {
        justifyContent: "center", 
        alignItems : 'center'
    },
    markerName : {
        fontSize : moderateScale(12), 
        fontWeight : "bold",
    },
    markerHpArea : {
        flexDirection : "row", 
        justifyContent : "center", 
        alignItems : "center",
    },
    markerHeartIcon : {
        resizeMode : "contain" , 
        width : moderateScale(10), 
        height : moderateScale(10),
        marginBottom : verticalScale(5),
    },

    topGoldArea : {
        
    },
    topGoldBar : {
        width : scale(90),
        height : verticalScale(30),
        padding : 1,
        flexDirection : 'row',
        justifyContent : 'flex-end',
        alignItems : 'center',
        backgroundColor : '#fff',
        borderRadius : moderateScale(20), // 12.14 수정
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
    topGoldTxt : {
        fontWeight : 'bold', 
        marginRight : 5
    },
    topGoldIcon : {
        position : 'absolute', 
        left : 5,
        width: moderateScale(25), 
        height : moderateScale(25)
    },
})

/** 맵 스타일(일반) */
export const MapStyle1 = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "color": "#dfdcd5"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "color": "#dfdcd5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "color": "#bad294"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "color": "#efebe2"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fbfbfb"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#a5d7e0"
            }
        ]
    }
];

/** 맵 스타일(퍼플랜드) */
export const MapStyle2 = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3f1546"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
];