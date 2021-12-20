import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from '../scaling';
import { GoldBar } from '../map/KogWorldMapComp';
import { YModal, YnModal } from '../modal/ModalComp';

/** 이미지 */
const town1 = require('../../asset/image/mg_town1_img.png'); 
const town2 = require('../../asset/image/mg_town2_img.png'); 
const town3 = require('../../asset/image/mg_town3_img.png'); 
export const GroupTownSelect = ({navigation}) => {

    /** 그룹선택 후 다음버튼 클릭시, 재확인 모달팝업 */
    const [modal, setModal] = useState(false)

    /** 그룹선택 후 다음버튼 클릭시, 타운에 자리가 모자랄경우 모달팝업 */
    const [noAreaModal, setNoAreaModal] = useState(false)

    /** 그룹선택 후 다음버튼 클릭시, 골드가 모자랄경우 모달팝업 */
    const [noGoldModal, setNoGoldModal] = useState(false)

    /** 뒤로가기 버튼 클릭시, 맵으로 돌아가냐 묻는 모달팝업 */
    const [goMapModal, setGoMapModal] = useState(false)

    /** 선택된 그룹박스 색상구분 */
    const [selectBox, setSelectBox] = useState(0);

    /** 테스트 그룹 데이터 */
    const DATA = [
        {
            key : 1,
            groupName : '틀림없는 딱따구리들',
            image : town1
        },
        {
            key : 2,
            groupName : '수줍은 너구리들',
            image : town2
        },
        {
            key : 3,
            groupName : '고약한 고라니들',
            image : town3
        }
    ]

    /** 그룹뷰 */
    const GroupObject = ({data}) => {
        return (
            <TouchableOpacity style={selectBox === data.key ? [styles.mid_groupView, {backgroundColor : '#3298FF'}] : styles.mid_groupView} onPress={()=>{setSelectBox(data.key)}}>
                {/** 랜드 이미지 */}
                <View style={styles.mid_groupImgArea}>
                    <Image source={data.image} style={styles.mid_groupImg}/>
                </View>

                {/** 그룹 이름 */}
                <View style={styles.mid_groupNameArea}>
                    <Text style={styles.mid_groupNameTxt}>{data.groupName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 상단영역, 뒤로가기 및 골드 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn} onPress={() => {setGoMapModal(true)}}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>

                {/** 보유 골드 */}
                <GoldBar gold={'10,000'} />
            </View>

            {/** 중간영역, 그룹 선택영역 */}
            <View style={styles.midArea}>
                {/** 타이틀 영역 */}
                <View style={styles.midTitleArea}>
                    <Text style={styles.midTitleTxt}>건설할 타운 선택하기</Text>
                    <Text style={styles.midSubTxt}>건설할 타운을 선택해주세요! 5000골드가 차감됩니다.</Text>
                </View>

                {/** 가입된 그룹들 */}
                <GroupObject data={DATA[0]}/>
                <GroupObject data={DATA[1]}/>
                <GroupObject data={DATA[2]}/>
            </View>

            {/** 하단영역, 다음페이지 버튼 */}
            <View style={styles.bottomArea}>

            {/** 다음 페이지 이동 버튼 비활성/활성 */}
            {
                !selectBox ? (
                    <View style={styles.nextPageBtn}>
                        <Fontisto name="arrow-right" size={moderateScale(20)} color={'#FFF'} />
                    </View>
                ) : (
                    
                    <TouchableOpacity
                        onPress={() => {
                            //상단 useState 팝업설명참조, 주석처리된것들은 각각의 팝업컨트롤
                            //setModal(true) 
                            //setNoAreaModal(true)
                            setNoGoldModal(true)
                            //setGoMapModal(true)
                        }} 
                        style={[styles.nextPageBtn, {backgroundColor : '#FA517A'}]}
                    >
                        <Fontisto name="arrow-right" size={moderateScale(20)} color={'#FFF'} />
                    </TouchableOpacity>
                )
            }
            </View>

            {/** 그룹선택 후 다음버튼 클릭시, 재확인 모달팝업 */}
            <YnModal
                modalYn={modal} 
                setModalYn={setModal}
                msg={`선택하신 타운에\n건설하시겠습니까?`}
                callback={()=>{}}
                cancleCallback={()=>{}}
            />
            
            {/** 그룹선택 후 다음버튼 클릭시, 타운에 자리가 모자랄경우 모달팝업 */}
            <YModal
                modalYn={noAreaModal} 
                setModalYn={setNoAreaModal} 
                msg={`선택하신 타운에는\n현재 자리가 부족합니다!`}
                subMsg={`다른 타운을 다시 선택해주세요!`}
                option={`알겠습니다`}
                callback={()=>{}}
            />

            {/** 그룹선택 후 다음버튼 클릭시, 골드가 모자랄경우 모달팝업*/}
            <YModal
                modalYn={noGoldModal} 
                setModalYn={setNoGoldModal} 
                msg={`현재 회원님의 골드가\n부족합니다.`}
                subMsg={`뽑으신 명예템은 마이프로필에 저장됩니다.\n골드를 모으고 건설해보세요!`}
                option={`알겠습니다`}
                callback={()=>{}}
            />

            {/** 뒤로가기 버튼 클릭시, 맵으로 돌아가냐 묻는 모달팝업 */}
            <YnModal
                modalYn={goMapModal} 
                setModalYn={setGoMapModal}
                msg={`지도로 돌아가시겠습니까?`}
                callback={()=>{}}
                cancleCallback={()=>{}}
            />

        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container : { 
        flex : 1,
        backgroundColor : '#fff',
        justifyContent : 'flex-end',
    }, 
    gobackBtn : {
        position : 'absolute',
        top : moderateScale(20),
        left : moderateScale(15),
    },
    topArea : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    }, 
    midArea : {
        flex : 8,
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
    midTitleArea : {
        width : scale(310),
        height : verticalScale(80),
        marginTop : verticalScale(10),
    },
    midTitleTxt : {
        fontSize : moderateScale(24),
        fontWeight : 'bold',
    },
    midSubTxt : {
        marginTop : verticalScale(5),
        fontSize : moderateScale(13),
    },
    bottomArea : {
        flex : 1,
        justifyContent : 'flex-end',
        alignItems : 'flex-end',
    }, 
    mid_groupView : { 
        flexDirection : 'row',
        width : scale(310),
        height : verticalScale(100),
        backgroundColor : '#000',
        borderRadius : moderateScale(20),
        marginTop : verticalScale(16),
    },
    mid_groupImgArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    mid_groupImg : {
        resizeMode : 'contain',
        width : moderateScale(90),
        height : moderateScale(90),
    },
    mid_groupNameArea : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'flex-start',
    },
    mid_groupNameTxt : {
        fontSize : moderateScale(18),
        fontWeight : 'bold',
        color : '#fff',
    },
    nextPageBtn : {
        width : moderateScale(80, 0.3),
        height : moderateScale(55, 0.2),
        backgroundColor : '#cccccc',
        borderRadius : moderateScale(60),
        margin : moderateScale(15),
        justifyContent : 'center',
        alignItems : 'center',
        ...Platform.select({ 
            ios: { 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
            }, 
            android: { 
                elevation: 4, 
            }, 
        }),
    },
});
