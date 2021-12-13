import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image } from 'react-native';
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
export default function GroupCreateTown({navigation, route, options, back}){

    /** 타운 선택시 style변경 state */
    const [townPic, setTownPic] = useState(1)

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
                    <GroupPageNavIcon pageNum={4}/>
                </View>
                
                {/** 제목 및 초대장 버튼 */}
                <View style={styles.topArea_top}>
                    <Text style={styles.topArea_top_txt}>건설할 타운을 선택해주세요!</Text>
                </View>

                {/** 타운 선택란 */}
                <View style={styles.topArea_mid}>
                    <TouchableOpacity 
                        style={townPic === 1 ? [styles.topArea_midBox, {backgroundColor : '#FA517A'}] : styles.topArea_midBox} 
                        onPress={()=>{setTownPic(1)}}>
                        <Image source={town1} style={styles.topArea_midBoxImg}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={townPic === 2 ? [styles.topArea_midBox, {backgroundColor : '#FA517A'}] : styles.topArea_midBox} 
                        onPress={()=>{setTownPic(2)}}>
                        <Image source={town2} style={styles.topArea_midBoxImg}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={townPic === 3 ? [styles.topArea_midBox, {backgroundColor : '#FA517A'}] : styles.topArea_midBox} 
                        onPress={()=>{setTownPic(3)}}>
                        <Image source={town3} style={styles.topArea_midBoxImg}/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/** padding */}
            <View style={styles.midArea}></View>

            {/** 하단영역, 다음페이지 버튼 */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('GroupCreateTownName')
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
        flex : 1,
        justifyContent : 'center',
    },
    midArea : {
        flex : 1.2,
        marginRight : scale(30),
        marginLeft : scale(30),
    },
    midArea_mid : {
        flex: 5.4,
        flexDirection : 'row',
    },
    
    bottomArea : {
        flex : 0.3,
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
    topArea_mid : {
        flex : 3,
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginRight : scale(25),
        marginLeft : scale(25),
    },
    topArea_midBox : {
        flex : 1,
        backgroundColor : '#f5f5f5',
        margin : moderateScale(3),
        justifyContent: 'center',
        alignItems : 'center',
        width : moderateScale(100),
        height : moderateScale(100),
        borderRadius : 20,
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
    topArea_midBoxImg : {
        resizeMode : 'contain',
        width : 120,
        height : 120,
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

})