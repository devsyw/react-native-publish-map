import React, { useEffect, useRef, useState } from 'react';
import Modal from "react-native-modal";
import { Animated, Dimensions, Image, ImageStore, PanResponder, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { scale, moderateScale, verticalScale, width, height} from '../scaling';
import { EmojiSendMotion, MapStyle1, MapStyle2 } from '../map/KogWorldMapComp'; 
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo } from '@expo/vector-icons'; 

/** (아니오,예) 모달 팝업 */
export const YnModal = ({msg, modalYn, setModalYn, callback}) => {
    return (
        <Modal
            isVisible = {modalYn}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={styles.modalPopArea}
        >
            <View style={styles.modalPop}>
                <View style={styles.modalQBox}>
                    <Text style={styles.modalTxt}>{msg}</Text>
                </View>
                
                <View style={styles.modalBtn}>
                    <TouchableOpacity style={styles.modalYnBtn} onPress={() => setModalYn(false)}>
                        <Text style={styles.modalTxtYn}>아니요</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalYnBtn} onPress={() => {
                        callback ? callback() : null;
                        setModalYn(false)
                    }}>
                        <Text style={styles.modalTxtYn}>예</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

/** (예) 모달 팝업 */
export const YModal = ({msg, subMsg, option, modalYn, setModalYn, callback}) => {
    return (
        <Modal
            isVisible = {modalYn}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={styles.modalPopArea}
        >
            <View style={styles.modalPop}>
                <View style={styles.modalQBox}>
                    <Text style={styles.modalTxt}>{msg}</Text>
                </View>
                {
                    subMsg ? (
                        <View style={styles.modalSubQBox}>
                            <Text style={styles.modalSubTxt}>{subMsg}</Text>
                        </View>
                    ) : null
                }
                <View style={styles.modalBtn}>
                    <TouchableOpacity style={styles.modalYnBtn} onPress={() => {
                        callback ? callback() : null;
                        setModalYn(false)
                    }}>
                        <Text style={styles.modalTxtYn}>{option ? option : '예'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

/** 바텀 Emoji 팝업 */
const emoji1 = require("../../asset/image/wm_emoji1_img.png")
const emoji2 = require("../../asset/image/wm_emoji2_img.png")
const emoji3 = require("../../asset/image/wm_emoji3_img.png")
const emoji4 = require("../../asset/image/wm_emoji4_img.png")
const coinIcon = require("../../asset/icon/wm_coin_icon.png")
const stepIcon = require("../../asset/icon/wm_step_icon.png")
const sleepIcon = require("../../asset/icon/wm_sleep_icon.png")
export const EmojiModal = (props) => {
    const { modalVisible, setModalVisible } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible.modalYn) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible.modalYn]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible( {
              modalYn : false,
              sender : {},
              user : {},
            });
        })
    }

    /** 이모지 모션처리 state */
    const [count1, setCount1] = useState(false)
    const [count2, setCount2] = useState(false)
    const [count3, setCount3] = useState(false)
    const [count4, setCount4] = useState(false)
    const [count5, setCount5] = useState(false)
    const [imgs, setImg] = useState();
    const countSetNum = () => {
        if(!count1) {
            setCount1(true)
            return setCount1;
        } else if(!count2) {
            setCount2(true)
            return setCount2;
        } else if(!count3) {
            setCount3(true)
            return setCount3;
        } else if(!count4) {
            setCount4(true)
            return setCount4;
        } else if(!count5) {
            setCount5(true)
            return setCount5;
        }
    }

    /** 친구 건강 상태바 */
    const UserHeathBar = () => {
        return (
            <View style={bottomPopStyles.healthArea}>
                <View style={bottomPopStyles.healthAreaInner}>
                    {/** 걸음수 */}
                    <View style={bottomPopStyles.healthAreaInnerBox1}>
                        <Image source={stepIcon} style={bottomPopStyles.healthIconSt}/>
                        <Text style={bottomPopStyles.stepCountTxt}>5,238</Text>
                        <View style={bottomPopStyles.stepKmSt}>
                            <Text style={bottomPopStyles.stepKmTxt}>2.4Km</Text>
                        </View>
                    </View>

                    {/** 수면시간 */}
                    <View style={bottomPopStyles.healthAreaInnerBox2}>
                        <Image source={sleepIcon} style={bottomPopStyles.healthIconSt}/>
                        <Text style={bottomPopStyles.sleepTimeTxt}>3.5 Hour</Text>
                    </View>
                </View>
            </View>
        )        
    }

    /** 이모지 리스트 뷰 */
    const EmojiList = () => {
        return (
            <View style={bottomPopStyles.emojiArea}>
                {/** 1행(이모지 3개) */}
                <View style={bottomPopStyles.emojiRow}>
                    <TouchableOpacity style={bottomPopStyles.emojiPicArea} onPress={()=>{countSetNum(); setImg(emoji1)}}>
                        {/** 이모지 */}
                        <Image source={emoji1} style={bottomPopStyles.emojiSize}/>
                        {/** 골드리워드 아이콘 */}
                        <Image source={coinIcon} style={bottomPopStyles.goldIconBt}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomPopStyles.emojiPicArea} onPress={()=>{countSetNum(); setImg(emoji2)}}>
                        <Image source={emoji2} style={bottomPopStyles.emojiSize}/>
                        {/** 골드리워드 아이콘 */}
                        <Image source={coinIcon} style={bottomPopStyles.goldIconBt}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomPopStyles.emojiPicArea} onPress={()=>{countSetNum(); setImg(emoji3)}}>
                        <Image source={emoji3} style={bottomPopStyles.emojiSize}/>
                        {/** 골드리워드 아이콘 */}
                        <Image source={coinIcon} style={bottomPopStyles.goldIconBt}/>
                    </TouchableOpacity>
                </View>
                {/** 2행(이모지 3개) */}
                <View style={bottomPopStyles.emojiRow}>
                    <TouchableOpacity style={bottomPopStyles.emojiPicArea} onPress={()=>{countSetNum(); setImg(emoji4)}}>
                        <Image source={emoji4} style={bottomPopStyles.emojiSize}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomPopStyles.emojiPicArea} onPress={()=>{countSetNum(); setImg(emoji1)}}>
                        <Image source={emoji1} style={bottomPopStyles.emojiSize}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomPopStyles.emojiPicArea} onPress={()=>{countSetNum(); setImg(emoji2)}}>
                        <Image source={emoji2} style={bottomPopStyles.emojiSize}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <Modal
            visible={modalVisible.modalYn}
            animationType={"fade"}
            transparent
            statusBarTranslucent
            style={{margin : 0}}
        >
            <View style={bottomPopStyles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={bottomPopStyles.backgroundZone}/>
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{...bottomPopStyles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    {/** 헬스 바 */}
                    <UserHeathBar />
                    {/** 이모지 리스트 */}
                    <EmojiList />
                </Animated.View>
            </View>
            { count1 ? <EmojiSendMotion img={imgs} setCount={setCount1}/> : null }
            { count2 ? <EmojiSendMotion img={imgs} setCount={setCount2}/> : null }
            { count3 ? <EmojiSendMotion img={imgs} setCount={setCount3}/> : null }
            { count4 ? <EmojiSendMotion img={imgs} setCount={setCount4}/> : null }
            { count5 ? <EmojiSendMotion img={imgs} setCount={setCount5}/> : null }
        </Modal>
    )
}

