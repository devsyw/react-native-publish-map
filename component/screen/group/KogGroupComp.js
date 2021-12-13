import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import _debounce from 'lodash/debounce' //더블탭방지.

import { scale, moderateScale, verticalScale} from '../scaling'; //스케일 정의(따로 임포트 시켜야함)

/** 그룹생성시 페이지 단계표기 UI */
export const GroupPageNavIcon = ({pageNum}) => {
    return (
        <View style={styles.topArea_top}>
            {pageNum === 1 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
            {pageNum === 2 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
            {pageNum === 3 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
            {pageNum === 4 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
            {pageNum === 5 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
            {pageNum === 6 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
        </View>
    )
}

/** 그룹생성시 다음화면 이동 버튼 */
export const GroupNextPageBtn = ({navigation, pageName, backgroundColor='#FFF', arrowColor='#000'}) => {
    return (
        <TouchableOpacity
            onPress={_debounce(() => navigation.push(pageName), 250)}
            style={[styles.nextPageBtn, {backgroundColor}]}
        >
            <Fontisto name="arrow-right" size={moderateScale(24)} color={arrowColor} />
        </TouchableOpacity>
    )
}

/** 그룹생성시 뒤로가기(goBack) 버튼 */
export const GroupGoBackBtn = ({navigation, colorChange}) => {
    return (
        <TouchableOpacity
            onPress={_debounce(() => navigation.goBack(), 250)}
            style={styles.gobackBtn}
        >
            <Ionicons name="chevron-back" size={moderateScale(30)} color='#3298FF'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    topArea_top : {
        flex : 0.5,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'flex-start',
        marginTop : moderateScale(22),
    },
    topArea_mid : {
        flex : 1.5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    topArea_bottom : {
        flex : 0.5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    topPageBar : {
        top : verticalScale(15), 
        width : scale(30), 
        height : verticalScale(5), 
        borderRadius: moderateScale(5), 
        backgroundColor: '#FA517A',
        marginLeft : scale(2),
        marginRight : scale(2),
    },
    topPageBar_empty : {
        top : verticalScale(15), 
        width : scale(30), 
        height : verticalScale(5), 
        borderRadius: moderateScale(5), 
        backgroundColor: '#C4C4C4',
        marginLeft : scale(2),
        marginRight : scale(2),
    },
    wordArea : {
        textAlign : 'center',
        fontSize : moderateScale(25, 0.4),
        color : '#000',
        fontWeight : "600",
        lineHeight: moderateScale(40),
    },
    gobackBtn : {
        position : 'absolute',
        top : moderateScale(22),
        left : moderateScale(15),
        zIndex : 3,
        elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    nextPageBtn : { //미사용중
        width : moderateScale(80, 0.3),
        height : moderateScale(55, 0.2),
        backgroundColor : '#FFF',
        borderRadius : moderateScale(60),
        margin : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    textInputBox : {
        marginLeft : scale(4),
        marginRight : scale(4),
        zIndex : 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
})
