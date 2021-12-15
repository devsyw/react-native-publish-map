import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, StatusBar, Platform } from 'react-native';
import { scale, moderateScale, verticalScale, height, width} from '../scaling';
import { Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { 
    GroupPageNavIcon,
    GroupGoBackBtn, 
    GroupNextPageBtn, 
} from './KogGroupComp';
import { 
    YnModal 
} from '../modal/ModalComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function GroupCreateSet({navigation, route, options, back}){

    /** 모드 버튼 클릭/변경 시 색상 변경 state */
    const [btnColor, setBtnColor] = useState(true)

    /** 공유모드 확인 모달팝업 YN */
    const [modalYn, setModalYn] = useState(false)

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
            {/** 화면진입시 권한 팝업(임시) */}
            <YnModal
                modalYn={modalYn} 
                setModalYn={setModalYn}
                msg={`함께 공유 모드를\n선택하신게 맞으신가요?`}
                subMsg={'선택하신 모드는 변경이 불가합니다.'}
                callback={()=>{navigation.push('GroupCreateName')}}
                cancleCallback={()=>{}}
            />

            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 상단영역, 소개/검색바 */}
            <View style={styles.topArea}>
                {/** 이전 페이지로 돌아가기 버튼 */}
                <GroupGoBackBtn navigation={navigation}/>
                
                {/** 페이지 구분 */}
                <View style={styles.topArea_info}>
                    {/** 상단 현재 페이지 영역 */}
                    <GroupPageNavIcon pageNum={2}/>
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
            
            {/** 중앙영역, 그룹모드 선택영역 */}
            <View style={styles.midArea}>
                {/** 타이틀 */}
                <View style={styles.midArea_title}>
                    <Text style={styles.midArea_titleTxt}>그룹 모드를 선택해주세요!</Text>
                </View>

                {/** 함께 공유모드 버튼 */}
                <View style={styles.midArea_1}>
                    <TouchableOpacity 
                        style={btnColor ? [styles.midArea_1Btn, {backgroundColor : '#FA517A'}] : styles.midArea_1Btn}
                        onPress={() => {setBtnColor(true)}}
                    >
                        <MaterialIcons name="location-pin" style={btnColor ? [styles.midArea_btnIcon, {color : '#fff'}] : styles.midArea_btnIcon} />
                        <Text style={btnColor ? [styles.midArea_btnTxt, {color : '#fff'}] : styles.midArea_btnTxt}>
                            함께 공유 모드
                        </Text>
                    </TouchableOpacity>
                </View>

                {/** 함께 공유모드 설명 */}
                <View style={styles.midArea_2}>
                    <Text style={styles.midArea_contentTxt}>
                        {`회원님과 그룹 친구들이 실제 위치를 서로 공유합니다.\n말하지 않아도 통하는 그 느낌 아시죠? :)`}
                    </Text>
                </View>

                {/** 사생활 보호모드 버튼 */}
                <View style={styles.midArea_3}>
                    <TouchableOpacity 
                        style={!btnColor ? [styles.midArea_3Btn, {backgroundColor : '#FA517A'}] : styles.midArea_3Btn}
                        onPress={() => {setBtnColor(false)}}
                    >
                        <MaterialIcons name="not-listed-location" style={!btnColor ? [styles.midArea_btnIcon, {color : '#fff'}] : styles.midArea_btnIcon}/>
                        <Text style={!btnColor ? [styles.midArea_btnTxt, {color : '#fff'}] : styles.midArea_btnTxt}>
                            사생활 보호 모드
                        </Text>
                    </TouchableOpacity>
                </View>

                {/** 사생활 보호모드 설명 */}
                <View style={styles.midArea_4}>
                    <Text style={styles.midArea_contentTxt}>
                        {`회원님과 그룹 친구들의 실제 위치가 노출되지 않습니다.\n위치 노출이 염려되신다면 사생활 보호 모드를 사용해보세요!`}
                    </Text>
                </View>

                {/** padding */}
                <View style={styles.midArea_5}></View>
            </View>

            {/** 하단영역, 다음페이지 버튼 */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => {
                        setModalYn(true)
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
    midArea_1 : {
        flex: 0.7,
        flexDirection : 'row',
    },
    midArea_1Btn : {
        width : '100%',
        height : '85%',
        flexDirection : 'row',
        backgroundColor : '#DEDEDE',
        borderRadius : moderateScale(20),
        justifyContent: 'center',
        alignItems : 'center',
    },
    midArea_2 : {
        flex: 1,
        marginRight : scale(10),
        marginLeft : scale(10),
    },
    midArea_3 : {
        flex: 0.7,
        flexDirection : 'row',
    },
    midArea_3Btn : {
        width : '100%',
        height : '85%',
        flexDirection : 'row',
        backgroundColor : '#DEDEDE',
        borderRadius : moderateScale(20),
        justifyContent: 'center',
        alignItems : 'center',
    },
    midArea_4 : {
        flex: 1,
        marginRight : scale(10),
        marginLeft : scale(10),
    },
    midArea_5 : {
        flex: 2,
    },
    midArea_btnTxt : {
        color : '#797979',
        fontWeight : 'bold',
        fontSize : moderateScale(14),
        marginRight : scale(3),
        marginLeft : scale(3),
    },
    midArea_btnIcon : {
        fontSize : moderateScale(24),
        color : '#797979', 
    },
    midArea_contentTxt : {
        fontSize : moderateScale(11),
        color : '#565656'
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