import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { Fontisto } from '@expo/vector-icons';
import { 
    SignUpMainWord, 
    SignUpGoBackBtn, 
    SignUpNowPage, 
    SignUpStatusBar, 
    SignUpCountryPicker,
} from './KogSignUpComp';

export default function SignInCountry({navigation, route, options, back}){
    /** ---------------Picker dumy data--------------- */
    const [selectedValue, setSelectedValue] = useState('');
    const itemArr = [
        { label: '대한민국', value: 'ko', key: '1'},
        { label: '미국', value: 'us', key: '2' },
    ];
    /** ----------------------------------------------- */
    
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}>
                <View style={styles.topArea_top}>
                    {/** 이전 페이지로 돌아가기 버튼 */}
                    <SignUpGoBackBtn navigation={navigation}/>

                    {/** 상단 바 영역 */}
                    <SignUpNowPage pageNum={3}/>
                </View>
                
                {/** 소개 텍스트 영역 */}
                <SignUpMainWord word={`USERNAME 님,\n어디에 계신가요?`}/>
                
                {/** 거주국가 SelectBox 영역 */}
                <View style={styles.topArea_bottom}>
                    {/** Custum Picker */}
                    <SignUpCountryPicker
                        placeholder={'선택하세요'}
                        itemArray={itemArr} //select item 배열
                        value={selectedValue}
                        onValueChange={setSelectedValue}
                    />
                </View>
            </View>

            {/** 아래 영역(1/2) */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <TouchableOpacity
                    onPress={() => navigation.push('SignInPhoneNumber')} //테스트용
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
    bottomArea : {
        flex : 1,
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
    },
    topArea_top : {
        flex : 0.5,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems : 'flex-start',
        marginTop : moderateScale(15),
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

