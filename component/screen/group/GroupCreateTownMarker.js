import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Platform, Animated } from 'react-native';
import {scale, verticalScale, moderateScale, width, height} from '../scaling';
import { MapStyle1, MapStyle2} from '../map/KogWorldMapComp';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { YModal, YnModal } from '../modal/ModalComp';
import { 
    GroupPageNavIcon,
} from './KogGroupComp';

/** React-Native-Map lib */
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function GroupCreateTownMarker({navigation, route, options, back}){
    
    /** 안내모달팝업 Y */
    const [modalYn, setModalYn] = useState(true)

    /** 랜드생성모달팝업 Yn */
    const [doneModalYn, setDoneModalYn] = useState(false)

    /** 맵 스타일 */
    const [mapSt, setMapSt] = useState(MapStyle2);

    /** 구글맵 객체 */
    const backgroundMap = useRef(); 

    /** 타운 마커 생성 */
    const [landMarker, setLandMarker] = useState({});
    const [markerView, setMarkerView] = useState(false); //랜드 마커 있는지 없는지 show/hide
    const onPressMarker = (e) => {
        setLandMarker({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        });
        setMarkerView(true);
    }

    return (
        <View style={styles.container}>
            {/** 화면진입시 안내 팝업 */}
            <YModal
                modalYn={modalYn} 
                setModalYn={setModalYn} 
                msg={`랜드를 건설할 위치를\n선택해주세요!`}
                option={`예`}
            />

            {/** 위치 선택 후 다음버튼 클릭 */}
            <YnModal
                modalYn={doneModalYn} 
                setModalYn={setDoneModalYn}
                msg={`선택한 위치에\n타운을 건설하시겠습니까?`}
                callback={()=>{
                    navigation.push('GroupCreateDone')
                }}
                cancleCallback={()=>{}}
            />
            
            {/** Google Map View */}
            <MapView 
                ref={backgroundMap} 
                style={styles.map} 
                customMapStyle={mapSt} 
                provider={PROVIDER_GOOGLE} 
                onPress={(e) => onPressMarker(e)}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {
                    markerView ? (
                        <Marker
                            key={1}
                            pinColor={'#fff'}
                            coordinate={landMarker}
                        >
                            <Ionicons name="ios-location-sharp" size={50} color="#fff" />
                        </Marker>
                    ) : null
                }
            </MapView>

            {/** 이전 페이지로 돌아가기 버튼 */}
            <View style={styles.topArea}>
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                    style={styles.topArea_info}
                >
                    <Ionicons name="chevron-back" size={moderateScale(30)} color='#3298FF'/>
                </TouchableOpacity>
            </View>
            
            {/** 타운 건설 후 그룹생성 완료버튼 */}
            {
                markerView ? (
                    <TouchableOpacity
                        onPress={() => setDoneModalYn(true)}
                        style={[styles.nextPageBtn, {backgroundColor : '#3298FF'}]}
                    >
                        <Fontisto name="arrow-right" size={moderateScale(24)} color={'#fff'} />
                    </TouchableOpacity>
                ) : null
            }

            {/** 상단 현재 페이지 영역 */}
            <GroupPageNavIcon pageNum={6}/>
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
    topArea : {
        position: 'absolute', 
        top: verticalScale(22), 
        left : scale(15)
    },
    topArea_info : {
        width : 40, 
        height : 40,
    },
    nextPageBtn : { 
        position: 'absolute', 
        bottom : verticalScale(15), 
        right : scale(15),
        width : moderateScale(80, 0.3),
        height : moderateScale(55, 0.2),
        backgroundColor : '#FFF',
        borderRadius : moderateScale(60),
        justifyContent : 'center',
        alignItems : 'center',
    },
});