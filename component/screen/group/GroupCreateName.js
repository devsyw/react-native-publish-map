import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, StatusBar } from 'react-native';
import { scale, moderateScale, verticalScale, height, width} from '../scaling';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import { 
    GroupPageNavIcon,
    GroupGoBackBtn, 
    GroupNextPageBtn, 
} from './KogGroupComp';
import { 
    YnModal 
} from '../modal/ModalComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function GroupCreateName({navigation, route, options, back}){

    /** 상단 선택된 이름 테스트 데이터, 지워도 됩니다. */
    let nameData = [
        {
            id : 1,
            name : '영우몬',
            isMe : true,
        },
        {
            id : 2,
            name : '김수한무두루미와거북',
            isMe : false,
        },
        {
            id : 3,
            name : '가나다라마바사아자차',
            isMe : false,
        },
        {
            id : 4,
            name : '민정몬',
            isMe : false,
        },
        {
            id : 5,
            name : '우후후후후루꾸꾸',
            isMe : false,
        },
    ]

    /** 캐릭터 선택시 FlatList Elemet */
    const renderName = ({item}) => (
        <View style={!item.isMe ? styles.topArea_midBox : [styles.topArea_midBox, {backgroundColor: '#3298FF'}]}>
            <Text style={!item.isMe ? styles.topArea_midBoxTxt : [styles.topArea_midBoxTxt, {color: '#fff'}]}>{item.name}</Text>
            {!item.isMe ? (
                <TouchableOpacity style={styles.topArea_midBoxClose}>
                    <FontAwesome name="close" size={moderateScale(12)} color="#c4c4c4" />
                </TouchableOpacity> 
            ) : null}
        </View>
    )

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
                    <GroupPageNavIcon pageNum={3}/>
                </View>
                
                {/** 제목 및 초대장 버튼 */}
                <View style={styles.topArea_top}>
                    <Text style={styles.topArea_top_txt}>그룹 만들기</Text>
                </View>

                {/** 선택한 친구의 이름 표기영역 */}
                <View style={styles.topArea_mid}>
                    {/** 선택한 친구들 타이틀 */}
                    <View style={styles.topArea_midTop}>
                        <Text style={styles.topArea_midTopTitle}>선택한 친구들</Text>
                    </View>

                    {/** 선택한 친구들 FlatList */}
                    <View style={styles.topArea_midBottom}>
                        <FlatList
                            data={nameData}
                            horizontal = {true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderName}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>

                {/** padding */}
                <View style={styles.topArea_bottom}></View>
            </View>
            
            {/** 중앙영역, 그룹이름 인풋박스 영역 */}
            <View style={styles.midArea}>
                {/** 타이틀 */}
                <View style={styles.midArea_title}>
                    <Text style={styles.midArea_titleTxt}>그룹 이름을 만들어주세요!</Text>
                </View>

                {/** 그룹이름 */}
                <View style={styles.midArea_mid}>
                    <TextInput
                        style={styles.textInputBox}
                        placeholder={'그룹 이름'}
                        maxLength = {11}
                        fontSize={moderateScale(18)}
                        width={scale(300, 0.3)}
                        height={moderateScale(40)} // 12.14 수정
                        textAlign={'center'}
                        backgroundColor={'#E2E8EF'}
                        borderRadius={30}
                        keyboardDidChangeFrame={false}
                    />
                </View>

            </View>

            {/** 하단영역, 다음페이지 버튼 */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('GroupCreateTown')
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
        flex : 1.8,
        marginRight : scale(30),
        marginLeft : scale(30),
    },
    midArea_title : {
        flex: 0.7,  
    },
    midArea_titleTxt : {
        fontSize: moderateScale(22), 
        fontWeight : 'bold',
    },
    textInputBox : {
        fontSize : moderateScale(18),
        width : moderateScale(340, 0.3),
        height : moderateScale(40, 0.2),
        textAlign : 'center',
        backgroundColor : '#fff',
        borderRadius : 30,
    },
    midArea_mid : {
        flex: 5.4,
        flexDirection : 'row',
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
    topArea_mid : {
        flex : 1,
    },
    topArea_midTop : {
        flex : 1,
        justifyContent : 'center',
        marginLeft : scale(33),
    },
    topArea_midTopTitle : {
        fontSize : moderateScale(15),
        fontWeight : 'bold',
    },
    topArea_midBottom : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginRight : scale(30),
        marginLeft : scale(30),
    },
    topArea_midBox : {
        padding : 5,
        margin : moderateScale(3),
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : moderateScale(16),
        backgroundColor : '#f3f4f8'
    },
    topArea_midBoxTxt : {
        fontSize : moderateScale(10), // 12.14 수정
        color : '#5A67AB',
    },
    topArea_midBoxClose : {
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : scale(3),
    },
    topArea_top_txt : {
        flex : 1,
        fontSize: moderateScale(22), 
        fontWeight : 'bold',
    },
    topArea_bottom : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
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