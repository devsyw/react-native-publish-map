import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale} from '../scaling';
import { RandomHexColor } from './KogMyCollectionComp';

/** 이미지 */
const goldIcon = require('../../asset/icon/wm_coin_icon.png'); //골드 아이콘
const building1 = require('../../asset/image/mc_building1_img.png'); //빌딩1
const building2 = require('../../asset/image/mc_building2_img.png'); //빌딩2

export const MyCollection = ({navigation}) => {

    /** FlatList sampledata(3개 불러옴) */
    const DATA = [{id : 1, bg: RandomHexColor},{id : 2, bg: RandomHexColor}, {id: 3, bg: RandomHexColor}]
    const itemListData = [{id : 1},{id : 2}, {id: 3}, {id : 4},{id : 5}, {id: 6}]

    /** 탭버튼 클릭시 색 변경 */
    const [itemTab, setItemTab] = useState(true); //첫 화면에서는 itemTab이 활성
    const [buildingTab, setBuildingTab] = useState(false);
    const [trophyTab, setTrophyTab] = useState(false);
    const tabPress = (tab) => {
        switch (tab) {
            case 'item' : 
                setItemTab(true)
                setBuildingTab(false)
                setTrophyTab(false)
                break;
            case 'building' : 
                setItemTab(false)
                setBuildingTab(true)
                setTrophyTab(false)
                break;
            case 'trophy' :
                setItemTab(false)
                setBuildingTab(false)
                setTrophyTab(true)
                break;
            default:
                break;
        }
    }

    /** 상단 내 아이템 FlatList */
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.midArea_collectionBox}>
                <View style={[styles.midArea_collectionBox_ele, {backgroundColor : item.bg()}]}>
                    <Image source={building1} style={styles.midArea_collectionBox_img} />
                </View>
                <Text style={styles.midArea_collectionBox_txt}>Building 1</Text>
            </TouchableOpacity>
        )
    }

    /** 하단 ItemList FlatList */
    const renderItem2 = ({item}) => {
        return (
            <TouchableOpacity style={styles.bottom_itemBox} >
                <Image source={building1} style={styles.bottom_itemBox_ele} />
                <Text style={styles.bottom_itemBox_eleTxt}>House</Text>
            </TouchableOpacity>
        )
    }

    /** 하단 ItemList 잠금 아이템 */
    const LockItemBox = () => {
        return (
            <View style={styles.bottom_itemBox}>
                <MaterialIcons name="lock" size={35} color="#FA517A" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#fff'} translucent={false} />

            {/** 상단영역, 뒤로가기 및 골드 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>

                {/** 여백 */}
                <View style={{flex : 2}}></View>

                {/** 보유 골드 */}
                <View style={styles.topArea_toggle}>
                    <Image source={goldIcon} style={styles.top_toggle_goldIcon}></Image>
                    <View style={styles.topArea_toggleArea}>
                        <Text>1,000</Text>
                    </View>
                </View>
            </View>

            {/** 중앙영역, 내 정보 */}
            <View style={styles.midArea}>
                {/** 내 별명 */}
                <View style={styles.midArea_txtArea}>
                    <Text style={styles.midArea_txt}>My Collection</Text>
                </View>

                {/** 컨텐츠 영역 */}
                <View style={styles.midArea_content}>
                    {/** 상단 메뉴영역 */}
                    <View style={styles.midArea_contentMenu}>
                        <TouchableOpacity style={styles.midArea_contentMenuTxtArea} onPress={()=>{tabPress('item')}}>
                            <Text style={itemTab ? styles.midArea_contentMenuTxtSelect : styles.midArea_contentMenuTxt}>
                                Item
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.midArea_contentMenuTxtArea} onPress={()=>{tabPress('building')}}>
                            <Text style={buildingTab ? styles.midArea_contentMenuTxtSelect : styles.midArea_contentMenuTxt}>
                                Building
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.midArea_contentMenuTxtArea} onPress={()=>{tabPress('trophy')}}>
                            <Text style={trophyTab ? styles.midArea_contentMenuTxtSelect : styles.midArea_contentMenuTxt}>
                                Trophy
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/** 컬렉션 리스트 */}
                    <View style={styles.midArea_contentArea}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            /** ------------------------ */
                            horizontal = {true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>

            {/** 하단영역, 내가 속한 랜드 */}
            <View style={styles.bottomArea}>
                {/** 하단 아이템 리스트 */}
                <View style={styles.bottomArea_itemList}>
                    {/** 하단 아이템 백그라운드(회색바탕) */}
                    <View style={styles.bottomArea_itemListBg}>

                        {/** Item List Text */}
                        <Text style={styles.bottomArea_itemListTxt}>Item List</Text>

                        {/** 텍스트 영역 패딩 */}
                        <View style={{flex : 1}}></View>

                        {/** 아이템 리스트(카테고리) */}
                        <FlatList
                            data={itemListData}
                            renderItem={renderItem2}
                            keyExtractor={item => item.id}
                            /** ------------------------ */
                            horizontal = {true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />

                        {/** 공개되지 않은 아이템 */}
                        {/* <LockItemBox/> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff'
    }, 
    gobackBtn : {
        position : 'absolute',
        top : moderateScale(20),
        left : moderateScale(15),
    },
    topArea : {
        flex : 1,
        flexDirection : 'row',
    }, 
    top_toggle_goldIcon : {
        position : 'absolute', 
        zIndex : 2, 
        width: moderateScale(32), 
        height: moderateScale(32),
        elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    midArea : {
        flex : 5,
    },
    midArea_txtArea : {
        flex : 1, 
        justifyContent : 'center', 
        marginLeft : moderateScale(26)
    },
    midArea_txt : {
        fontSize : moderateScale(24), 
        fontWeight : 'bold',
    },
    midArea_content : {
        flex : 5, 
    },
    midArea_contentMenu : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
    midArea_contentMenuTxtArea : {
        marginLeft : scale(24),
        marginRight : scale(10),
    },
    midArea_contentMenuTxt : {
        fontSize : moderateScale(16),
        color : '#c4c4c4',
    },
    midArea_contentMenuTxtSelect : {
        fontSize : moderateScale(16),
        color : '#000',
        fontWeight : 'bold',
    },
    midArea_contentArea : {
        flex : 6,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
    },
    midArea_collectionBox : {
        width: moderateScale(200), 
        height: verticalScale(200),
        backgroundColor : '#fff', 
        borderRadius : moderateScale(28),
        marginLeft : scale(30),
        marginTop : verticalScale(50),
        marginBottom : verticalScale(10),
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
    midArea_collectionBox_ele : {
        width: scale(160), 
        height: verticalScale(160),
        borderRadius : moderateScale(28),
        justifyContent : 'center',
        alignItems : 'center',
    },
    midArea_collectionBox_img : {
        width: moderateScale(180), 
        height: moderateScale(180),
        marginBottom : verticalScale(30),
    },
    midArea_collectionBox_txt : {
        fontSize : moderateScale(14),
        fontWeight : 'bold',
        marginTop : verticalScale(3),
    },
    midBottom_padding : {
        flex : 0.5,
    }, 
    bottomArea : {
        flex : 3,
        backgroundColor : '#fff'
    },
    topArea_toggle : {
        flex : 1, 
        flexDirection : 'row',
        justifyContent : 'flex-start', 
        alignItems : 'center'
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
    bottomArea_itemList : {
        flex : 5, 
    },
    bottomArea_itemListBg : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#f5f5f5',
        marginTop : verticalScale(40),
        marginBottom : verticalScale(40),
        marginLeft : scale(25),
        borderTopStartRadius : moderateScale(30),
        borderBottomStartRadius : moderateScale(30),
        paddingLeft : scale(60)
    }, 
    bottom_itemBox : {
        flex : 1,
        width : moderateScale(75),
        height : moderateScale(75),
        backgroundColor : 'white',
        borderRadius : moderateScale(20),
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : scale(5),
        marginRight : scale(15),
        marginBottom : verticalScale(25),
        marginTop : verticalScale(25),
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
    bottomArea_itemListTxt : {
        transform: [{ rotate: '-90deg'}], 
        fontSize : moderateScale(17), 
        fontWeight : 'bold', 
        color : '#969696', 
        position : 'absolute', 
        left : 0
    },
    bottom_itemBox_ele : { 
        width : moderateScale(75), 
        height : moderateScale(75),
    },
    bottom_itemBox_eleTxt : {
        fontSize : moderateScale(12), 
        marginBottom : verticalScale(20), 
        color : '#969696', 
        fontWeight : 'bold'
    },
    bottom_landImage : {
        position : 'absolute',
        width : moderateScale(70),
        height : moderateScale(70),
    },
});
