import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, StatusBar } from 'react-native';
import { scale, moderateScale, verticalScale, height, width} from '../scaling';
import { Fontisto, AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { 
    GroupPageNavIcon,
    GroupGoBackBtn, 
    GroupNextPageBtn, 
} from './KogGroupComp';
import { 
    YModal, 
    YnModal 
} from '../modal/ModalComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function GroupCreateInv({navigation, route, options, back}){

    /** 안내모달팝업 YN */
    const [modalYn, setModalYn] = useState(true)

    /** 친구들에게 초대장 보내는 확인 팝업 YN */
    const [invModalYn, setInvModalYn] = useState(false)

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
                    <FontAwesome name="close" size={12} color="#c4c4c4" />
                </TouchableOpacity> 
            ) : null}
        </View>
    )

    // 테스트 데이터, 지워도 됩니다.
    const DATA = [
        {
            id : 1,
            appName : '영우몬',
            name : '서영우',
            phoneNum : '010-1234-5555'
        },
        {
            id : 2,
            appName : '민철몬',
            name : '김민철',
            phoneNum : '010-1234-5555'
        },
        {
            id : 3,
            appName : '지연몬',
            name : '김지연',
            phoneNum : '010-1234-5555'
        },
        {
            id : 4,
            appName : '민정몬',
            name : '전민정',
            phoneNum : '010-1234-5555'
        },
        {
            id : 5,
            appName : '항덕몬',
            name : '정학덕',
            phoneNum : '010-1234-5555'
        },
        {
            id : 6,
            appName : '사도몬',
            name : '서사도',
            phoneNum : '010-1234-5555'
        },
        {
            id : 7,
            appName : '도헌몬',
            name : '금도헌',
            phoneNum : '010-1234-5555'
        },
    ]

    /** FlatList Element */
    const renderItem = ({item}) => (
        <View style={{flex : 1, flexDirection : 'row'}}>
            {/** side padding */}
            <View style={styles.renderItem_sidePadding}></View>

            {/** 사진영역 */}
            <View style={styles.renderItem_left}>
                <View style={styles.renderItem_imgArea}></View>
            </View>

            {/** 닉네임, 전화번호부에 저장된 이름, 전화번호 data */}
            <View style={styles.renderItem_mid}>
                <Text style={styles.renderItem_txt}>{item.appName}</Text>
                <Text style={styles.renderItem_txt}>{item.name}</Text>
                <Text style={[styles.renderItem_txt, {fontWeight : 'bold'}]}>{item.phoneNum}</Text>
            </View>

            {/** Check Box */}
            <View style={styles.renderItem_bottom}>
                <BouncyCheckbox
                    size={moderateScale(28)}
                    fillColor="blue"
                    unfillColor="#c4c4d4"
                    iconStyle={{ borderColor: "#c4c4c4" }}
                    onPress={() => {}}
                />

                {/** 가입되어있는 친구일때 */}
                {/* <Text style={styles.renderItem_bottomTxt}>가입됨</Text> */}
            </View>

            {/** side padding */}
            <View style={styles.renderItem_sidePadding}></View>
        </View>
    );
    
    return (
        <KeyboardAwareScrollView 
            style={styles.container} 
            contentContainerStyle={{height : height, width : width}}
            resetScrollToCoords={{ x: 0, y: 0 }} 
            scrollEnabled={false}
        >
            {/** 화면진입시 안내 팝업 */}
            <YModal
                modalYn={modalYn} 
                setModalYn={setModalYn} 
                msg={`'USERNAME' 님의\n첫번째 그룹을 만들어보세요!`}
                subMsg={`최대 다섯명의 친구를 선택할 수 있어요\n회원님 혼자만의 그룹도 가능하답니다:)`}
                option={`알겠습니다`}
            />

            {/** 친구 선택 후 다음버튼 클릭 */}
            <YnModal
                modalYn={invModalYn} 
                setModalYn={setInvModalYn}
                msg={`선택한 친구들에게\n'틀림없는 딱따구리들'\n초대장을 보내시겠습니까?`}
                callback={()=>{
                    navigation.push('GroupCreateSet') //
                }}
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
                    <GroupPageNavIcon pageNum={1}/>
                </View>
                
                {/** 제목 및 초대장 버튼 */}
                <View style={styles.topArea_top}>
                    <Text style={styles.topArea_top_txt}>그룹 만들기</Text>
                    <TouchableOpacity style={styles.topArea_rightBtn}>
                        <Entypo name="mail" size={moderateScale(16)} color="#5A67AB" />
                        <Text style={styles.topArea_rightTxt}>새친구 초대창</Text>
                    </TouchableOpacity>
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

                {/** 검색바 */}
                <View style={styles.topArea_bottom}>
                    {/** 검색바 InputBox 영역 */}
                    <TextInput
                        style={styles.textInputBox}
                        placeholder={'검색'}
                        maxLength = {11}
                        fontSize={moderateScale(18)}
                        width={scale(300, 0.3)}
                        height={moderateScale(40, 0.2)}
                        textAlign={'center'}
                        backgroundColor={'#E2E8EF'}
                        borderRadius={30}
                        keyboardDidChangeFrame={false}
                    />
                    {/** 돋보기 아이콘 */}
                    <AntDesign style={styles.readingGlasses} name="search1" color="#596198" />
                </View>
            </View>
            
            {/** 중앙영역, 연락처 리스트 */}
            <View style={styles.midArea}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

            {/** 하단영역, 다음페이지 버튼 */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => {
                        setInvModalYn(true)
                    }} //테스트용
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
        fontSize : 10,
        color : '#5A67AB',
        marginLeft : scale(3),
        marginRight : scale(3),
    },
    topArea_midBoxClose : {
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : scale(3),
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
    readingGlasses : {
        fontSize : moderateScale(16),
        fontWeight : 'bold',
        position : 'absolute',
        zIndex : 2,
        left : scale(50),
        elevation: (Platform.OS === 'android') ? 50 : 0,
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
    //FlatList 렌더 아이템
    renderItem_sidePadding : {
        flex : 0.4, 
    },
    renderItem_left : {
        flex : 1.5, 
        justifyContent : 'center', 
        alignItems : 'center'
    },
    renderItem_mid : {
        flex : 4, 
        margin : moderateScale(10),
    },
    renderItem_bottom : {
        flex : 1, 
        justifyContent : 'center', 
        alignItems : 'center',
    },
    renderItem_bottomTxt : {
        color : '#6969',
        textAlign : 'center',
    },
    renderItem_imgArea : {
        backgroundColor : '#c4c4c4', 
        borderRadius : moderateScale(26), 
        width : moderateScale(60), 
        height : moderateScale(60),
    },
    renderItem_txt : {
        fontSize : moderateScale(16), 
    },
    topArea_rightBtn : {
        flexDirection : 'row',
        width : scale(100),
        height : moderateScale(34),
        borderRadius : moderateScale(15),
        backgroundColor : '#F3F4F8',
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
    topArea_rightTxt : {
        fontSize : moderateScale(10),
        color : '#5A67AB',
        marginLeft : scale(8),
    },
})