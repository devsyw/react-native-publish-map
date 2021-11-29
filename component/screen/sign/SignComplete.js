import React from 'react';
import { SafeAreaView, StyleSheet, View, ImageBackground } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { 
    SignUpStatusBar, 
    SignUpNextPageBtn,
} from './KogSignUpComp';

const bgImg = require("../../asset/image/si_welcome_effect.gif")

//미완성
export default function SignComplete({navigation, route, options, back}){
    
    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'} />
            
            {/** backgroung 이미지 */}
            <ImageBackground source={bgImg} resizeMode="cover" style={{width: '100%', height : '100%'}} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFFFEF',
    },
})