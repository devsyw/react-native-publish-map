import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, TextInput } from 'react-native';
import { scale, moderateScale, verticalScale, height, width} from '../scaling';
import { Fontisto } from '@expo/vector-icons';
import { 
    GroupPageNavIcon,
    GroupGoBackBtn, 
    GroupNextPageBtn, 
} from './KogGroupComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/** 이미지 */
const town1 = require('../../asset/image/mg_town1_img.png'); 
const town2 = require('../../asset/image/mg_town2_img.png'); 
const town3 = require('../../asset/image/mg_town3_img.png'); 
export default function GroupCreateTownName({navigation, route, options, back}){

    return (
        <KeyboardAwareScrollView 
            style={styles.container} 
            contentContainerStyle={{height : height, width : width}}
            resetScrollToCoords={{ x: 0, y: 0 }} 
            scrollEnabled={false}
        >

            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 상단영역, 소개/검색바 */}
            <View style={styles.topArea}>
                {/** 이전 페이지로 돌아가기 버튼 */}
                <GroupGoBackBtn navigation={navigation}/>
                
                {/** 페이지 구분 */}
                <View style={styles.topArea_info}>
                    {/** 상단 현재 페이지 영역 */}
                    <GroupPageNavIcon pageNum={5}/>
                </View>
                
                {/** 제목 */}
                <View style={styles.topArea_top}>
                    <Text style={styles.topArea_top_txt}>타운 이름을 설정해주세요!</Text>
                </View>
            </View>
            
            {/** padding */}
            <View style={styles.midArea}>
                {/** 선택된 타운 이미지 */}
                <View style={styles.midArea_top}>
                    <Image source={town1} style={styles.topArea_midBoxImg}/>
                </View>

                {/** 타운이름 Input */}
                <View style={styles.midArea_mid}>
                    <TextInput
                        style={styles.textInputBox}
                        placeholder={'타운 이름'}
                        maxLength = {11}
                        fontSize={moderateScale(18)}
                        width={scale(300, 0.3)}
                        height={moderateScale(40)} //12.14 수정
                        textAlign={'center'}
                        backgroundColor={'#E2E8EF'}
                        borderRadius={moderateScale(30)} //12.14 수정
                        keyboardDidChangeFrame={false}
                    />
                </View>

                {/** padding */}
                <View style={styles.midArea_bottom}></View>
            </View>

            {/** 하단영역, 다음페이지 버튼 */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('GroupCreateTownMarker')
                    }}
                    style={[styles.nextPageBtn, {backgroundColor : '#3298FF'}]}
                >
                    <Fontisto name="arrow-right" size={moderateScale(20)} color={'#FFF'} />
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
    },
    topArea : {
        flex : 0.45,
        justifyContent : 'center',
    },
    midArea : {
        flex : 2,
        marginRight : scale(30),
        marginLeft : scale(30),
    },
    midArea_top : {
        flex : 2,
        justifyContent: 'center',
        alignItems : 'center',
    },
    midArea_mid : {
        flex : 1,
    },
    midArea_bottom : {
        flex : 2,
    },
    bottomArea : {
        flex : 0.3,
        marginBottom : Platform.OS === 'android' ? verticalScale(10) : 0, // 12.14 수정(임시)
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
    },
    topArea_info : {
        flex : 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems : 'flex-start',
    },
    topArea_top : {
        flex : 1,
        flexDirection : 'row',
        justifyContent: 'space-evenly',
        alignItems : 'center',
        marginRight : scale(30),
        marginLeft : scale(30),
    },
    topArea_top_txt : {
        flex : 1,
        fontSize: moderateScale(22), 
        fontWeight : 'bold',
    },
    topArea_midBoxImg : { // 12.14 수정
        resizeMode : 'contain',
        width : moderateScale(200),
        height : moderateScale(200),
    },
    nextPageBtn : {
        width : moderateScale(80, 0.3),
        height : moderateScale(55, 0.2),
        backgroundColor : '#FFF',
        borderRadius : moderateScale(60),
        margin : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    textInputBox : {
        fontSize : moderateScale(18),
        width : moderateScale(340, 0.3),
        height : moderateScale(40, 0.2),
        textAlign : 'center',
        backgroundColor : '#fff',
        borderRadius : 30,
    },
})