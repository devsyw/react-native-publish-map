import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, Button } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { Fontisto } from '@expo/vector-icons';
import { 
    SignUpMainWord, 
    SignUpNowPage, 
    SignUpTextInput, 
    SignUpStatusBar, 
    SignUpGoBackBtn
} from './KogSignUpComp';
import { 
    YnModal, 
    YModal 
} from '../modal/ModalComp';

export default function SignInPhoneNumber({navigation, route, options, back}){
    /** 전화번호 확인 모달팝업 YN */
    const [modalYn, setModalYn] = useState(false)

    /** 새 인증번호 받기 모달팝업 YN */
    const [vfModalYn, setVfModalYn] = useState(false)

    /** 다음 페이지로 이동(모달팝업의 콜백 함수) */
    const nextPage = () => {
        navigation.push('SignInVerifyCode')
    }

    /** 인증번호 오류시 새 인증번호 받기(모달팝업의 콜백함수) */
    const vfCallback = () => {
        console.log('새 인증번호 받기')
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            {/** (아니오, 예) 모달팝업 */}
            <YnModal 
                modalYn={modalYn} 
                setModalYn={setModalYn} 
                callback={nextPage}
                msg={'입력하신 전화번호가 맞나요?'} 
            />

            {/** 새 인증번호 받기 모달 팝업 */}
            <YModal
                modalYn={vfModalYn} 
                setModalYn={setVfModalYn} 
                callback={vfCallback}
                msg={'예상치 못한 인증오류 ㅜ^ㅜ'}
                option={'새 인증번호 받기'}
            />

            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}>
                <View style={styles.topArea_top}>
                    {/** 이전 페이지로 돌아가기 버튼 */}
                    <SignUpGoBackBtn navigation={navigation}/>

                    {/** 상단 현재 페이지 영역 */}
                    <SignUpNowPage pageNum={3}/>
                </View>
                
                {/** 소개 텍스트 영역 */}
                <SignUpMainWord word={`USERNAME 님,\n전화번호로 본인확인을 해야해요!`}/>
                
                <View style={styles.topArea_bottom}>

                    {/** 전화번호 InputBox 영역 */}
                    <SignUpTextInput placeholder={'전화번호'} width={300} height={50} keyboardType = 'numeric' textAlign = 'center'  borderRadius={30}
                        /** 주석 해제 후 사용 */
                        //onChangeText={onChangeNumber}
                        //value={number}
                    />
                    {/** 국가코드 */}
                    <Text style={styles.countryCode}>+82</Text>
                </View>
            </View>

            {/** 아래 영역(1/2) */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => {
                        setModalYn(true) //전화번호 확인용 모달 팝업 활성화
                        //setVfModalYn(true) //인증 오류시 모달 팝업 활성화
                    }} //테스트용
                    style={[styles.nextPageBtn, {backgroundColor : '#FA517A'}]}
                >
                    <Fontisto name="arrow-right" size={moderateScale(20)} color={'#FFF'} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
    },
    topArea_top : {
        flex : 0.5,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems : 'flex-start',
        marginTop : moderateScale(15),
    },
    bottomArea : {
        flex : 1,
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
    },
    topArea_bottom : {
        flex : 0.5,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    countryCode : {
        fontSize : moderateScale(20),
        fontWeight : 'bold',
        position : 'absolute',
        zIndex : 2,
        left : scale(62),
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
})
