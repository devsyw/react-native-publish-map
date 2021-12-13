import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Platform, StatusBar } from 'react-native';
import { scale, moderateScale, verticalScale} from '../scaling';
import { YModal } from '../modal/ModalComp';

/** gif 이미지 */
const bgImg = require("../../asset/image/si_done.gif")
export default function GroupCreateDone({navigation, route, options, back}){
    
    /** 생성완료 확인 모달팝업 Y */
    const [modalYn, setModalYn] = useState(true)
    
    /** 5초 뒤 화면 이동 */
    const [nextPageTime, setNextPageTime] = useState(0);
    useEffect(() => {
        const timeout = setTimeout(() => setNextPageTime(nextPageTime + 1), 1000);
        if(nextPageTime === 5) {
            setModalYn(false)
            navigation.push('MyGroup')
            return () => clearTimeout(timeout);
        } else {
            return () => clearTimeout(timeout);
        }
    }, [nextPageTime]);

    return (
        <View style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>

            {/** 화면진입시 안내 팝업 */}
            <YModal
                modalYn={modalYn} 
                setModalYn={setModalYn} 
                msg={`'수줍은 너구리들'\n그룹 생성이 완료되었습니다!`}
                subMsg={`수락한 친구들은 자동으로 추가됩니다.\n요청 취소도 언제든지 가능해요!`}
                option={`알겠습니다`}
            />

            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFEF'} translucent={false} />
            
            {/** backgroung 이미지 */}
            <ImageBackground source={bgImg} resizeMode="cover" style={{width: '100%', height : '100%'}} />

            {/** 위 영역(1/2) */}
            <View style={styles.topArea}></View>

            {/** 아래 영역(1/2) */}
            <View style={styles.bottomArea}></View>
        </View>
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