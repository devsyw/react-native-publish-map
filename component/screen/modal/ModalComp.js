import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Modal from "react-native-modal";
import { Animated, Dimensions, Image, ImageStore, PanResponder, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { scale, moderateScale, verticalScale, width, height} from '../scaling';
import { EmojiSendMotion, MapStyle1, MapStyle2 } from '../map/KogWorldMapComp'; 
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo, MaterialIcons, Feather, Ionicons, FontAwesome } from '@expo/vector-icons'; 

/** (아니오,예) 모달 팝업 */
export const YnModal = ({msg, subMsg, modalYn, setModalYn, callback, cancleCallback}) => {
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
                        setModalYn(false)
                        cancleCallback ? cancleCallback() : null;
                        
                    }}>
                        <Text style={styles.modalTxtYn}>아니요</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalYnBtn} onPress={() => {
                        setModalYn(false)
                        callback ? callback() : null;
                        
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
                        setModalYn(false)
                        callback ? callback() : null;
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
const kmIcon = require("../../asset/icon/wm_km_icon.png")
export const EmojiModal = (props) => {
    const { modalVisible, setModalVisible, setUserInfoModalVisible } = props;
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

    const closeModal = async () => {
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

    /** 친구 건강 상태바, 12.14 수정, bottomPopStyles 전부 업데이트 하세요!  */
    const UserHeathBar = () => {
        return (
            <View style={bottomPopStyles.healthArea}>
                {/** 이름 및 날짜 */}
                <View style={bottomPopStyles.healthAreaInner1}>
                    {/** 유저 이름 */}
                    <View style={bottomPopStyles.innerTxtArea1}>
                        <Text style={bottomPopStyles.innerTxt1}>USERNAME</Text>
                    </View>

                    {/** 오늘 날짜 */}
                    <View style={bottomPopStyles.innerTxtArea2}>
                        <Text style={bottomPopStyles.innerTxt2}>Today 2021. 12. 12.</Text>
                    </View>
                </View>
                <View style={bottomPopStyles.healthAreaInner2}>
                    {/** 건강정보 요약 박스 */}
                    <View style={bottomPopStyles.healthAreaInner2_col1}>
                        {/** 수면시간 */}
                        <View style={bottomPopStyles.healthAreaInnerBox2}>
                            <View style={bottomPopStyles.healthAreaInnerTxtBox1}>
                                <Image source={sleepIcon} style={bottomPopStyles.healthIconSt}/>
                            </View>
                            <View style={bottomPopStyles.healthAreaInnerTxtBox2}>
                                <Text style={bottomPopStyles.healthTxt}>6.5</Text>
                                <Text style={bottomPopStyles.healthSubTxt}>hours</Text>
                            </View>
                        </View>

                        {/** 걸음수 */}
                        <View style={bottomPopStyles.healthAreaInnerBox1}>
                            <Image source={stepIcon} style={bottomPopStyles.healthIconSt}/>
                            <View style={bottomPopStyles.healthAreaInnerTxtBox2}>
                                <Text style={bottomPopStyles.healthTxt}>90,000</Text>
                                <Text style={bottomPopStyles.healthSubTxt}>steps</Text>
                            </View>
                        </View>

                        {/** 이동거리 */}
                        <View style={bottomPopStyles.healthAreaInnerBox1}>
                            <Image source={kmIcon} style={bottomPopStyles.healthIconSt}/>
                            <View style={bottomPopStyles.healthAreaInnerTxtBox2}>
                                <Text style={bottomPopStyles.healthTxt}>2.3</Text>
                                <Text style={bottomPopStyles.healthSubTxt}>km</Text>
                            </View>
                        </View>
                    </View>

                    {/** 내정보 버튼, 눌러서 내정보 모달팝업 실행 */}
                    <TouchableOpacity 
                        style={bottomPopStyles.healthAreaInner2_col2} 
                        onPress={()=>{        
                            // 이모지 모달 닫기
                            setModalVisible({
                                modalYn : false,
                                sender : {},
                                user : {},
                            });
                            
                            // 내정보 모달 열기
                            setUserInfoModalVisible({
                                modalYn : true,
                                user : {},
                            });
                        }}
                    >
                        <MaterialIcons name="assignment-ind" size={moderateScale(26)} color="#5A67AB" />
                    </TouchableOpacity>
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

/** 내정보 언더팝업, 12.14 수정 */
const myStepIcon = require("../../asset/icon/wm_step_icon.png")
const mySleepIcon = require("../../asset/icon/wm_sleep_icon.png")
const myKmIcon = require("../../asset/icon/wm_km_icon.png")
const myBadge1 = require("../../asset/image/mp_badge1_img.png")
const myBadge2 = require("../../asset/image/mp_badge2_img.png")
const myBadge3 = require("../../asset/image/mp_badge3_img.png")
const myCrt = require("../../asset/image/wm_user_character_img.png")
export const UserInfoModal = (props) => {
    const { modalVisible, setModalVisible, navigation } = props;
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

    return (
        <Modal
            visible={modalVisible.modalYn}
            animationType={"fade"}
            transparent
            statusBarTranslucent
            style={userInfoStyles.modalSt}
        >
            <View style={userInfoStyles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={userInfoStyles.backgroundZone}/>
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{...userInfoStyles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    <View style={userInfoStyles.popArea}>
                        {/** 유저 이름, 닫기버튼 영역 */}
                        <View style={userInfoStyles.topArea}>
                            {/** 유저이름 */}
                            <View style={userInfoStyles.topAreaTxtArea}>
                                <Text style={userInfoStyles.topAreaTxt}>USERNAME</Text>
                            </View>

                            {/** 닫기버튼 */}
                            <TouchableOpacity style={userInfoStyles.topAreaCloseArea} onPress={()=>{closeModal()}}>
                                <Feather name="chevron-down" size={moderateScale(32)} color="#C4C4C4" />
                            </TouchableOpacity>
                        </View>

                        {/** 건강정보 및 아바타 */}
                        <View style={userInfoStyles.midArea}>
                            {/** 건강정보 박스 */}
                            <View style={userInfoStyles.midCol1}>
                                {/** title 및 날짜 */}
                                <View style={userInfoStyles.midCol1_box1}>
                                    <Text style={userInfoStyles.midCol1_box1Txt1}>건강정보</Text>
                                    <Text style={userInfoStyles.midCol1_box1Txt2}>Today (2021. 12. 12.)</Text>
                                </View>

                                {/** 수면시간 */}
                                <View style={userInfoStyles.midCol1_box2}>
                                    <View style={userInfoStyles.midCol1BoxInImg}>
                                        <Image source={mySleepIcon} style={userInfoStyles.midCol1_icon}/>
                                    </View>

                                    <View style={userInfoStyles.midCol1BoxInTxt}>
                                        <Text style={userInfoStyles.midCol1Txt}>5.5</Text>
                                        <Text style={userInfoStyles.midCol1TxtSub}>hours</Text>
                                    </View>
                                </View>

                                {/** 걸음 수 */}
                                <View style={userInfoStyles.midCol1_box3}>
                                    <View style={userInfoStyles.midCol1BoxInImg}>
                                        <Image source={myStepIcon} style={userInfoStyles.midCol1_icon}/>
                                    </View>

                                    <View style={userInfoStyles.midCol1BoxInTxt}>
                                        <Text style={userInfoStyles.midCol1Txt}>90,000</Text>
                                        <Text style={userInfoStyles.midCol1TxtSub}>steps</Text>
                                    </View>
                                </View>

                                {/** 이동거리 */}
                                <View style={userInfoStyles.midCol1_box4}>
                                    <View style={userInfoStyles.midCol1BoxInImg}>
                                        <Image source={myKmIcon} style={userInfoStyles.midCol1_icon}/>
                                    </View>

                                    <View style={userInfoStyles.midCol1BoxInTxt}>
                                        <Text style={userInfoStyles.midCol1Txt}>2.3</Text>
                                        <Text style={userInfoStyles.midCol1TxtSub}>km</Text>
                                    </View>
                                </View>
                            </View>

                            {/** 아바타 영역 */}
                            <View style={userInfoStyles.midCol2}>
                                <Image source={myCrt} style={userInfoStyles.midCol1_crtImg}/>
                            </View>
                        </View>

                        {/** 대표명예템 */}
                        <View style={userInfoStyles.bottomArea}>
                            {/** 타이틀 및 전체보기 버튼 */}
                            <View style={userInfoStyles.bottomTitleArea}>
                                {/** 대표 명예템 title */}
                                <View style={userInfoStyles.bottomTitle}>
                                    <Text style={userInfoStyles.bottomTitleTxt}>대표 명예템</Text>
                                </View>

                                {/** 전체보기 버튼 */}
                                <View style={userInfoStyles.bottomAllBadgeBtnArea}>
                                    <TouchableOpacity
                                        style={userInfoStyles.bottomAllBadgeBtn}
                                        onPress={()=>{
                                            closeModal();
                                            navigation.push('MyItem');
                                        }}
                                    >
                                        <MaterialIcons name="card-giftcard" size={moderateScale(15)} color="#5A67AB" />
                                        <Text style={userInfoStyles.bottomAllBadgeBtnTxt}>전체보기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/** 뱃지 Area */}
                            <View style={userInfoStyles.bottomBadgeArea}>
                                {/** 뱃지 1 */}
                                <View style={userInfoStyles.bottomBadgeArea_box1}>
                                    <Image source={myBadge1} style={userInfoStyles.bottomBadgeArea_badgeImg}/>
                                </View>

                                {/** 뱃지 2 */}
                                <View style={userInfoStyles.bottomBadgeArea_box2}>
                                    <Image source={myBadge2} style={userInfoStyles.bottomBadgeArea_badgeImg}/>
                                </View>

                                {/** 뱃지 3 */}
                                <View style={userInfoStyles.bottomBadgeArea_box3}>
                                    <Image source={myBadge3} style={userInfoStyles.bottomBadgeArea_badgeImg}/>
                                </View>
                            </View>
                        </View>

                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

/** 그룹원 위치공유 모달팝업, 12.15 수정 */
const friendsCrt = require("../../asset/image/wm_user_character_img.png")
export const UserLocIvtModal = ({modalYn, setModalYn, callback}) => {

    /** 아이템박스 바꾸기 토글 */
    const [friendsToggle, setFriendsToggle] = useState(false);
    const toggleSwitch = () => {
        setFriendsToggle(friendsToggle => !friendsToggle);
    };

    // 친구 위치 요청 Tab : 상황별 UI 변경 샘플 데이터, status로 구분
    const [data, setData] = useState([
        {
            name : '영우우우우우우우우',
            status : 1, //기본 상태
        },
        {
            name : '사도오오오오오오오',
            status : 2, //위치공유 신청중
        },
        {
            name : '지연몬',
            status : 3, //위치공유중
        },
        {
            name : '민정몬',
            status : 1, //기본 상태
        },
    ])  

    /** 친구 위치 요청 Row */
    const FriendsRow = ({data}) => {  
        return (
            <View style={userLocIvtStyles.freindsRowArea}>
                {/** 아바타, 이름영역 */}
                <View style={userLocIvtStyles.freindsRowBox1}>
                    {/** 아바타 */}
                    <View style={userLocIvtStyles.freindsRowAva}>
                        <Image source={friendsCrt} style={userLocIvtStyles.freindsAvaImg}/>
                    </View>

                    {/** 이름 */}
                    <Text style={userLocIvtStyles.freindsNameTxt}>{data.name}</Text>

                    {/** 로케이션 아이콘(위치공유중이면 파란색으로 변함) */}
                    <Ionicons name="location-sharp" size={moderateScale(18)} color={data.status === 3 ? '#3298FF' : '#CFCFCF' } />
                </View>

                {/** 버튼영역 */}
                <View style={userLocIvtStyles.freindsRowBox2}>
                    {/** 신청 버튼 */}
                    {
                        data.status === 1 ? (
                            <TouchableOpacity style={userLocIvtStyles.ivtBtn1}>
                                <Text style={userLocIvtStyles.ivtBtnTxt1}>신청</Text>
                                <FontAwesome name="paper-plane" style={userLocIvtStyles.ivtBtnIcon1}/>
                            </TouchableOpacity>
                        ) : null
                    } 

                    {/** 신청중 취소 버튼 */}
                    {
                        data.status === 2 ? (
                            <TouchableOpacity style={userLocIvtStyles.ivtBtn2}>
                                <Text style={userLocIvtStyles.ivtBtnTxt2}>신청 중...</Text>
                                <FontAwesome name="close" style={userLocIvtStyles.ivtBtnIcon2}/>
                            </TouchableOpacity>
                        ) : null
                    } 

                    {/** 위치공유중 취소 버튼 */}
                    {
                        data.status === 3 ? (
                            <TouchableOpacity style={userLocIvtStyles.ivtBtn3}>
                                <Text style={userLocIvtStyles.ivtBtnTxt3}>취소</Text>
                                <MaterialIcons name="location-off" style={userLocIvtStyles.ivtBtnIcon3}/>
                            </TouchableOpacity>
                        ) : null
                    } 
                </View>
            </View>
        )
    }

    /** 내 위치 요청 Row */
    const IvtFriendsRow = ({data}) => {  
        return (
            <View style={userLocIvtStyles.freindsRowArea}>
                {/** 아바타, 이름영역 */}
                <View style={userLocIvtStyles.freindsRowBox1}>
                    {/** 아바타 */}
                    <View style={userLocIvtStyles.freindsRowAva}>
                        <Image source={friendsCrt} style={userLocIvtStyles.freindsAvaImg}/>
                    </View>

                    {/** 이름 */}
                    <Text style={userLocIvtStyles.freindsNameTxt}>{data.name}</Text>

                    {/** 로케이션 아이콘(위치공유중이면 파란색으로 변함) */}
                    <Ionicons name="location-sharp" size={moderateScale(18)} color={data.status === 3 ? '#3298FF' : '#CFCFCF' } />
                </View>

                {/** 버튼영역 */}
                <View style={userLocIvtStyles.freindsRowBox2}>
                    {/** 거절/수락 버튼 */}
                    <TouchableOpacity style={userLocIvtStyles.myIvtBtn1}>
                        <Text style={userLocIvtStyles.ivtBtnTxt1}>거절</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={userLocIvtStyles.myIvtBtn2}>
                        <Text style={userLocIvtStyles.ivtBtnTxt1}>수락</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }

    return (
        <Modal
            isVisible = {modalYn}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={userLocIvtStyles.modalPopArea}
        >
            <View style={userLocIvtStyles.modalPop}>
                {/** 모달 타이틀 */}
                <View style={userLocIvtStyles.modalTitleArea}>
                    <Text style={userLocIvtStyles.modalTitleTxt}>위치 공유할 친구를 선택해주세요!</Text>
                </View>

                {/** 위치요청 분류 버튼 */}
                <View style={userLocIvtStyles.modalChangeBtnArea}>
                    <View style={userLocIvtStyles.modalChangeBtnInner}>
                        <TouchableOpacity 
                            style={!friendsToggle ? userLocIvtStyles.modalChangeBtn1 : userLocIvtStyles.modalChangeBtn2} 
                            onPress={() => {friendsToggle ? toggleSwitch() : null}}
                        >
                            <Text style={!friendsToggle ? userLocIvtStyles.modalChangeTxt1 : userLocIvtStyles.modalChangeTxt2}>
                                그룹 친구
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={friendsToggle ? userLocIvtStyles.modalChangeBtn1 : userLocIvtStyles.modalChangeBtn2} 
                            onPress={() => {!friendsToggle ? toggleSwitch() : null}}
                        >
                            {/** 알림, 빨간 동그라미 */}
                            <View style={userLocIvtStyles.modalChangeAlr}></View>
                            <Text style={friendsToggle ? userLocIvtStyles.modalChangeTxt1 : userLocIvtStyles.modalChangeTxt2}>
                                받은 신청
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/** 친구리스트 : 친구 위치 요청 Tab, 내 위치 요청 Tab */}

                {
                    !friendsToggle ? (
                        <View style={userLocIvtStyles.modalFriendsListArea}>
                            {/** 기본 상태 */}
                            <FriendsRow data={data[0]}/> 
        
                            {/** 위치공유 신청중 */}
                            <FriendsRow data={data[1]}/>
        
                            {/** 위치공유중 */}
                            <FriendsRow data={data[2]}/>
        
                            {/** 기본 상태 */}
                            <FriendsRow data={data[0]}/>
                        </View>
                    ) : (
                        <View style={userLocIvtStyles.modalFriendsListArea}>
                            {/** 기본 상태 */}
                            <IvtFriendsRow data={data[0]}/> 
        
                            {/** 위치공유 신청중 */}
                            <IvtFriendsRow data={data[1]}/>
                        </View>
                    )
                }
            </View>

            {/** 닫기버튼 영역 */}
            <View style={userLocIvtStyles.modalCloseArea}>
                <TouchableOpacity 
                    style={userLocIvtStyles.modalCloseBtn} 
                    onPress={()=>{
                        setModalYn(false);
                        callback ? callback() : null;
                    }}
                >
                    <FontAwesome name="close" size={moderateScale(24)} color="#FA517A" />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

/** 그룹원 위치공유 스타일, 12.15 수정 */
const userLocIvtStyles = StyleSheet.create({
    modalPopArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    modalPop : {
        width : scale(280),
        height: verticalScale(440),
        backgroundColor: "white",
        borderRadius: scale(20),
        padding : moderateScale(20),
    },
    modalTitleArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'flex-start',
    },
    modalTitleTxt : {
        fontSize : moderateScale(17),
        fontWeight : 'bold',
    },
    modalChangeBtnArea : {
        flex : 1,
        justifyContent : 'flex-start', 
        alignItems : 'center',
    },
    modalFriendsListArea : {
        flex : 4,
    },
    modalCloseArea : {
        marginTop : verticalScale(10),
        justifyContent : 'flex-end', 
        alignItems : 'center',
    },
    modalCloseBtn : {
        width : scale(70),
        height : verticalScale(35),
        backgroundColor : '#F3F4F8',
        borderRadius : moderateScale(30),
        justifyContent : 'center', 
        alignItems : 'center',
    },
    modalChangeBtnInner : {
        flexDirection : 'row',
        width : '100%',
        height : verticalScale(40),
        backgroundColor : '#EEF3FF',
        borderRadius : 30,
        justifyContent : 'center',
        padding : moderateScale(5),
    },
    modalChangeBtn1 : {
        flex : 1,
        padding : 0,
        backgroundColor : '#3797FE',
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
    },
    modalChangeBtn2 : {
        flex : 1,
        padding : 5,
        backgroundColor : '#EEF3FF',
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
    },
    modalChangeTxt1 : {
        fontSize : moderateScale(12),
        fontWeight : 'bold',
        color : '#fff',
    },
    modalChangeTxt2 : {
        fontSize : moderateScale(12),
        fontWeight : 'bold',
        color : '#B9B9B9',
    },
    modalChangeAlr : {
        width : moderateScale(10), 
        height : moderateScale(10), 
        backgroundColor : '#FA517A', 
        position : 'absolute', 
        right : scale(20), 
        top : verticalScale(2), 
        borderRadius : 100
    },
    freindsRowArea : {
        flexDirection : 'row',
        width : scale(240),
        height : verticalScale(60),
        borderBottomColor : '#A9A9A9',
        borderBottomWidth : 0.5,
    },
    freindsRowBox1 : {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
    freindsRowBox2 : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    freindsRowAva : {
        width : scale(40),
        height : verticalScale(40),
        justifyContent : 'center',
        alignItems : 'center',
    },
    freindsAvaImg : {
        resizeMode : 'contain',
        width : '100%',
        height : '100%',
    },  
    freindsNameTxt : {
        fontSize : moderateScale(10),
        color : '#696969',
        marginHorizontal : scale(5),
    },
    ivtBtn1 : {
        width : '90%',
        height : verticalScale(24),
        backgroundColor : '#3298FF',
        borderRadius : moderateScale(5),
        justifyContent : 'center',
        alignItems : 'center',
    },
    ivtBtn2 : {
        width : '90%',
        height : verticalScale(24),
        backgroundColor : '#BCDEFF',
        borderRadius : moderateScale(5),
        justifyContent : 'center',
        alignItems : 'center',
    },
    ivtBtn3 : {
        width : '90%',
        height : verticalScale(24),
        backgroundColor : '#CFCFCF',
        borderRadius : moderateScale(5),
        justifyContent : 'center',
        alignItems : 'center',
    },
    ivtBtnTxt1 : {
        fontSize : moderateScale(10),
        fontWeight : 'bold',
        color : '#fff',
    },
    ivtBtnTxt2 : {
        fontSize : moderateScale(10),
        fontWeight : 'bold',
        color : '#fff',
    },
    ivtBtnTxt3 : {
        fontSize : moderateScale(10),
        fontWeight : 'bold',
        color : '#979797',
    },
    ivtBtnIcon1 : {
        position : 'absolute',
        alignItems : 'center',
        right : scale(7),
        fontSize : moderateScale(10),
        color : '#fff',
    },
    ivtBtnIcon2 : {
        position : 'absolute',
        alignItems : 'center',
        right : scale(7),
        fontSize : moderateScale(10),
        color : '#fff',
    },
    ivtBtnIcon3 : {
        position : 'absolute',
        alignItems : 'center',
        right : scale(7),
        fontSize : moderateScale(10),
        color : '#fff',
    },
    myIvtBtn1 : {
        width : '45%',
        height : verticalScale(24),
        backgroundColor : '#CFCFCF',
        borderRadius : moderateScale(5),
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : scale(5),
    },
    myIvtBtn2 : {
        width : '45%',
        height : verticalScale(24),
        backgroundColor : '#3298FF',
        borderRadius : moderateScale(5),
        justifyContent : 'center',
        alignItems : 'center',
    },
})

/** 내정보 팝업 스타일, 12.14 수정 */
const userInfoStyles = StyleSheet.create({
    modalSt : {
        margin : 0,
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    backgroundZone: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: verticalScale(570),
        backgroundColor: "white",
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
    },
    popArea : {
        flex : 1,
        padding : scale(30),
    },
    topArea : {
        flex : 1,
        flexDirection : 'row',
    },
    midArea : {
        flex : 4,
        flexDirection : 'row',
    },
    bottomArea : {
        flex : 2.3,
    },
    topAreaTxtArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'flex-start',
    },
    topAreaTxt : {
        fontSize : moderateScale(20),
        fontWeight : 'bold',
    },
    topAreaCloseArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'flex-end',
    },
    midCol1 : {
        flex : 1,
        justifyContent : 'center',
    },
    midCol2 : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'flex-end',
    },
    midCol1_box1 : {
        flex : 1,
        justifyContent : 'center',
    },
    midCol1_box2 : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#F3F4F8',
        justifyContent : 'center',
        borderRadius : moderateScale(15),
        marginBottom : verticalScale(10),
    },
    midCol1_box3 : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#F3F4F8',
        justifyContent : 'center',
        borderRadius : moderateScale(15),
        marginBottom : verticalScale(10),
    },
    midCol1_box4 : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#F3F4F8',
        justifyContent : 'center',
        borderRadius : moderateScale(15),
        marginBottom : verticalScale(10),
    },
    midCol1_box1Txt1: {
        fontSize : moderateScale(15),
        marginBottom : verticalScale(3),
        color : '#555555',
    },
    midCol1_box1Txt2 : {
        fontSize : moderateScale(10),
        color : '#555555',
    },
    midCol1_icon : {
        resizeMode : 'contain',
        width : moderateScale(28),
        height : moderateScale(28),
    },
    midCol1BoxInImg : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    midCol1BoxInTxt : {
        flex : 1.4,
        justifyContent : 'center',
        alignItems : 'center',
    },
    midCol1Txt : {
        fontSize : moderateScale(14),
        fontWeight : 'bold',
    },
    midCol1TxtSub : {
        fontSize : moderateScale(10),
    },
    midCol1_crtImg : {
        resizeMode : 'contain',
        width : '80%',
        height : '80%',
    },
    bottomTitleArea : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    },
    bottomBadgeArea : {
        flex : 2.5,
        flexDirection : 'row',
        backgroundColor : '#F3F4F8',
        borderRadius : moderateScale(15),
        padding : moderateScale(10),
    },
    bottomTitle : {
        flex : 1,
        alignItems : 'flex-start',
    },
    bottomAllBadgeBtnArea : {
        flex : 1,
        alignItems : 'flex-end',
    },
    bottomAllBadgeBtn : {
        width : scale(80),
        height : verticalScale(30),
        backgroundColor : '#F3F4F8',
        borderRadius : moderateScale(12),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomTitleTxt : {
        fontSize : moderateScale(15),
        marginBottom : verticalScale(3),
        color : '#555555',
    },
    bottomAllBadgeBtnTxt : {
        fontSize : moderateScale(11),
        marginLeft : scale(5),
        color : '#5A67AB',
    },
    bottomBadgeArea_box1 : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomBadgeArea_box2 : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomBadgeArea_box3 : { 
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomBadgeArea_badgeImg : {
        resizeMode : 'contain',
        width : moderateScale(80),
        height : moderateScale(80),
    },
})

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
        height : verticalScale(180),
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
        borderRadius : moderateScale(30), // 12.14 수정
        justifyContent : 'center',
        padding : moderateScale(5), // 12.14 수정
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
    popAreaSwtIcon : { // 12.14 수정
        width : moderateScale(22),
        height : moderateScale(22),
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
        marginLeft : scale(15),
        marginRight : scale(15),
    },
    healthAreaInner1 : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'flex-end',
        justifyContent : 'space-around',
        marginLeft : scale(15),
        marginRight : scale(15),
        //backgroundColor : '#000'
    },
    healthAreaInner2 : {
        flex : 2,
        flexDirection : 'row',
    },
    healthAreaInner2_col1 : {
        flex : 4,
        flexDirection : 'row',
        margin : moderateScale(10),
        backgroundColor : '#F3F4F8',
        borderRadius : moderateScale(10),
        paddingLeft : scale(3),
        paddingRight : scale(3),
    },
    healthAreaInner2_col2 : {
        flex : 1,
        margin : moderateScale(10),
        marginLeft : 0,
        backgroundColor : '#F3F4F8',
        borderRadius : moderateScale(10),
        justifyContent : 'center',
        alignItems : 'center',
    },
    innerTxtArea1 : {
        flex : 1,
    },
    innerTxtArea2 : {
        flex : 1,
    },
    innerTxt1 : {
        fontSize : moderateScale(16),
        fontWeight : 'bold',
    },
    innerTxt2 : {
        fontSize : moderateScale(11),
        textAlign : 'right',
        color : '#555555',
    },
    healthAreaInnerBox1 : {
        flex : 1,
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
    healthAreaInnerBox3 : {
        flex : 1,
        justifyContent : 'space-around', 
        alignItems : 'center',
        flexDirection :'row',
    },
    healthIconSt : {
        resizeMode : 'contain',
        width : moderateScale(20),
        height : moderateScale(20),
    },
    healthAreaInnerTxtBox1 : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center', 
        alignItems : 'center',
    },
    healthAreaInnerTxtBox2 : {
        flex : 2,
        justifyContent : 'center', 
        alignItems : 'center',
    },
    healthTxt : {
        fontSize : moderateScale(12),
        fontWeight : 'bold',
        color : '#000',
    },
    healthSubTxt : {
        fontSize : moderateScale(9),
        color : '#535353',
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
