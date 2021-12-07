import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { Fontisto, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { 
    SignUpTextInput, 
    SignUpStatusBar, 
} from './KogSignUpComp';
import { YModal } from '../modal/ModalComp';

export default function SignInFriendsList({navigation, route, options, back}){

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

    /** 모달팝업 YN */
    const [modalYn, setModalYn] = useState(true)

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
            </View>

            {/** side padding */}
            <View style={styles.renderItem_sidePadding}></View>
        </View>
    );
    
    return (
        <SafeAreaView style={styles.container}>
            {/** 화면진입시 안내 팝업 */}
            <YModal
                modalYn={modalYn} 
                setModalYn={setModalYn} 
                msg={`'USERNAME' 님의\n첫번째 그룹을 만들어보세요!`}
                subMsg={`최대 다섯명과 한 그룹이 될 수 있어요\n회원님 혼자만의 그룹도 가능하답니다:)`}
            />

            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>

            {/** 상단영역, 소개/검색바 */}
            <View style={styles.topArea}>
                {/** 소개글 */}
                <View style={styles.topArea_top}>
                    <Text style={styles.topArea_top_txt}>첫번째 그룹 만들기</Text>
                    <TouchableOpacity>
                        <FontAwesome5 name="question-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/** 검색바 */}
                <View style={styles.topArea_bottom}>
                    {/** 검색바 InputBox 영역 */}
                    <SignUpTextInput placeholder={'검색'} width={340} height={50} borderRadius={30}
                        /** 주석 해제 후 사용 */
                        // onChangeText={onChangeNumber}
                        // value={number}
                    />

                    {/** 돋보기 아이콘 */}
                    <AntDesign style={styles.readingGlasses} name="search1" size={moderateScale(24)} color="black" />
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
                    onPress={() => navigation.push('SignInInviteNewFriends')} //테스트용
                    style={[styles.nextPageBtn, {backgroundColor : '#3298FF'}]}
                >
                    <Fontisto name="arrow-right" size={moderateScale(20)} color={'#FFF'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFFFEF',
    },
    topArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    midArea : {
        flex : 3,
    },
    bottomArea : {
        flex : 0.5,
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
    },
    topArea_top : {
        flex : 1,
        flexDirection : 'row',
        justifyContent: 'space-evenly',
        alignItems : 'flex-end',
        marginBottom : moderateScale(20),
        marginRight : scale(30),
        marginLeft : scale(30),
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
        fontSize : moderateScale(20),
        fontWeight : 'bold',
        position : 'absolute',
        zIndex : 2,
        left : scale(30),
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
        alignItems : 'center'
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
})