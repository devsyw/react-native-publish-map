import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-gesture-handler';
import _debounce from 'lodash/debounce' //더블탭방지.
import RNPickerSelect from 'react-native-picker-select';

import { scale, moderateScale, verticalScale} from '../scaling'; //스케일 정의(따로 임포트 시켜야함)

/** 거주국가 SelectBox(Picker) */
export const SignUpCountryPicker = ({
    placeholder='',
    itemArray=[],
    value,
    onValueChange
}) => {
    return (
        <View>
            <RNPickerSelect
                style={{ // 스타일은 아래 3가지로 나누어 적용한다 
                    placeholder: pickerSelectStyles.sel_placeholder,
                    inputAndroid: pickerSelectStyles.sel_inputAnd,
                    inputIOS: pickerSelectStyles.sel_inputIOS,
                }}
                textInputProps={{ underlineColorAndroid: 'transparent'}}
                placeholder={{label: placeholder}}
                placeholderTextColor={'#C4C4C4'}
                fixAndroidTouchableBug={true}
                useNativeAndroidPickerStyle={false}
                items={itemArray}
                value={value}
                onValueChange={onValueChange}
                fontSize={moderateScale(20)}
                borderRadius={moderateScale(30)}
            />
        </View>
    )
}

/** 회원가입 페이지별 소개 워드 */
export const SignUpMainWord = ({word}) => {
    return (
        <View style={styles.topArea_mid}>
            <View>
                <Text style={styles.wordArea}>{word}</Text>
            </View>
        </View>
    )
}

/** 회원가입시 페이지 단계표기 UI */
export const SignUpNowPage = ({pageNum}) => {
    return (
        <View style={styles.topArea_top}>
            {pageNum == 1 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
            {pageNum == 2 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
            {pageNum == 3 ? <View style={styles.topPageBar}></View> : <View style={styles.topPageBar_empty}></View>}
        </View>
    )
}

/** 회원가입시 다음화면 이동 버튼 */
export const SignUpNextPageBtn = ({navigation, pageName, backgroundColor='#FFF', arrowColor='#000'}) => {
    return (
        <TouchableOpacity
            onPress={_debounce(() => navigation.push(pageName), 250)}
            style={[styles.nextPageBtn, {backgroundColor}]}
        >
            <Fontisto name="arrow-right" size={moderateScale(24)} color={arrowColor} />
        </TouchableOpacity>
    )
}

/** 회원가입시 뒤로가기(goBack) 버튼 */
export const SignUpGoBackBtn = ({navigation}) => {
    return (
        <TouchableOpacity
            onPress={_debounce(() => navigation.goBack(), 250)}
            style={styles.gobackBtn}
        >
            <Ionicons name="chevron-back" size={moderateScale(30)} color="#000"/>
        </TouchableOpacity>
    )
}

/** 회원가입시 스테이터스 바 색상 컨트롤 */
export const SignUpStatusBar = ({color}) => {
    return (
        <StatusBar barStyle="dark-content" backgroundColor={color} translucent={false} />
    )
}

/** 회원가입시 텍스트 인풋박스 */
export const SignUpTextInput = ({
    placeholder='', 
    placeholderTextColor='#C4C4C4', 
    keyboardType='default', 
    maxLength=11, 
    onChangeText, 
    value, 
    width=100, 
    height=50,
    borderRadius=3,
    textAlign='center'
}) => {
    return (
        <TextInput
            style={styles.textInputBox}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            maxLength = {maxLength}
            keyboardType = {keyboardType}
            onChangeText={onChangeText}
            value={value}
            fontSize={moderateScale(20)}
            fontWeight={'bold'}
            backgroundColor={'#FFF'}
            borderRadius={moderateScale(borderRadius)}
            width={moderateScale(width, 0.3)}
            height={moderateScale(height, 0.2)}
            textAlign={textAlign}
        />
    )
}

const styles = StyleSheet.create({
    topArea_top : {
        flex : 0.5,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'flex-start',
        marginTop : moderateScale(15),
    },
    topArea_mid : {
        flex : 1.5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    topArea_bottom : {
        flex : 0.5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    topPageBar : {
        top : verticalScale(15), 
        width : scale(30), 
        height : verticalScale(5), 
        borderRadius: moderateScale(5), 
        backgroundColor: '#FA517A',
        marginLeft : scale(2),
        marginRight : scale(2),
    },
    topPageBar_empty : {
        top : verticalScale(15), 
        width : scale(30), 
        height : verticalScale(5), 
        borderRadius: moderateScale(5), 
        backgroundColor: '#C4C4C4',
        marginLeft : scale(2),
        marginRight : scale(2),
    },
    wordArea : {
        textAlign : 'center',
        fontSize : moderateScale(25, 0.4),
        color : '#000',
        fontWeight : "600",
        lineHeight: moderateScale(40),
    },
    gobackBtn : {
        ...StyleSheet.absoluteFillObject,
        top : moderateScale(15),
        left : moderateScale(15),
    },
    nextPageBtn : { //미사용중
        width : moderateScale(80, 0.3),
        height : moderateScale(55, 0.2),
        backgroundColor : '#FFF',
        borderRadius : moderateScale(60),
        margin : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
    },
    textInputBox : {
        marginLeft : scale(4),
        marginRight : scale(4),
        zIndex : 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
})

const pickerSelectStyles = StyleSheet.create({
        //그림자
        // ...Platform.select({ 
        //     ios: { 
        //         shadowColor: "#000",
        //         shadowOffset: {
        //             width: 0,
        //             height: 2,
        //         },
        //         shadowOpacity: 0.23,
        //         shadowRadius: 2.62,
        //     }, 
        //     android: { 
        //         elevation: 4, 
        //     }, 
        // }),

    sel_placeholder : {
        textAlign : 'center',
        fontSize : moderateScale(20),
        fontWeight : 'bold',
    },
    sel_inputAnd : {
        fontSize: moderateScale(25),
        height: verticalScale(50), 
        width: scale(280), 
        borderRadius: moderateScale(30),
        backgroundColor : '#FFF',
        textAlign : 'center',
        fontWeight : 'bold',
        color : '#000',
        elevation: 4,
    },
    sel_inputIOS : {
        fontSize: moderateScale(25),
        height: verticalScale(50), 
        width: scale(280), 
        borderRadius: moderateScale(30),
        backgroundColor : '#FFF',
        textAlign : 'center',
        fontWeight : 'bold',
        color : '#000',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
})
