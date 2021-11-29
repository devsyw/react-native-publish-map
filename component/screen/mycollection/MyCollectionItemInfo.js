import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale} from '../scaling';
import { LinearGradient } from 'expo-linear-gradient';

/** 이미지 */
const iphoneImg = require('../../asset/image/mc_bigiphone_img.png'); //아이폰 이미지
const goldIcon = require('../../asset/icon/wm_coin_icon.png'); //골드 아이콘

export const MyCollectionItemInfo = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#3298FF'} translucent={false} />

            {/** 상단 영역 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#fff"/>
                </TouchableOpacity>

                {/** 여백 */}
                <View style={{flex : 2,}}></View>

                <View style={styles.topAreaItem}>
                    
                    {/** 백그라운드 영역 */}
                    <LinearGradient colors={['#3298FF', '#A532FF']} style={styles.topAreaBg} >
                    </LinearGradient>

                    {/** 이미지 영역 */}
                    <Image source={iphoneImg} style={styles.topArea_mainImg} />

                    {/** 이미지 이름(텍스트 영역) */}
                    <Text style={styles.topArea_mainTitle}>Iphone 13</Text>

                </View>

                {/** 보유 골드 */}
                <View style={styles.topArea_toggleSetPosition}>
                    <View style={styles.topArea_toggle}>
                        <Image source={goldIcon} style={styles.top_toggle_goldIcon}></Image>
                        <View style={styles.topArea_toggleArea}>
                            <Text>1,000</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/** 하단 영역 */}
            <View style={styles.bottomArea}>
                {/** padding */}
                <View style={{flex : 1}}></View>

                {/** 아이템 정보 */}
                <View style={{flex : 0.3}}>
                    <Text style={styles.itemInfoTitle}>Detail</Text>
                </View>

                {/** 아이템 설명 */}
                <View style={{flex : 1}}>
                    <Text style={styles.itemInfoContent}>동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세 남산위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</Text>
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
        top : moderateScale(20),
        left : moderateScale(15),
    },
    topArea_toggle : {
        flex : 1, 
        flexDirection : 'row',
        justifyContent : 'flex-start', 
        alignItems : 'flex-start',
    }, 
    topArea_toggleSetPosition : {
        position : 'absolute',
        top : moderateScale(20),
        right : moderateScale(15),
        justifyContent : 'flex-start', 
        alignItems : 'flex-end',
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
    top_toggle_goldIcon : {
        position : 'absolute', 
        zIndex : 2, 
        width: moderateScale(32), 
        height: moderateScale(32),
        elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    topArea : {
        flex : 1.3,
        flexDirection : 'row',
        borderBottomLeftRadius : moderateScale(50),
        borderBottomRightRadius : moderateScale(50),
        backgroundColor : '#3298FF',
        justifyContent : 'center',
        alignItems : 'center',
    },
    topAreaBg : {
        flex : 1,
        backgroundColor : 'blue',
        borderBottomLeftRadius : moderateScale(50),
        borderBottomRightRadius : moderateScale(50),
    },
    topAreaItem : {
        position : 'absolute',
        resizeMode : 'contain',
        width : scale(280),
        height : verticalScale(280),
        top : verticalScale(170),
        justifyContent : 'center',
        alignItems : 'center',
    },
    topArea_mainImg : {
        resizeMode : 'contain',
        width : moderateScale(280),
        height : verticalScale(280),
    },  
    topArea_mainTitle : {
        marginTop : verticalScale(20),
        fontSize : moderateScale(24),
        fontWeight : 'bold',
    },  
    bottomArea : {
        flex : 1,
        marginLeft : scale(50),
        marginRight : scale(50),
    },
    itemInfoTitle : {
        fontSize : moderateScale(20), 
        fontWeight : 'bold', 
        color : 'blue'
    },
    itemInfoContent : {
        fontSize : moderateScale(14), 
    },
});
