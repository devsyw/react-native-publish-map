import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { 
    SignUpStatusBar, 
} from './KogSignUpComp';

export default function SignInit({navigation, route, options, back}){

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}></View>

            {/** 아래 영역(1/2) */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => navigation.push('SignInPms')} //테스트용
                    style={[styles.nextPageBtn, {backgroundColor : '#FA517A'}]}
                >
                    <Text style={styles.btnTxt}>가입하기</Text>
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
        flex : 4,
        justifyContent : 'center',
    },
    bottomArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    nextPageBtn : {
        width : scale(300, 0.3),
        height : moderateScale(60, 0.2),
        backgroundColor : '#FFF',
        borderRadius : moderateScale(60),
        margin : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    btnTxt : {
        fontSize : moderateScale(20), 
        color : '#fff', 
        fontWeight : 'bold',
    },
})