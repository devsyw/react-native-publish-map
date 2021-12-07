import React, { useEffect, useRef, useState } from 'react';
import Modal from "react-native-modal";
import { Animated, Dimensions, Image, PanResponder, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { scale, moderateScale, verticalScale, width, height} from '../scaling';

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

    const EmojiList = () => {
        return (
            <View style={{ flex : 1, flexDirection : 'row', alignItems : 'center'}}>
                <TouchableOpacity><Image source={emoji1} width={50} height={50} /></TouchableOpacity>
                <TouchableOpacity><Image source={emoji2} width={50} height={50} /></TouchableOpacity>
                <TouchableOpacity><Image source={emoji3} width={50} height={50} /></TouchableOpacity>
            </View>
        )
    }

    return (
        <Modal
            visible={modalVisible.modalYn}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={bottomPopStyles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={bottomPopStyles.background}/>
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{...bottomPopStyles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    <EmojiList />
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
    }
})

/** 바텀 이모지 팝업 스타일 */
const bottomPopStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        //alignItems : 'center',
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: verticalScale(280),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
    },

})
