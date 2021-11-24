import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { Fontisto } from '@expo/vector-icons';
import { 
    SignUpMainWord, 
    SignUpNowPage, 
    SignUpTextInput, 
    SignUpStatusBar, 
    SignUpGoBackBtn
} from './KogSignUpComp';

export default function SignInPhoneNumber({navigation, route, options, back}){

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}>
                <View style={styles.topArea_top}>
                    {/** 이전 페이지로 돌아가기 버튼 */}
                    <SignUpGoBackBtn navigation={navigation}/>

                    {/** 상단 현재 페이지 영역 */}
                    <SignUpNowPage pageNum={4}/>
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
                    onPress={() => navigation.push('SignInVerifyCode')} //테스트용
                    style={[styles.nextPageBtn, {backgroundColor : '#FA517A'}]}
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