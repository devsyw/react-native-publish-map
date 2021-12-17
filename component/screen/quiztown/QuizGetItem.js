import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale, height} from '../scaling';
import { GoldBar } from '../map/KogWorldMapComp';
import { useState } from 'react';
import { YnImageModal } from '../modal/ModalComp';

/** 이미지 */
const bgPattern = require('../../asset/pattern/ptn_ballon.png'); 
const testImg = require('../../asset/image/l_apple_enterprise_img.png'); 
export const QuizGetItem = ({navigation}) => {
    return (
        <ImageBackground source={bgPattern} style={styles.container} resizeMode={'repeat'}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFA9C'} translucent={false} />

            {/** 상단영역, padding */}
            <View style={styles.topArea}></View>

            {/** 중앙영역, 선물 영역 */}
            <View style={styles.midArea}>
                {/** 선물 Box */}
                <View style={styles.midBoxArea}>
                    <View style={styles.midBox}>
                        {/** 이미지 영역 */}
                        <View style={styles.midBoxImgArea}>
                            <Image source={testImg} style={styles.midBoxImg}/>
                        </View>

                        {/** 텍스트 영역 */}
                        <View style={styles.midBoxTxtArea}>
                            <Text style={styles.midBoxTxt1}>축하합니다!</Text>
                            <Text style={styles.midBoxTxt2}>{`뽑으신 기업 건물을 타운에 건설할 수 있습니다\n지금 건설하시겠습니까?`}</Text>
                        </View>

                        {/** 버튼 영역 */}
                        <View style={styles.midBoxBtnArea}>
                            {/** 아니오 */}
                            <TouchableOpacity style={styles.midBoxBtn1}>
                                <Text style={styles.midBoxBtnTxt1}>아니요, 보관함에 보관!</Text>
                            </TouchableOpacity>

                            {/** 네 */}
                            <TouchableOpacity style={styles.midBoxBtn2}>
                                <Text style={styles.midBoxBtnTxt2}>네! 지금 건설!</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>

            {/** 하단영역, padding */}
            <View style={styles.bottomArea}></View>
        </ImageBackground>
    ) 
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : '#FFFA9C',
    }, 
    gobackBtn : {
        position : 'absolute',
        top : moderateScale(20),
        left : moderateScale(15),
    },
    topArea : {
        flex : 1,
    }, 
    midArea : {
        flex : 2,
        marginHorizontal : scale(18),
    },
    bottomArea : {
        flex : 1,
    },
    midBoxArea : {
        flex : 2,
    },
    midBox : {
        width : '100%',
        height : '100%',
        backgroundColor : '#fff',
        borderRadius : moderateScale(30),
        padding : moderateScale(20),
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
    midBoxImgArea : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'center',
    },
    midBoxTxtArea : {
        flex : 1.2,
        marginTop : verticalScale(3),
        justifyContent : 'center',
        alignItems : 'center',
    },
    midBoxBtnArea : {
        flex : 0.8,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    midBoxImg : {
        resizeMode : 'contain',
        width : moderateScale(160),
        height : moderateScale(160),
    },
    midBoxTxt1 : {
        fontSize : moderateScale(24),
        fontWeight : 'bold',
        marginBottom : verticalScale(5),
    },
    midBoxTxt2 : {
        fontSize : moderateScale(13),
        textAlign : 'center',
        lineHeight : verticalScale(20),
    },
    midBoxBtn1 : {
        width : scale(130),
        height : verticalScale(40),
        backgroundColor : '#CFCFCF',
        borderRadius : moderateScale(14),
        marginRight : scale(10),
        justifyContent : 'center',
        alignItems : 'center',
    },
    midBoxBtn2 : {
        width : scale(130),
        height : verticalScale(40),
        backgroundColor : '#3298FF',
        borderRadius : moderateScale(14),
        justifyContent : 'center',
        alignItems : 'center',
    },
    midBoxBtnTxt1 : {
        fontSize : moderateScale(12),
        fontWeight : 'bold',
        color : '#8F8F8F'
    },
    midBoxBtnTxt2 : {
        fontSize : moderateScale(12),
        fontWeight : 'bold',
        color : '#fff',
    },
});
