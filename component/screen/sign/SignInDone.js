import React from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { 
    SignUpStatusBar, 
} from './KogSignUpComp';

const bgImg = require("../../asset/image/si_done.gif")

export default function SignInDone({navigation, route, options, back}){
    

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>
            
            {/** backgroung 이미지 */}
            <ImageBackground source={bgImg} resizeMode="cover" style={{width: '100%', height : '100%'}} />

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}></View>

            {/** 아래 영역(1/2) */}
            <View style={styles.bottomArea}></View>
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