import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale} from '../scaling';

/** 이미지 */
const stepsIcon = require('../../asset/icon/wm_step_icon.png'); //발바닥 아이콘
const sleepIcon = require('../../asset/icon/wm_sleep_icon.png'); //수면 아이콘
const etherIcon = require('../../asset/icon/mp_ethereum_icon.png'); //이더리움 아이콘(코인)
const goldIcon = require('../../asset/icon/wm_coin_icon.png'); //골드 아이콘
const crt = require('../../asset/image/wm_user_character_img.png'); //캐릭터
const landImage = require('../../asset/image/mp_land_img.png'); // 랜드 이미지

export const MyProfile = ({navigation}) => {

    /** 소속한 랜드리스트 테스트 데이터(3개 불러옴) */
    const DATA = [{id: 1}, {id: 2}, {id :3}]

    /** 랜드 아이콘 터치 시 확대/축소 애니메이션 이벤트 로직 */
    const [ imgFlag1, setImgFlag1 ] = useState(true);
    const [ imgFlag2, setImgFlag2 ] = useState(true);
    const [ imgFlag3, setImgFlag3 ] = useState(true);
    const imgResize1 = useRef(new Animated.Value(1)).current;
    const imgResize2 = useRef(new Animated.Value(1)).current;
    const imgResize3 = useRef(new Animated.Value(1)).current;
    
    /** 랜드 3개 미만일때 추가 버튼, FlatList 마지막에 추가하면 될듯 */
    const LandPlusBtn = () => {
        return (
            <TouchableOpacity style={styles.bottom_flatList}>
                <Entypo name="circle-with-plus" size={35} color="#FA517A" />
            </TouchableOpacity>
        )
    }
    

    /** 탭버튼 클릭시 색 변경 */
    const [tab1, setTab1] = useState(true); //첫 화면에서는 Tab1이 활성
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    const tabPress = (tab) => {
        switch (tab) {
            case 1 : 
                setTab1(true)
                setTab2(false)
                setTab3(false)
                break;
            case 2 : 
                setTab1(false)
                setTab2(true)
                setTab3(false)
                break;
            case 3 :
                setTab1(false)
                setTab2(false)
                setTab3(true)
                break;
            default:
                break;
        }
    }

    /** 랜드 FlatList */
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.bottom_flatList} 
                onPress={() => {
                    //애니메이션 처리 함수
                    handleAnimation(item.id, imgFlag1, imgFlag2, imgFlag3, setImgFlag1, setImgFlag2, setImgFlag3, imgResize1, imgResize2, imgResize3)
                    tabPress(item.id);
                }
            }>
                {item.id == 1 ? <Animated.Image source={landImage} style={[tab1 ? styles.bottom_landImageColor : styles.bottom_landImage, { transform : [ { scale : imgResize1 }, { translateY : -5 } ] }]}/> : null}
                {item.id == 2 ? <Animated.Image source={landImage} style={[tab2 ? styles.bottom_landImageColor : styles.bottom_landImage, { transform : [ { scale : imgResize2 }, { translateY : -5 } ] }]}/> : null}
                {item.id == 3 ? <Animated.Image source={landImage} style={[tab3 ? styles.bottom_landImageColor : styles.bottom_landImage, { transform : [ { scale : imgResize3 }, { translateY : -5 } ] }]}/> : null}
            </TouchableOpacity>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 상단영역, 뒤로가기 및 골드 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>

                {/** 여백 */}
                <View style={{flex : 1}}></View>

                {/** 보유 코인 */}
                <View style={styles.topArea_toggle}>
                    <Image source={etherIcon} style={styles.top_toggle_etherIcon}></Image>
                    <View style={styles.topArea_toggleArea}>
                        <Text>300</Text>
                    </View>
                </View>

                {/** 보유 골드 */}
                <View style={styles.topArea_toggle}>
                    <Image source={goldIcon} style={styles.top_toggle_goldIcon}></Image>
                    <View style={styles.topArea_toggleArea}>
                        <Text style={{textAlign: 'right'}}>1,000</Text>
                    </View>
                </View>
            </View>

            {/** 중앙영역, 내 정보 */}
            <View style={styles.midArea}>
                {/** 내 별명 */}
                <View style={styles.midArea_txtArea}>
                    <Text style={styles.midArea_txt}>Username</Text>
                </View>

                {/** 컨텐츠 영역 */}
                <View style={styles.midArea_content}>
                    <View style={styles.midArea_contentLeft}>
                        {/** 오늘의 걸음 수 */}
                        <View style={styles.midArea_contentLeft_top}>
                            {/** 발바닥 이미지 영역 */}
                            <View style={styles.midArea_stepsIconArea}>
                                <Image source={stepsIcon} style={styles.midArea_stepsIcon}/>
                            </View>
                            
                            {/** 걸음 수/이동거리 텍스트 영역 */}
                            <View style={styles.midArea_contentLeft_txtArea}>
                                {/** step 상단 텍스트 영역 */}
                                <View style={styles.midArea_contentLeft_txtBox1}>
                                    <Text style={styles.midArea_contentLeft_txtBoxTop1}>15,290</Text>
                                    <Text style={styles.midArea_contentLeft_txtBoxTop2}>steps</Text>
                                </View>

                                {/** step 하단 텍스트 영역 */}
                                <View style={styles.midArea_contentLeft_txtBox2}>
                                    {/** 오늘의 이동 거리 */}
                                    <View  style={styles.midArea_contentLeft_txtBox2Det}>
                                        <Text style={styles.midArea_contentLeft_txtBoxBt1}>2.3</Text>
                                        <Text style={styles.midArea_contentLeft_txtBoxBt2}> km</Text>
                                    </View>

                                    {/** padding 영역 */}
                                    <View style={{flex : 1}}></View>
                                </View>
                                
                            </View>
                        </View>

                        {/** 오늘의 수면 시간 */}
                        <View style={styles.midArea_contentLeft_bottom}>
                            {/** 수면(달) 이미지 영역 */}
                            <View style={styles.midArea_sleepIconArea}>
                                <Image source={sleepIcon} style={styles.midArea_sleepIcon}/>
                            </View>
                            
                            {/** 수면시간 텍스트 영역 */}
                            <View style={styles.midArea_contentRight_txtArea}>
                                {/** 수면시간 텍스트 영역 */}
                                <View style={styles.midArea_contentRight_txtAreaTop}>
                                    <View style={styles.midArea_contentRight_txtAreaTopDet}>
                                        <Text style={styles.midArea_contentRight_txtAreaTop1}>6.5</Text>
                                        <Text style={styles.midArea_contentRight_txtAreaTop2}>hours</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/** 나의 아바타 이미지(object) */}
                    <View style={styles.midArea_contentRight}>
                        <Image source={crt}></Image>
                    </View>
                </View>
            </View>

            {/** 중앙-하단 패딩 영역 */}
            <View style={styles.midBottom_padding}></View>

            {/** 하단영역, 내가 속한 랜드 */}
            <View style={styles.bottomArea}>
                {/** 랜드 명 */}
                <View style={styles.bottomArea_txtArea}>
                    <Text style={styles.bottomArea_txt}>틀림없는 딱따구리들</Text>
                </View>

                {/** 랜드 멤버 */}
                <View style={styles.bottomArea_subTxtArea}>
                    <Text style={styles.bottomArea_subTxt}>민정</Text>
                    <Text style={styles.bottomArea_subTxt}>지연</Text>
                    <Text style={styles.bottomArea_subTxt}>스티브</Text>
                    <Text style={styles.bottomArea_subTxt}>윈드</Text>
                    <Text style={styles.bottomArea_subTxt}>영우</Text>
                </View>

                {/** 내가 가입되어있는 랜드 리스트 */}
                <View style={styles.bottomArea_landList}>
                    <View style={styles.bottomArea_landListBg}>
                        <FlatList
                            data={DATA}
                            horizontal = {true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                        {/* <LandPlusBtn/> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',

    }, 
    gobackBtn : {
        ...StyleSheet.absoluteFillObject,
        top : moderateScale(15),
        left : moderateScale(15),
    },
    topArea : {
        flex : 1,
        flexDirection : 'row',
    }, 
    top_toggle_etherIcon : {
        position : 'absolute', 
        zIndex : 2, 
        width: moderateScale(20), 
        height: moderateScale(30),
        elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    top_toggle_goldIcon : {
        position : 'absolute', 
        zIndex : 2, 
        width: moderateScale(32), 
        height: moderateScale(32),
        elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    midArea : {
        flex : 4,
    },
    midArea_stepsIcon : {
        width : moderateScale(65), 
        height : moderateScale(65)
    },
    midArea_stepsIconArea : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center',
    },
    midArea_txtArea : {
        flex : 1, 
        justifyContent : 'center', 
        marginLeft : moderateScale(26)
    },
    midArea_txt : {
        fontSize : moderateScale(24), 
        fontWeight : 'bold',
    },
    midArea_content : {
        flex : 5, 
        flexDirection : 'row'
    },
    midArea_contentLeft : {
        flex : 1.5,
    },
    midArea_contentLeft_top : {
        flex : 1, 
        flexDirection : 'row',
        justifyContent : 'center',
        marginLeft : moderateScale(22),
        marginTop : moderateScale(20),
    },
    midArea_contentLeft_bottom : {
        flex : 1, 
        flexDirection : 'row',
        justifyContent : 'center', 
        marginLeft : moderateScale(22),
        marginBottom : moderateScale(20),
    },
    midArea_contentLeft_txtArea : {
        flex : 1.8, 
        marginLeft : scale(10),
    },
    midArea_contentLeft_txtBox1 : {
        flex : 1, 
        flexDirection : 'row', 
        alignItems : 'flex-end',
    },
    midArea_contentLeft_txtBox2 : {
        flex : 1, 
        flexDirection : 'row', 
        alignItems : 'flex-start',
    },
    midArea_contentLeft_txtBox2Det : {
        flex : 1, 
        backgroundColor : '#dddddd', 
        flexDirection : 'row', 
        justifyContent : 'center', 
        alignItems : 'center', 
        borderRadius : moderateScale(5)
    },
    midArea_contentLeft_txtBoxTop1 : {
        fontSize : moderateScale(28), 
        fontWeight : 'bold',
    },
    midArea_contentLeft_txtBoxTop2 : {
        fontSize : moderateScale(15), 
        color : '#c4c4c4', 
        marginLeft : moderateScale(4), 
        marginBottom : moderateScale(5)
    },
    midArea_contentLeft_txtBoxBt1 : {
        fontSize : moderateScale(12), 
        fontWeight : 'bold',
    },
    midArea_contentLeft_txtBoxBt2 : {
        fontSize : moderateScale(12), 
        color : '#606060',
    },
    midArea_contentRight : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center'
    },
    midArea_sleepIconArea : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center',
    },
    midArea_sleepIcon : {
        width : moderateScale(63), 
        height : moderateScale(65)
    },
    midArea_contentRight_txtArea : {
        flex : 1.8, 
        marginLeft : scale(10),
    },
    midArea_contentRight_txtAreaTop : {
        flex : 1, 
        flexDirection : 'row', 
        alignItems : 'center',
    },
    midArea_contentRight_txtAreaTopDet : {
        alignItems : 'flex-end', 
        flexDirection : 'row'
    },
    midArea_contentRight_txtAreaTop1 : {
        fontSize : moderateScale(28), 
        fontWeight : 'bold',
    },
    midArea_contentRight_txtAreaTop2 : {
        fontSize : moderateScale(15), 
        color : '#c4c4c4', 
        marginLeft : moderateScale(4), 
        marginBottom : moderateScale(5)
    },
    midBottom_padding : {
        flex : 0.5,
    }, 
    bottomArea : {
        flex : 4,
        backgroundColor : '#fff'
    },
    bottomArea_txtArea : {
        flex : 1, 
        justifyContent : 'center', 
        marginLeft : moderateScale(26)
    },
    bottomArea_txt : {
        fontSize : moderateScale(24), 
        fontWeight : 'bold',
    },
    bottomArea_subTxtArea : {
        flex : 0.5, 
        flexDirection : 'row', 
        justifyContent : 'flex-start', 
        marginLeft : moderateScale(26)
    },
    bottomArea_subTxt : {
        fontSize : moderateScale(12), 
        fontWeight : 'bold', 
        marginRight : 5,
        color : '#797979'
    },
    topArea_toggle : {
        flex : 1, 
        flexDirection : 'row',
        justifyContent : 'flex-start', 
        alignItems : 'center'
    }, 
    topArea_toggleArea : { 
        width : moderateScale(110),
        height : moderateScale(33),
        justifyContent : 'center',
        alignItems : 'flex-end',
        paddingRight : scale(10),
        borderRadius : 20,
        backgroundColor : '#fff',
        zIndex : 1,
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
    bottomArea_landList : {
        flex : 5, 
    },
    bottomArea_landListBg : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#f5f5f5',
        marginTop : verticalScale(20),
        marginBottom : verticalScale(30),
        marginLeft : scale(25),
        borderTopStartRadius : moderateScale(30),
        borderBottomStartRadius : moderateScale(30),
    }, 
    bottom_flatList : {
        width : moderateScale(100),
        height : moderateScale(100),
        backgroundColor : 'white',
        borderRadius : moderateScale(30),
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : scale(15),
        marginRight : scale(15),
        marginBottom : verticalScale(25),
        marginTop : verticalScale(25),
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
    bottom_landImage : {
        position : 'absolute',
        width : moderateScale(70),
        height : moderateScale(70),
    },
    bottom_landImageColor : {
        position : 'absolute',
        width : moderateScale(70),
        height : moderateScale(70),
        backgroundColor : 'skyblue',
    },
});

/** 랜드 확대/축소 애니메이션 처리함수 */
const handleAnimation = (id, imgFlag1, imgFlag2, imgFlag3, setImgFlag1, setImgFlag2, setImgFlag3, imgResize1, imgResize2, imgResize3) => {
    if(imgFlag1 && id == 1) {
        Animated.timing(imgResize1, {
            toValue: 2,
            duration: 200,
            useNativeDriver: true,
        }).start()
        setImgFlag1(false)
    } else {
        Animated.timing(imgResize1, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
        setImgFlag1(true)
    }

    if(imgFlag2 && id == 2) {
        Animated.timing(imgResize2, {
            toValue: 2,
            duration: 200,
            useNativeDriver: true,
        }).start()
        setImgFlag2(false)
    } else {
        Animated.timing(imgResize2, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
        setImgFlag2(true)
    }

    if(imgFlag3 && id == 3) {
        Animated.timing(imgResize3, {
            toValue: 2,
            duration: 200,
            useNativeDriver: true,
        }).start()
        setImgFlag3(false)
    } else {
        Animated.timing(imgResize3, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
        setImgFlag3(true)
    }
}