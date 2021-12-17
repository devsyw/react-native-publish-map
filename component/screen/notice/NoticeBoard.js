import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale} from '../scaling';
import { GoldBar } from '../map/KogWorldMapComp';

/** 이미지 */
const myBadge1 = require("../../asset/image/mp_badge1_img.png")
const myBadge2 = require("../../asset/image/mp_badge2_img.png")
const myBadge3 = require("../../asset/image/mp_badge3_img.png")
const myCrt = require("../../asset/image/wm_user_character_img.png")
const coinIcon = require("../../asset/icon/wm_coin_icon.png")
const town1 = require('../../asset/image/mg_town1_img.png'); 
const town2 = require('../../asset/image/mg_town2_img.png'); 
const town3 = require('../../asset/image/mg_town3_img.png'); 

export const NoticeBoard = ({navigation}) => {

    /** 아이템박스 바꾸기 토글 */
    const [noticeToggle, setNoticeToggle] = useState(false);
    const toggleSwitch = () => {
        setNoticeToggle(noticeToggle => !noticeToggle);
    };

    /** test data1 */
    const DATA1 = [
        {
            title : '‘지연’ 님이 ‘완벽한 판다들’ 그룹에 회원님을 초대했어요! 초대에 응답해주세요 :)',
            date : '12월 15일',
            status : false, // 안읽음
            image : town2
        },
        {
            title : '‘지연’ 님이 나에게 이모지를 보냈습니다!',
            date : '12월 15일',
            status : false, // 안읽음
            image : myCrt
        },
        {
            title : '10골드를 획득하셨습니다!',
            date : '12월 15일',
            status : false, // 안읽음
            image : coinIcon
        },
        {
            title : '‘노는게 제일 좋아(수줍은 너구리들)’ 타운의 기업 건물이 변경되었습니다!',
            date : '12월 15일',
            status : false, // 안읽음
            image : town1
        },
        {
            title : '‘우리들의 작은 마을(귀여운 고라니들)’ 타운의 아지트가 레벨업 되었습니다!',
            date : '12월 15일',
            status : false, // 안읽음
            image : town3
        },
        {
            title : '‘수줍은 너구리들’ 그룹 생성이 완료되었습니다.',
            date : '12월 15일',
            status : true, // 읽음
            image : town1
        },
        {
            title : '‘우리들의 작은 마을(귀여운 고라니들)’ 타운의 100플래티넘이 차감되었습니다!',
            date : '12월 15일',
            status : true, // 읽음
            image : town3
        },
        {
            title : '‘영우몬’님이 위치 공유 신청을 보냈습니다! 응답해주세요 :)',
            date : '12월 15일',
            status : true, // 읽음
            image : myCrt
        },
        {
            title : '‘일이삼사오육칠팔구십’님이 한마디를 보냈습니다!',
            date : '12월 15일',
            status : true, // 읽음
            image : myCrt
        },
        {
            title : '명예템을 획득하셨습니다!',
            date : '12월 15일',
            status : true, // 읽음
            image : myBadge1
        },
        {
            title : '‘오나라노라나’님께서 위치 공유 신청을 거절하셨습니다.',
            date : '12월 15일',
            status : true, // 읽음
            image : myCrt
        }
    ]

    /** test data2 */
    const DATA2 = [
        {
            title : '오늘 단 하루! 스몰어스에서 진행되는 이벤트를 소개해드릴게요. 오늘부터 진행...',
            date : '11월 25일',
            status : false, // 안읽음
        },
        {
            title : '스몰어스에 가입하신 것을 축하드립니다! 스몰어스는 늘 회원님과 함께 합니다...',
            date : '11월 15일',
            status : true, // 읽음
        },
    ]

    /** 알림글 Row */
    const NoticeRowBox1 = ({data}) => {
        return (
            <View style={styles.noticeRow}>
                {/** 이미지 영역 */}
                <View style={styles.noticeRowLeft}>
                    <View style={styles.noticeRowImgArea}>
                        {/** 이벤트 주체 이미지 */}
                        <Image source={data.image} style={styles.noticeRowImg} />

                        {/** 상태 아이콘(이미지 오른쪽아래) */}
                        <View style={data.status ? [styles.noticeRowStatImg, {backgroundColor:'#CDCDCD'}] : styles.noticeRowStatImg }>
                            <MaterialIcons name="record-voice-over" size={moderateScale(12)} color='#fff' />
                        </View>
                    </View>
                </View>

                {/** 타이틀, 날짜, 상태영역 */}
                <View style={styles.noticeRowRight}>
                    {/** 타이틀 영역 */}
                    <View style={styles.noticeTitleArea}>
                        <Text style={data.status ? [styles.noticeTitleTxt, {color : '#CDCDCD'}] : styles.noticeTitleTxt}>{data.title}</Text>
                    </View>

                    {/** 타이틀 아래 sub영역 */}
                    <View style={styles.noticeSubArea}>
                        <Text style={styles.noticeDataTxt}>{data.date}</Text>
                    </View>
                </View>
            </View>
        )
    }

    /** 공지글 Row */
    const NoticeRowBox2 = ({data}) => {
        return (
            <TouchableOpacity style={styles.noticeRow} onPress={()=>{navigation.push('NoticeBoardDetail')}}>
                {/** 이미지 영역 */}
                <View style={styles.noticeRowLeft}>
                    <View style={styles.noticeRowImgArea}>
                        {/** 이벤트 주체 이미지 */}
                        <Image source={data.image} style={styles.noticeRowImg} />

                        {/** 상태 아이콘(이미지 오른쪽아래) */}
                        <View style={data.status ? [styles.noticeRowStatImg, {backgroundColor:'#CDCDCD'}] : styles.noticeRowStatImg }>
                            <MaterialIcons name="record-voice-over" size={moderateScale(12)} color='#fff' />
                        </View>
                    </View>
                </View>

                {/** 타이틀, 날짜, 상태영역 */}
                <View style={styles.noticeRowRight}>
                    {/** 타이틀 영역 */}
                    <View style={styles.noticeTitleArea}>
                        <Text style={data.status ? [styles.noticeTitleTxt, {color : '#CDCDCD'}] : styles.noticeTitleTxt}>{data.title}</Text>
                    </View>

                    {/** 타이틀 아래 sub영역 */}
                    <View style={styles.noticeSubArea}>
                        <Text style={styles.noticeDataTxt}>{data.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 상단영역, 뒤로가기 및 골드 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn} onPress={()=>{navigation.goBack()}}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>

                <GoldBar gold={'10,000'} />
            </View>

            {/** Title Area */}
            <View style={styles.titleArea}>
                <Text style={styles.titleTxt}>공지사항</Text>
            </View>

            {/** toggle Area */}
            <View style={styles.toggleArea}>
                {/** Box Change Button */}
                <View style={styles.noticeChangeBox}>
                    <View style={styles.noticeChangeBoxInner}>
                        {/** 개인알림 */}
                        <TouchableOpacity style={!noticeToggle ? styles.noticeBox1 : styles.noticeBox2} onPress={() => {noticeToggle ? toggleSwitch() : null}}>
                            <MaterialIcons name="record-voice-over" size={moderateScale(24)} color={!noticeToggle ? '#fff' : '#B9B9B9'} />
                        </TouchableOpacity>

                        {/** 공지사항 */}
                        <TouchableOpacity style={noticeToggle ? styles.noticeBox1 : styles.noticeBox2} onPress={() => {!noticeToggle ? toggleSwitch() : null}}>
                            <MaterialIcons name="volume-up" size={moderateScale(24)} color={noticeToggle ? '#fff' : '#B9B9B9'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/** 중앙영역, 알림글 영역 */}
            <View style={styles.midArea}>
                <ScrollView 
                    style={styles.midScrollView} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                >
                    {
                        !noticeToggle ? (
                            <View style={styles.noticeArea}>
                                <NoticeRowBox1 data={DATA1[0]}/>
                                <NoticeRowBox1 data={DATA1[1]}/>
                                <NoticeRowBox1 data={DATA1[2]}/>
                                <NoticeRowBox1 data={DATA1[3]}/>
                                <NoticeRowBox1 data={DATA1[4]}/>
                                <NoticeRowBox1 data={DATA1[5]}/>
                                <NoticeRowBox1 data={DATA1[6]}/>
                                <NoticeRowBox1 data={DATA1[7]}/>
                                <NoticeRowBox1 data={DATA1[9]}/>
                                <NoticeRowBox1 data={DATA1[10]}/>
                            </View>
                        ) : (
                            <View style={styles.noticeArea}>
                                <NoticeRowBox2 data={DATA2[0]}/>
                                <NoticeRowBox2 data={DATA2[1]}/>
                            </View>
                        )
                    }
                    {/** 공지 글 영역 */}

                </ScrollView>
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
    topArea : {
        flex : 1,
        backgroundColor : '#fff',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    }, 
    midArea : {
        flex : 6,
    },
    goldCover : {
        justifyContent: 'center', 
        alignItems: 'center',
        ...Platform.select({ 
            ios: { 
                marginTop : verticalScale(50),
            }, 
            android: { 
                marginTop : verticalScale(50),
            }, 
        }),
    },
    midScrollView : {
        backgroundColor : '#fff',
        marginHorizontal: scale(18), 
    },
    titleArea : {
        flex : 0.7,
        marginHorizontal: scale(18), 
    },
    titleTxt : {
        fontSize : moderateScale(20),
        fontWeight : 'bold',
    },
    toggleArea : {
        flex : 0.7,
        marginHorizontal: scale(18), 
        
    },
    noticeArea : {
        flex : 1, 
    },

    noticeTitleArea : {
        flex : 1,  
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginBottom : verticalScale(10),
    },
    noticeTitleTxt : {
        fontSize : moderateScale(15),
        marginBottom : verticalScale(3),
        color : '#555555',
    },
    noticeChangeBox : {
        flex : 1,
        justifyContent : 'flex-start', 
        alignItems : 'center',
    },
    noticeChangeBoxInner : {
        flexDirection : 'row',
        width : '100%',
        height : verticalScale(40),
        backgroundColor : '#EEF3FF',
        borderRadius : 30,
        justifyContent : 'center',
        padding : moderateScale(5),
    },
    noticeBox1 : {
        flex : 1,
        padding : 0,
        backgroundColor : '#3797FE',
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
    },
    noticeBox2 : {
        flex : 1,
        padding : 5,
        backgroundColor : '#EEF3FF',
        borderRadius : moderateScale(30),
        justifyContent : 'center',
        alignItems : 'center',
    },
    noticeeBadge : {
        resizeMode : 'contain',
        width : moderateScale(22),
        height : moderateScale(22),
    },
    noticeRow : {
        width : '100%',
        padding : moderateScale(5),
        height : verticalScale(90),
        borderBottomWidth : 0.5,
        borderColor : '#C4C4C4',
        flexDirection : 'row',
    },
    noticeRowLeft : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    noticeRowRight : {
        flex : 4.5,
        padding : moderateScale(5),
        marginLeft : scale(5),
        justifyContent : 'flex-start',
    },
    noticeRowImgArea : {
        width : moderateScale(60),
        height : moderateScale(60),
        backgroundColor : '#E3E3E3',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : moderateScale(300),
        padding : moderateScale(5),
    },
    noticeRowImg : {
        resizeMode : 'contain',
        width : '100%',
        height : '100%',
    },
    noticeRowStatImg : {
        width : moderateScale(20), 
        height : moderateScale(20), 
        backgroundColor : '#3298FF', 
        position : 'absolute', 
        right : 0, 
        bottom : 0, 
        borderRadius : moderateScale(300),
        justifyContent : 'center',
        alignItems : 'center',
    },
    noticeTitleArea : {
        flex : 2,
    },
    noticeTitleTxt : {
        fontSize : moderateScale(15),
        fontWeight : 'bold',
    },
    noticeSubArea : {
        flex : 0.5,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'flex-end',
    },
    noticeDataTxt : {
        fontSize : moderateScale(9),
        color : '#7c7c7c',
    },
    noticeStatusTxt : {
        fontSize : moderateScale(9),
        color : '#7c7c7c',
    },
});