/** 랜드/월드 이동 언더팝업 */
const mapHealth = require('../../asset/button/wm_health_content_btn.png')
const mapFinance = require('../../asset/button/wm_finance_content_btn.png')
const mapChangeIcon1 = require('../../asset/button/wm_contents_inactive_btn.png')
const mapChangeIcon1Action = require('../../asset/button/wm_contents_active_btn.png')
const mapChangeIcon2 = require('../../asset/button/wm_land_inactive_btn.png')
const mapChangeIcon2Action = require('../../asset/button/wm_land_active_btn.png')
export const WorldModal = (props) => {
    const { modalVisible, setModalVisible } = props;
    const { map } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible.modalYn) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible.modalYn]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible( {
              modalYn : false,
              user : {},
            });
        })
    }

    /** 맵 바꾸기 토글 */
    const [mapToggle, setMapToggle] = useState(false);
    const toggleSwitch = () => {
        mapToggle ? map(MapStyle1) : map(MapStyle2);
        setMapToggle(mapToggle => !mapToggle);
    };
    
  
    return (
        <Modal
            visible={modalVisible.modalYn}
            animationType={"fade"}
            transparent
            statusBarTranslucent
            style={{margin : 0}}
        >
            <View style={bottomPopStyles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={bottomPopStyles.backgroundZone}/>
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{...bottomPopStyles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    <View style={styles.popArea}>
                        {/** 지도바꾸기 토글 */}
                        <View style={styles.popChangeMapArea}>
                            {/** 텍스트영역 */}
                            <View style={styles.popAreaInner_top}>
                                <Text style={styles.popAreaInner_topTxt}>지도 바꾸기</Text>
                            </View>

                            {/** 맵변경 토글 */}
                            <View style={styles.popAreaInner_bottom}>
                                <View style={styles.popAreaInner_bottomInner}>
                                    {/** 월드 */}
                                    <TouchableOpacity style={!mapToggle ? styles.popAreaSwt1 : styles.popAreaSwt2} onPress={() => {mapToggle ? toggleSwitch() : null}}>
                                        {mapToggle ? (<Image source={mapChangeIcon1} style={styles.popAreaSwtIcon}/>) :
                                                      (<Image source={mapChangeIcon1Action} style={styles.popAreaSwtIcon}/>)}
                                    </TouchableOpacity>

                                    {/** 퍼플랜드 */}
                                    <TouchableOpacity style={mapToggle ? styles.popAreaSwt1 : styles.popAreaSwt2} onPress={() => {!mapToggle ? toggleSwitch() : null}}>
                                        {!mapToggle ? <Image source={mapChangeIcon2} style={styles.popAreaSwtIcon}/> : 
                                                     <Image source={mapChangeIcon2Action} style={styles.popAreaSwtIcon}/>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/** 즐기기 */}
                        <View style={styles.popEnjoyArea}>
                            {/** 텍스트영역 */}
                            <View style={styles.popAreaInner_top}>
                                <Text style={styles.popAreaInner_topTxt}>즐기기</Text>
                            </View>

                            <View style={styles.popAreaInner_bottom2}>
                                <View style={styles.popEnjoyBtnArea}>
                                    <Image source={mapHealth} style={styles.popEnjoyBtn}/>
                                    <View style={styles.popEnjoyBtnSelect}>
                                        <BouncyCheckbox
                                            size={moderateScale(24)}
                                            fillColor="blue"
                                            unfillColor="#dddddd"
                                            iconStyle={{ borderColor: "#fff" }}
                                            isChecked={true}
                                        />
                                    </View>
                                </View>

                                <View style={styles.popEnjoyBtnArea}>
                                    <Image source={mapFinance} style={styles.popEnjoyBtn}/>
                                    <View style={styles.popEnjoyBtnSelect}>
                                        <BouncyCheckbox
                                            size={moderateScale(24)}
                                            fillColor="blue"
                                            unfillColor="#dddddd"
                                            iconStyle={{ borderColor: "#fff" }}
                                            isChecked={false}
                                        />
                                    </View>
                                </View>

                                {/** 자물쇠 아이콘 */}
                                <View style={styles.popEnjoyBtnArea}>
                                    <View style={styles.popEnjoyBtnLock}>
                                        <Entypo name="lock" size={24} color="#FA517A" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalPopArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    modalPop : {
        justifyContent : 'center',
        alignItems : 'center',
        width : scale(250),
        height : verticalScale(150),
        borderRadius : moderateScale(20),
        backgroundColor : '#282828',
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
    },
    popArea : {
        flex : 1,
        padding : scale(30),
    },
    popChangeMapArea : {
        flex : 1,
        justifyContent : 'center', 
    },
    popEnjoyArea : {
        flex : 1,
        justifyContent : 'center', 
    },
    popAreaInner_top : {
        flex : 1,
        justifyContent : 'center', 
        alignItems : 'flex-start',
    },
    popAreaInner_topTxt : {
        fontSize : moderateScale(20),
        fontWeight : 'bold',
    },
    popAreaInner_bottom : {
        flex : 1,
        justifyContent : 'flex-start', 
        alignItems : 'center',
    },
    popAreaInner_bottomInner : {
        flexDirection : 'row',
        width : '100%',
        height : verticalScale(40),
        backgroundColor : '#EEF3FF',
        borderRadius : 30,
        justifyContent : 'center',
    },
    popAreaSwt1 : {
        flex : 1,
        padding : 0,
        backgroundColor : '#3797FE',
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
    },
    popAreaSwt2 : {
        flex : 1,
        padding : 5,
        backgroundColor : '#EEF3FF',
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
    },
    popAreaInner_bottom2 : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between', 
        alignItems : 'center',
    },
    popEnjoyBtnArea : {
        width : moderateScale(70),
        height : moderateScale(70),
    },
    popEnjoyBtn : {
        width : moderateScale(60),
        height : moderateScale(60),
    },
    popEnjoyBtnLock : {
        width : moderateScale(60),
        height : moderateScale(60),
        backgroundColor : '#dddddd',
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center',
    },
    popEnjoyBtnSelect : {
        position : 'absolute', 
        right : moderateScale(-10), 
        top : moderateScale(-5)
    },
    popAreaSwtIcon : {
        width : moderateScale(32),
        height : moderateScale(32),
    },
})

