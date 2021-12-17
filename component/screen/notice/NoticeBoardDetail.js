import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale, height} from '../scaling';

/** 테스트 이미지, 아무거나 넣음 */
const testImg = require('../../asset/image/mc_nintendo_img.png'); 
export const NoticeBoardDetail = ({navigation}) => {

    const titleTxt = `오늘 단 하루! 스몰어스에서 진행되는 이벤트를 소개해드릴게요. 오늘부터 진행되는 머머머.`;

    const contentTxt = ` 메타버스는 현실 세계를 부분적으로, 혹은 완전히 대체하는 가상 세계를 일컫는다. 아직 현실에 적용되기엔 멀고 먼 얘기다. 그럼에도 불구하고 수많은 메타(구 페이스북), 마이크로소프트, 애플 등의 IT 공룡을 비롯해 엔비디아 등의 반도체 기업도 가담해 저마다 “메타버스에 미래가 있다”고 외치는 상황이다.
    \n메타버스란 용어의 기원은 닐 스티븐슨 작가의 1992년 소설 ‘스노우 크래시’로 알려져 있다. 소설의 주인공인 히로는 피자 배달원으로 일하고 있지만 메타버스 세계에선 세계 제일의 검객으로 활동한다. 히로에게 가상의 세계는 현실보다 더 현실적인 공간인 셈이다. 현실의 세계를 초월(meta)한 가상의 세계(universe)라는 의미에서 메타버스로 명명됐다.
    \n소설 속에서처럼 현실에서 완벽하게 메타버스를 구현하는 기술은 아직 존재하지 않는다. 다만 구현 가능성에 대한 예시는 이미 20여년전부터 있었다. 지난 2003년 린든 랩이 출시한 가상현실(VR) 기반의 게임인 ‘세컨드 라이프’를 비롯해 미국의 힙합 가수 트래비스 스콧과 팝 가수 아리아나 그란데 등이 에픽게임즈의 배틀로얄 게임 ‘포트나이트’에서 콘서트를 개최한 것이 대표적 사례로 꼽힌다.`;

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 상단영역, 뒤로가기 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn} onPress={()=>{navigation.goBack()}}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>
            </View>

            {/** 중앙영역, 사진 및 내용 영역 */}
            <View style={styles.midArea}>
                <ScrollView 
                    style={styles.midScrollView} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                >
                    {/** Title Area */}
                    <View style={styles.titleArea}>
                        <Text style={styles.titleTxt}>{titleTxt}</Text>
                    </View>

                    {/** Image Area */}
                    <View style={styles.imageArea}>
                        <Image source={testImg} style={styles.imageSt} />
                    </View>

                    {/** Content Area */}
                    <View style={styles.contentArea}>
                        <Text>{contentTxt}</Text>
                    </View>
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
    titleArea : {
        marginTop : verticalScale(20),
        marginBottom : verticalScale(40),
    },
    imageArea : {
        width : '100%',
        maxHeight : verticalScale(200),
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#E3E3E3'
    },
    imageSt : {
        resizeMode : 'contain',
        width : '100%',
        height : '100%',
    },
    titleTxt : {
        fontSize : moderateScale(20),
        fontWeight : 'bold',
    },
    midArea : {
        flex : 9,
    },
    midScrollView : {
        backgroundColor : '#fff',
        marginHorizontal: scale(25), 
        
    },
    contentArea : {
        marginVertical : verticalScale(40),
    },
});
