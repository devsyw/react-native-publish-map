import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale, moderateScale, verticalScale, height} from '../scaling';
import { Fontisto } from '@expo/vector-icons';
import { 
    SignUpMainWord, 
    SignUpStatusBar, 
} from './KogSignUpComp';
import { useState } from 'react';

const crt = require('../../asset/image/wm_user_character_img.png'); //캐릭터

export default function SignInCrt({navigation, route, options, back}){

    /** 캐릭터박스 클릭시 색 변경 */
    const [box1, setBox1] = useState(true); //첫 화면에서는 box1이 활성
    const [box2, setBox2] = useState(false);
    const [box3, setBox3] = useState(false);
    const boxPress = (box) => {
        switch (box) {
            case 1 : 
                setBox1(true)
                setBox2(false)
                setBox3(false)
                break;
            case 2 : 
                setBox1(false)
                setBox2(true)
                setBox3(false)
                break;
            case 3 :
                setBox1(false)
                setBox2(false)
                setBox3(true)
                break;
            default:
                break;
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}>
                {/** Top Padding */}
                <View style={styles.topArea_top}/>

                {/** 소개 텍스트 영역 */}
                <SignUpMainWord word={`반가워요!\n나만의 캐릭터를 선택해보세요!`}/>
                
                <View style={styles.topArea_bottom}></View>
            </View>

            {/** 아래 영역(1/2) */}
            <View style={styles.bottomArea}>
                {/** 캐릭터 선택영역 */}
                <View style={styles.bottomArea_top}>
                    {/** 1번 박스 */}
                    <TouchableOpacity style={box1 ? styles.bottomArea_topEleSelect : styles.bottomArea_topEle} onPress={()=>{boxPress(1)}}>
                        <Image source={crt} style={styles.bottom_crtBox}/>
                    </TouchableOpacity>

                    {/** 2번 박스 */}
                    <TouchableOpacity style={box2 ? styles.bottomArea_topEleSelect : styles.bottomArea_topEle} onPress={()=>{boxPress(2)}}>
                        <Image source={crt} style={styles.bottom_crtBox}/>
                    </TouchableOpacity>

                    {/** 3번 박스 */}
                    <TouchableOpacity style={box3 ? styles.bottomArea_topEleSelect : styles.bottomArea_topEle} onPress={()=>{boxPress(3)}}>
                        <Image source={crt} style={styles.bottom_crtBox}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomArea_bottom}>
                    {/** 다음 페이지 이동 버튼 */}
                    <TouchableOpacity
                        onPress={() => navigation.push('SignInName')} //테스트용
                        style={[styles.nextPageBtn, {backgroundColor : '#FA517A'}]}
                    >
                        <Fontisto name="arrow-right" size={moderateScale(20)} color={'#FFF'} />
                    </TouchableOpacity>
                </View>
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
        flex : 0.7,
        justifyContent : 'center',
        marginTop : moderateScale(15),
    },
    bottomArea : {
        flex : 1,
        justifyContent : 'center',
    },
    topArea_bottom : {
        flex : 0.5,
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
    topArea_top : {
        flex : 0.5,
        marginTop : moderateScale(15),
    },
    bottomArea_top : {
        flex : 1, 
        flexDirection : 'row', 
        justifyContent : 'center', 
        alignItems : 'flex-start',
    },
    bottomArea_topEle : {
        width : moderateScale(100), 
        height : moderateScale(100),
        margin : moderateScale(10), 
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#dddddd', 
        borderRadius : moderateScale(15)
    },
    bottomArea_topEleSelect : { 
        width : moderateScale(100), 
        height : moderateScale(100),
        margin : moderateScale(10), 
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'yellow', 
        borderRadius : moderateScale(15)
    },
    bottomArea_bottom : {
        flex : 1, 
        justifyContent : 'flex-end', 
        alignItems : 'flex-end'
    },
    bottom_crtBox : {
        resizeMode : 'contain',
        width : moderateScale(80),
        height : moderateScale(80),
    },
})