/** 바텀 이모지 팝업 스타일 */
const bottomPopStyles = StyleSheet.create({
    modalSt : {
        margin : 0,
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        //backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    backgroundZone: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: verticalScale(280),
        backgroundColor: "white",
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
    },
    sendEmoji : {
        ...StyleSheet.absoluteFillObject,
    },
    sendEmojiImg : {
        width : 80,
        height : 80,
    },
    sendEmojiImgArea : {
        bottom : verticalScale(40),
        justifyContent: 'center', 
        alignItems: 'center',
    },
    motion : {
        width : 100,
        height : 100,
        justifyContent : 'center',
        alignItems : 'center',
        bottom : verticalScale(330),
    },
    healthArea : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center',
    },
    healthAreaInner : {
        width : '80%',
        height : '50%',
        flexDirection : 'row',
        backgroundColor : 'skyblue',
        borderRadius : moderateScale(30),
    },
    healthAreaInnerBox1 : {
        flex : 1.5,
        justifyContent : 'space-around', 
        alignItems : 'center',
        flexDirection :'row',
    },
    healthAreaInnerBox2 : {
        flex : 1,
        justifyContent : 'space-around', 
        alignItems : 'center',
        flexDirection :'row',
    },
    healthIconSt : {
        width : moderateScale(30),
        height : moderateScale(30),
    },
    stepCountTxt : {
        fontSize : moderateScale(14),
        fontWeight : 'bold',
        color : '#fff',
    },
    sleepTimeTxt : {
        fontSize : moderateScale(14),
        fontWeight : 'bold',
        color : '#fff',
    },
    stepKmSt : {
        padding : 5,
        justifyContent : 'center', 
        alignItems : 'center',
        backgroundColor : 'rgba(255,255,255,0.5)',
        borderRadius : moderateScale(10),
    },
    stepKmTxt : {
        fontSize : 10,
        fontWeight : 'bold',
    },
    emojiArea : { 
        flex : 2, 
        justifyContent : 'center',
    },
    emojiRow : {
        flex : 1,
        flexDirection : 'row', 
        alignItems : 'center',
        justifyContent : 'space-around',
        marginLeft : '5%',
        marginRight : '5%',
    },
    emojiPicArea : {
        width : moderateScale(90),
        height : moderateScale(90),
        alignItems : 'center',
        justifyContent : 'center',
    },
    emojiSize : {
        width : moderateScale(80),
        height : moderateScale(80),
    },
    goldIconBt : {
        position : 'absolute',
        width : moderateScale(20),
        height : moderateScale(20),
        borderColor : '#fff',
        top : moderateScale(7),
        right : moderateScale(7),
    },
})
