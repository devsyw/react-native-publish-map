import React from 'react';
import { SafeAreaView, StyleSheet, View, ImageBackground } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { 
    SignUpStatusBar, 
    SignUpNextPageBtn,
} from './KogSignUpComp';

export default function P006({navigation, route, options, back}){

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <SignUpStatusBar color={'#FFFFEF'}/>
            
            {/** backgroung 이미지 */}
            <ImageBackground source={require('../../../assets/image/tempImg.png')} resizeMode="contain" style={{width: '100%', height : '100%'}} />

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}></View>

            {/** 아래 영역(1/2) */}
            <View style={styles.bottomArea}>
                {/** 다음 페이지 이동 버튼 */}
                <SignUpNextPageBtn navigation={navigation} pageName={''} backgroundColor={'#0416BA'} arrowColor={'#FFF'}/>
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