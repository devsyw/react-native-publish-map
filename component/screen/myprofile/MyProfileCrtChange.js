import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from '../scaling';

/** 이미지 */
const etherIcon = require('../../asset/icon/mp_ethereum_icon.png'); //이더리움 아이콘(코인)
const goldIcon = require('../../asset/icon/wm_coin_icon.png'); //골드 아이콘
const crt = require('../../asset/image/wm_user_character_img.png'); //캐릭터

export const MyProfileCrtChange = ({navigation}) => {

    /** 아바타 박스 */
    const CrtBox = ({item}) => {
        return (
            <TouchableOpacity style={styles.bottom_crtBox}>
                <Image source={crt} style={styles.bottom_crtBox_ele}></Image>
            </TouchableOpacity>
        )
    };

    /** 잠긴 아바타 박스 */
    const LockBox = ({item}) => {
        return (
            <TouchableOpacity style={styles.bottom_crtBox}>
                <MaterialCommunityIcons name="lock" size={30} color="#FA517A" />
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
                        <Text>1,000</Text>
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
                    {/** 나의 아바타 이미지(object) */}
                    <View style={styles.midArea_contentRight}>
                        <Image source={crt} style={styles.midArea_contentCrt}></Image>
                    </View>
                </View>
            </View>

            {/** 하단영역, 캐릭터 선택창 */}
            <View style={styles.bottomArea}>
                <View style={styles.bottomArea_topLine}>
                    <CrtBox />
                    <CrtBox />
                    <LockBox />
                </View>

                <View style={styles.bottomArea_bottomLine}>
                    <LockBox />
                    <LockBox />
                    <LockBox />
                </View>

            </View>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff'
    }, 
    gobackBtn : {
        position : 'absolute',
        top : moderateScale(15),
        left : moderateScale(15),
    },
    topArea : {
        flex : 1,
        flexDirection : 'row',
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
        alignItems : 'center',
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

    midArea_contentRight : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center'
    },
    midArea_contentCrt : {
        width : 180, 
        height : 180, 
        resizeMode: 'contain',
    },
    bottomArea : {
        flex : 4,
        margin : moderateScale(25),
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomArea_topLine : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'flex-end',
    },
    bottomArea_bottomLine : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'flex-start',
    },
    bottom_crtBox : {
        width : moderateScale(100),
        height : moderateScale(100),
        backgroundColor : '#c4c4c4',
        borderRadius : moderateScale(30),
        justifyContent : 'center',
        alignItems : 'center',
        margin : moderateScale(5),
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
    bottom_crtBox_ele : {
        resizeMode : 'contain',
        width: moderateScale(80), 
        height: moderateScale(80),
    },
});
