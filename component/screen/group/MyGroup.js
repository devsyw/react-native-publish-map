import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale } from '../scaling';
import { GoldBar } from '../map/KogWorldMapComp';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { UserLocIvtModal } from '../modal/ModalComp'; //12.15 수정

/** 이미지 */
const town1 = require('../../asset/image/mg_town1_img.png'); 
const town2 = require('../../asset/image/mg_town2_img.png'); 
const town3 = require('../../asset/image/mg_town3_img.png'); 
const noGroupImg = require('../../asset/image/mg_no_group_img.png'); 
export const MyGroup = ({navigation}) => {

    /** 위치공유친구 Modal팝업(로케이션 버튼) */
    const [locModal, setLocModal] = useState(false)

    /** 가입된 멤버 */
    const MemberBox = () => {
        return (
            <View style={styles.bottom_memberEle}>
                {/** 멤버 캐릭터 사진 */}
                <View style={styles.bottom_memberPic}>
                    {/** 위치 공유중인 친구들 마커 아이콘 */}
                    <View style={styles.bottom_memberLoc}>
                        <MaterialIcons name="location-pin" size={moderateScale(20)} color="#3298FF" />
                    </View>
                </View>
                <View style={styles.bottom_memberNameArea}>
                    <Text style={styles.bottom_memberNameTxt}>나
                    </Text>
                </View>

                {/** 위치공유 신청 시 체크박스 노출(기획보류) */}
                {/* {
                    intIndex ? (
                        <View style={styles.bottom_memberLocCB}>
                            <BouncyCheckbox
                                size={moderateScale(24)}
                                fillColor="blue"
                                unfillColor="#dddddd"
                                iconStyle={{ borderColor: "#fff" }}
                                isChecked={false}
                            />
                        </View>
                    ) : null
                } */}
            </View>
        )
    }

    /** 내가 초대한멤버(초대중) */
    const MemberMyDelBox = () => {
        return (
            <View style={styles.bottom_memberEle}>
                {/** 멤버 캐릭터 사진 */}
                <View style={styles.bottom_memberPic}></View>

                {/** 어두운 백그라운드와 취소버튼(X) */}
                <View style={styles.bottom_lockMem}>
                    <TouchableOpacity
                        style={styles.bottom_lockMemKick}
                    >
                        <Entypo name="circle-with-cross" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/** 남은 수락 대기시간 */}
                <View style={styles.bottom_memberNameArea}>
                    <Text style={styles.bottom_memberNameTxt}>초대중..</Text>
                    <Progress.Bar progress={0.7} width={scale(28)} height={verticalScale(6)} borderRadius={10} color={"#CC00FF"} />
                </View>
            </View>
        )
    }

    /** 다른멤버가 초대한 멤버(초대중) */
    const MemberBlockBox = () => {
        return (
            <View style={styles.bottom_memberEle}>
                {/** 멤버 캐릭터 사진 */}
                <View style={styles.bottom_memberPic}></View>

                {/** 어두운 백그라운드와 취소버튼(X) */}
                <View style={styles.bottom_lockMem}></View>

                {/** 수락 대기시간 */}
                <View style={styles.bottom_memberNameArea}>
                    <Text style={styles.bottom_memberNameTxt}>초대중..</Text>
                </View>
            </View>
        )
    }

    /** 멤버 초대 */
    const MemberInvite = () => {
        return (
            <TouchableOpacity 
                style={[styles.bottom_memberEle, {
                    backgroundColor : '#c4c4c4',
                    justifyContent : 'center',
                    alignItems : 'center',
                }]}
                onPress={()=>{}}
            >
                <AntDesign name="pluscircleo" size={24} color="#fff" />
            </TouchableOpacity>
        )
    }

    /** 그룹뷰 */
    const GroupObject = () => {
        return (
            <View style={styles.bottom_groupView}>
                {/** 그룹 이름 및 모드 */}
                <View style={styles.bottom_groupViewTop}>
                    {/** 이름 및 모드 */}
                    <View style={styles.bottom_topLeft}>
                        <Text style={styles.bottom_topLeft1}>틀림없는 딱따구리들</Text>
                        <View style={styles.bottom_topLeftIn}>
                            <MaterialIcons name="not-listed-location" size={12} color="#fff" />
                            <Text style={styles.bottom_topLeft2}> 사생활 보호모드</Text>

                            {/** 함께공유모드시 마커 아이콘 */}
                            {/* <MaterialIcons name="location-pin" size={12} color="#fff" /> */} 
                        </View>
                    </View>

                    {/** 이름 편집 버튼 */}
                    <View style={styles.bottom_topRight}>
                        <TouchableOpacity>
                            <FontAwesome5 name="pen" size={moderateScale(20)} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/** 그룹 이미지 및 멤버 */}
                <View style={styles.bottom_groupViewMid}>
                    {/** 타운 이미지 */}
                    <View style={styles.bottom_midLeft}>
                        <Image source={town1} style={styles.bottom_midLeftImg}/>
                    </View>

                    {/** 그룹 멤버 리스트 */}
                    <View style={styles.bottom_midRight}>
                        <View style={styles.bottom_memberArea}>
                            {/** 가입된 멤버 */}
                            <MemberBox />

                            {/** 내가 초대한 멤버(취소가능, 초대중) */}
                            <MemberMyDelBox />

                            {/** 다른멤버가 초대한 멤버(초대중) */}
                            <MemberBlockBox />

                            {/** 멤버 초대하기 버튼(+) */}
                            <MemberInvite />
                        </View>
                    </View>
                </View>

                {/** 그룹 뷰 하단 버튼, 12.15 수정(스타일은 통째로 덮어쓰세요) */}
                <View style={styles.bottom_groupViewBottom}>

                    {/** 그룹 나가기 버튼 */}
                    <TouchableOpacity style={styles.bottom_btn1} onPress={() => {}}>
                        <FontAwesome5 name="sign-out-alt" size={moderateScale(24)} color="#fff" />
                    </TouchableOpacity>

                    {/** 위치공유친구 버튼 */}
                    <TouchableOpacity style={styles.bottom_btn2} onPress={() => {setLocModal(true)}}>
                        <MaterialIcons name="add-location" size={moderateScale(28)} color="#fff" />
                        {/** 알림, 빨간 동그라미 */}
                        <View style={styles.midArea_invAlr}></View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    /** 그룹요청목록뷰 */
    const InvGroupObject = () => {
        return (
            <View style={styles.bottom_groupView}>
                {/** 그룹 이름 및 모드 */}
                <View style={styles.bottom_groupViewTop}>
                    {/** 이름 및 모드 */}
                    <View style={styles.bottom_topLeft}>
                        <Text style={styles.bottom_topLeft1}>틀림없는 딱따구리들</Text>
                        <View style={styles.bottom_topLeftIn}>
                            {/** 함께공유모드시 마커 아이콘 */}
                            {/* <MaterialIcons name="location-pin" size={12} color="#fff" /> */} 
                            <MaterialIcons name="not-listed-location" size={moderateScale(12)} color="#fff" />
                            <Text style={styles.bottom_topLeft2}> 사생활 보호모드</Text>
                        </View>
                    </View>

                    {/** 이름 편집 버튼 */}
                    <View style={styles.bottom_topRight}>
                        <TouchableOpacity>
                            <FontAwesome5 name="pen" size={moderateScale(20)} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/** 그룹 이미지 및 멤버 */}
                <View style={styles.bottom_groupViewMid}>
                    {/** 타운 이미지 */}
                    <View style={styles.bottom_midLeft}>
                        <Image source={town1} style={styles.bottom_midLeftImg}/>
                        <View style={styles.bottom_midLeftIvtView}>
                            <View style={styles.bottom_midLeftIvtViewRow1}>
                                <Text style={styles.bottom_midLeftIvtViewTxt1}>응답까지 남은 시간: </Text>
                                <Text style={styles.bottom_midLeftIvtViewTxt2}>1일</Text>
                            </View>
                            <View style={styles.bottom_midLeftIvtViewRow2}>
                                <Progress.Bar progress={0.7} width={scale(140)} height={verticalScale(20)} borderRadius={moderateScale(20)} color={"#FA517A"} />
                            </View>
                        </View>
                    </View>

                    {/** 그룹 멤버 리스트 */}
                    <View style={styles.bottom_midRight}>
                        <View style={styles.bottom_memberArea}>
                            {/** 가입된 멤버 */}
                            <MemberBox />
                            <MemberBox />
                            <MemberBox />
                            <MemberBox />
                            <MemberBlockBox />
                        </View>
                    </View>
                </View>

                {/** 그룹 뷰 하단 버튼 */}
                <View style={styles.bottom_groupIvtViewBottom}>
                    {/** 위치공유친구 버튼 */}
                    <TouchableOpacity style={styles.bottom_ivtBtn1} onPress={() => {}}>
                        <Text style={styles.bottom_ivtBtnTxt}>거절하기</Text>
                    </TouchableOpacity>

                    {/** 그룹 나가기 버튼 */}
                    <TouchableOpacity style={styles.bottom_ivtBtn2} onPress={() => {}}>
                        <Text style={[styles.bottom_ivtBtnTxt, {color : '#fff'}]}>수락하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 그룹원 위치 공유 모달팝업, 12.15 수정(ModalComp.js파일 업데이트 바랍니다) */}
            <UserLocIvtModal 
                modalYn={locModal}
                setModalYn={setLocModal}
                callback={()=>{}}
            />
            
            {/** 상단영역, 뒤로가기 및 골드 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>

                {/** 보유 골드 */}
                <GoldBar gold={'10,000'} />
            </View>

            {/** 중간영역, 내 정보 */}
            <View style={styles.midArea}>
                {/** 내 별명 */}
                <View style={styles.midArea_txtArea}>
                    <Text style={styles.midArea_txt}>내가 가입한 그룹들</Text>
                </View>

                <TouchableOpacity style={styles.midArea_invBtn}>
                    <FontAwesome5 name="user-check" size={moderateScale(10)} color="#5A67AB" />
                    <Text style={styles.midArea_invTxt}>그룹 요청 목록</Text>
                    <View style={styles.midArea_invAlr}></View>
                </TouchableOpacity>
            </View>

            {/** 하단영역, 그룹 정보 */}
            <View style={styles.bottomArea}>
                {/** 그룹리스트 스크롤뷰 */}
                <ScrollView 
                    style={styles.bottom_groupScroll} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                >
                    <GroupObject />
                    <GroupObject />

                    {/** 그룹요청 목록 뷰 12.13 수정 */}
                    {/* <InvGroupObject />
                    <InvGroupObject /> */}
                </ScrollView>

                {/** 그룹이 존재하지 않을 시(주석풀고사용), 12.13 수정 */}
                {/* <View style={styles.bottomArea_noGroup}>
                    <View style={{flex : 0.5}}></View>
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center',}}>
                        <Image source={noGroupImg} style={styles.bottomArea_noGroupImg}/>
                        <Text style={styles.bottomArea_noGroupTxt1}>그룹을 만들어봐요!</Text>
                        <Text style={styles.bottomArea_noGroupTxt2}>친구들과 그룹을 만들고 함께 활동해봐요!</Text>
                    </View>
                    <View style={{flex : 1}}></View>
                </View> */}
            </View>

            {/** 그룹 생성 버튼, 위치공유 신청 시 잠깐 안보이게함 */}
            {
                !locModal ? (
                    <TouchableOpacity style={styles.createGroupBtn} onPress={()=>{navigation.push('GroupCreateInv')}}>
                        <Entypo name="plus" size={40} color="#fff" />
                    </TouchableOpacity>
                ) : null
            }

            {/** 위치공유 신청 시 완료버튼 노출, 12.15 수정(삭제) */}
            {/* {
                intIndex ? (
                    <View style={styles.locInviteArea}>
                        <View style={styles.locInviteDoneBtn}>


                            <TouchableOpacity style={styles.locInviteDoneBtn1} onPress={()=>{setIntIndex(false)}}>
                                <Text style={styles.locInviteDoneTxt1}>완료</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.locInviteDoneBtn2} onPress={()=>{setIntIndex(false)}}>
                                <Text style={styles.locInviteDoneTxt2}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null
            } */}
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container : { //12.13 수정
        flex : 1,
        backgroundColor : '#fff',
        justifyContent : 'flex-end',
    }, 
    containerDark : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.5)',
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
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
    },
    bottomArea : {
        flex : 8,
        justifyContent : 'center',
        alignItems : 'center',
    }, 
    bottomArea_noGroup : {
        flex : 1, 
        width: '80%', 
        height : '80%', 
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomArea_noGroupImg : {
        width: moderateScale(170), 
        height: moderateScale(170), 
        resizeMode : 'contain',
    },
    bottomArea_noGroupTxt1 : {
        fontSize : moderateScale(20),
        fontWeight : 'bold',
        color : '#cccccc',
        marginTop : verticalScale(10),
        marginBottom : verticalScale(10)
    },
    bottomArea_noGroupTxt2 : {
        fontSize : moderateScale(12),
        color : '#cccccc',
    },
    midArea_txtArea : {
        flex : 1, 
        justifyContent : 'center', 
        marginLeft : moderateScale(26)
    },
    midArea_txt : {
        fontSize : moderateScale(22), 
        fontWeight : 'bold',
    },
    midArea_invBtn : {
        flexDirection : 'row',
        width : scale(100),
        height : moderateScale(34),
        borderRadius : moderateScale(15),
        backgroundColor : '#F3F4F8',
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : moderateScale(26)
    }, 
    midArea_invTxt : {
        fontSize : moderateScale(11),
        color : '#5A67AB',
        marginLeft : scale(5),
    },  
    midArea_invAlr : {
        width : moderateScale(10), 
        height : moderateScale(10), 
        backgroundColor : '#FA517A', 
        position : 'absolute', 
        right : 0, 
        top : 0, 
        borderRadius : 100
    },
    topArea_toggle : {
        flex : 1, 
        flexDirection : 'row',
        justifyContent : 'flex-start', 
        alignItems : 'center'
    }, 
    top_toggle_goldIcon : {
        position : 'absolute', 
        zIndex : 2, 
        width: moderateScale(32), 
        height: moderateScale(32),
        elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    topArea_toggleArea : { 
        width : moderateScale(110),
        height : moderateScale(33),
        justifyContent : 'center',
        alignItems : 'flex-end',
        paddingRight : scale(10),
        borderRadius : 20,
        backgroundColor : '#fff',
        zIndex : 1,
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
    bottom_groupScroll : {
        backgroundColor : '#fff',
        marginHorizontal: scale(10), 
        // marginVertical : 10, // 12.14 수정
    },
    bottom_groupView : { 
        width : scale(310), //12.13 수정
        height : verticalScale(470),
        backgroundColor : '#000',
        borderRadius : moderateScale(30),
        marginTop : verticalScale(10),
        marginBottom : verticalScale(30),
    },
    bottom_groupViewTop : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-around',
    },
    bottom_groupViewMid : { 
        flex : 5,
        flexDirection : 'row',
    },
    bottom_groupViewBottom : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
    bottom_btn1 : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : scale(25),
        marginBottom : verticalScale(5),
    },
    bottom_btn2 : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : scale(20),
        marginBottom : verticalScale(5),
    },
    bottom_groupIvtViewBottom : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_ivtBtn1 : {
        width : scale(120),
        height : moderateScale(40),
        backgroundColor : '#fff',
        borderRadius : moderateScale(20),
        margin : moderateScale(10),
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_ivtBtn2 : {
        width : scale(120),
        height : moderateScale(40),
        backgroundColor : '#3298FF',
        borderRadius : moderateScale(20),
        margin : moderateScale(10),
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_ivtBtnTxt : {
        fontSize : moderateScale(12),
        fontWeight : 'bold',
    },
    bottom_topLeft : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'flex-start',
        marginLeft : scale(20)
    },
    bottom_topRight : {
        flex : 0.3,
        justifyContent : 'center',
        alignItems : 'flex-end',
        marginRight : scale(30)
    },
    bottom_topLeft1 : {
        fontSize : moderateScale(16),
        fontWeight : 'bold',
        color : '#fff',
        marginVertical : verticalScale(3),
    },
    bottom_topLeft2 : {
        fontSize : moderateScale(12),
        color : '#fff',
    },
    bottom_topLeftIn : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    bottom_midLeft : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_midLeftImg : {
        width : moderateScale(200), 
        height: moderateScale(260), 
        resizeMode: 'contain',
    },
    bottom_midLeftIvtView : { // 12.14 수정
        position : 'absolute',
        width : scale(170), 
        height: verticalScale(60),
        backgroundColor : 'rgba(255,255,255,0.8)',
        bottom : verticalScale(30), 
        borderRadius : moderateScale(20),
        padding : moderateScale(5),
    },
    bottom_midLeftIvtViewRow1 : {
        flex : 0.4, 
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_midLeftIvtViewRow2 : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_midLeftIvtViewTxt1 : {
        fontSize : moderateScale(12),
    },
    bottom_midLeftIvtViewTxt2 : {
        fontSize : moderateScale(12),
        fontWeight : 'bold',
    },
    bottom_midRight : {
        flex : 1.2,
        justifyContent : 'center',
    },
    bottom_memberArea : {
        width : '100%',
        paddingTop : verticalScale(15),
        paddingBottom : verticalScale(15),
        backgroundColor : 'rgba(255,255,255,0.6)',
        borderTopLeftRadius : moderateScale(30),
        borderBottomLeftRadius : moderateScale(30),
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_memberEle : {
        width : '80%',
        height : verticalScale(50),
        backgroundColor : '#fff',
        marginTop : verticalScale(5),
        marginBottom : verticalScale(5),
        borderRadius : moderateScale(15),
        justifyContent : 'flex-start',
        alignItems : 'center',
        flexDirection : 'row',
    },
    bottom_memberPic : {
        width : moderateScale(40),
        height : moderateScale(40),
        margin : moderateScale(5),
        borderRadius : moderateScale(15),
        backgroundColor : '#dddddd',
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottom_memberLoc : {
        position : 'absolute', 
        right : moderateScale(0), 
        top : moderateScale(0), 
    },
    bottom_memberNameArea : {
        
    },
    bottom_memberNameTxt : {
        fontSize : moderateScale(8),
        marginBottom : verticalScale(10),
    },
    bottom_lockMem : {
        position : 'absolute', 
        backgroundColor : 'rgba(0,0,0,0.3)', 
        width: '100%', 
        height : '100%', 
        borderRadius : moderateScale(15),
    },
    bottom_lockMemKick : {
        position : 'absolute',
        top : -5,
        right : -5,
    },
    createGroupBtn : {
        position : 'absolute',
        width : moderateScale(60),
        height : moderateScale(60),
        backgroundColor : '#FA517A',
        bottom : 20,
        right : 20,
        borderRadius : moderateScale(30), // 12.14 수정
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
    bottom_memberLocCB : {
        position : 'absolute',
        top : -10,
        right : scale(-20),
    },
    locInviteArea : {
        ...StyleSheet.absoluteFillObject,
        alignItems : 'center',
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.5)',
        zIndex : 5, 
        elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    locInviteDoneBtn :{
        position : 'absolute',
        flexDirection : 'row',
        bottom : 20,
    },
    locInviteDoneBtn1 : {
        width : scale(130),
        height : moderateScale(40),
        backgroundColor : '#3298FF',
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center',
    },
    locInviteDoneBtn2 : {
        width : scale(130),
        height : moderateScale(40),
        backgroundColor : '#fff',
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center',
    },
    locInviteDoneTxt1 : {
        fontSize : moderateScale(16),
        color : '#fff',
        fontWeight : 'bold',
    },
    locInviteDoneTxt2 : {
        fontSize : moderateScale(16),
        color : '#696969',
    },
});
