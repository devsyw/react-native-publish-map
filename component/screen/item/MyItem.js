import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale} from '../scaling';
import { GoldBar } from '../map/KogWorldMapComp';

/** 이미지 */
const myBadge1 = require("../../asset/image/mp_badge1_img.png")
const myBadge2 = require("../../asset/image/mp_badge2_img.png")
const myBadge3 = require("../../asset/image/mp_badge3_img.png")

const itemChangeIcon1 = require("../../asset/button/mi_health_badge_inactive_btn.png")
const itemChangeIcon1Action = require("../../asset/button/mi_health_badge_active_btn.png")
const itemChangeIcon2 = require("../../asset/button/mi_factory_badge_inactive_btn.png")
const itemChangeIcon2Action = require("../../asset/button/mi_factory_badge_active_btn.png")
export const MyItem = ({navigation}) => {

    /** 아이템박스 바꾸기 토글 */
    const [itemToggle, setItemToggle] = useState(false);
    const toggleSwitch = () => {
        setItemToggle(itemToggle => !itemToggle);
    };

    /** 뱃지, 아이템 리스트(3개씩 한줄임) */
    const ItemListRow = () => {
        return (
            <View style={styles.myAllItemBoxRows}>
                {/** badge 1 */}
                <View style={styles.spItemBox}>
                    <Image source={myBadge1} style={styles.spItemImg}/>
                </View>

                {/** badge 2 */}
                <View style={styles.spItemBox}>
                    <Image source={myBadge2} style={styles.spItemImg}/>
                </View>

                {/** badge 3 */}
                <View style={styles.spItemBox}>
                    <Image source={myBadge3} style={styles.spItemImg}/>
                </View>
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
                <TouchableOpacity style={styles.gobackBtn} onPress={()=>{navigation.goBack()}}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>

                <GoldBar gold={'10,000'} />
            </View>


            {/** 중앙영역, title 및 대표 명예템 함 */}
            <View style={styles.midArea}>
                <ScrollView 
                    style={styles.midScrollView} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                >
                    {/** Title */}
                    <View style={styles.titleArea}>
                        <Text style={styles.titleTxt}>명예템함</Text>
                    </View>

                    {/** 대표 명예템함 */}
                    <View style={styles.spItemArea}>
                        {/** sub title */}
                        <View style={styles.spItemTitleArea}>
                            <Text style={styles.spItemTitleTxt}>대표 명예템</Text>
                        </View>

                        {/** itemBox */}
                        <View style={styles.spItemBoxArea}>
                            {/** badge 1 */}
                            <View style={styles.spItemBox}>
                                <Image source={myBadge1} style={styles.spItemImg}/>
                            </View>

                            {/** badge 2 */}
                            <View style={styles.spItemBox}>
                                <Image source={myBadge2} style={styles.spItemImg}/>
                            </View>

                            {/** badge 3 */}
                            <View style={styles.spItemBox}>
                                <Image source={myBadge3} style={styles.spItemImg}/>
                            </View>
                        </View>
                    </View>

                    {/** 획득한 명예템 */}
                    <View style={styles.myItemArea}>
                        {/** sub title */}
                        <View style={styles.myItemTitleArea}>
                            <Text style={styles.myItemTitleTxt}>획득한 명예템</Text>
                        </View>

                        {/** Box Change Button */}
                        <View style={styles.myItemChangeBox}>
                            <View style={styles.myItemChangeBoxInner}>
                                {/** 헬스뱃지 */}
                                <TouchableOpacity style={!itemToggle ? styles.myItemeBox1 : styles.myItemeBox2} onPress={() => {itemToggle ? toggleSwitch() : null}}>
                                    {itemToggle ? (<Image source={itemChangeIcon1} style={styles.myItemeBadge}/>) :
                                                  (<Image source={itemChangeIcon1Action} style={styles.myItemeBadge}/>)}
                                </TouchableOpacity>

                                {/** 기업뱃지 */}
                                <TouchableOpacity style={itemToggle ? styles.myItemeBox1 : styles.myItemeBox2} onPress={() => {!itemToggle ? toggleSwitch() : null}}>
                                    {!itemToggle ? (<Image source={itemChangeIcon2} style={styles.myItemeBadge}/>) :
                                                   (<Image source={itemChangeIcon2Action} style={styles.myItemeBadge}/>)}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/** itemBox */}
                        <View style={styles.myAllItemBoxArea}>
                            {/** 뱃지, 아이템 리스트(3개씩 로우를 쪼개어 페이징해야함) */}
                            <ItemListRow/>
                            <ItemListRow/>
                            <ItemListRow/>
                            <ItemListRow/>
                        </View>
                    </View>
                </ScrollView>
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
        backgroundColor : '#fff',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    }, 
    midArea : {
        flex : 9,
    },
    goldCover : {
        justifyContent: 'center', 
        alignItems: 'center',
        ...Platform.select({ 
            ios: { 
                marginTop : verticalScale(50),
            }, 
            android: { 
                marginTop : verticalScale(50),
            }, 
        }),
    },

    midScrollView : {
        backgroundColor : '#fff',
        marginHorizontal: scale(18), 
    },
    titleArea : {
        flex : 1,
    },
    titleTxt : {
        fontSize : moderateScale(20),
        fontWeight : 'bold',
    },
    spItemArea : {
        flex : 3, 
        paddingTop : verticalScale(24)
    },
    myItemArea : {
        flex : 6, 
        marginTop : verticalScale(20),
    },
    spItemTitleArea : {
        flex : 1,  
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginBottom : verticalScale(10),
    },
    spItemTitleTxt : {
        fontSize : moderateScale(15),
        marginBottom : verticalScale(3),
        color : '#555555',
    },
    spItemBoxArea : {
        flex : 2.5,
        flexDirection : 'row',
        backgroundColor : '#F3F4F8',
        borderRadius : moderateScale(15),
        padding : moderateScale(10),
    },
    spItemBox : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    spItemImg : {
        resizeMode : 'contain',
        width : moderateScale(80),
        height : moderateScale(80),
    },
    myItemTitleArea : {
        flex : 1,  
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginBottom : verticalScale(10),
    },
    myItemTitleTxt : {
        fontSize : moderateScale(15),
        marginBottom : verticalScale(3),
        color : '#555555',
    },
    myItemChangeBox : {
        flex : 1,
        justifyContent : 'flex-start', 
        alignItems : 'center',
    },
    myItemChangeBoxInner : {
        flexDirection : 'row',
        width : '100%',
        height : verticalScale(40),
        backgroundColor : '#EEF3FF',
        borderRadius : 30,
        justifyContent : 'center',
        padding : moderateScale(5),
    },
    myItemeBox1 : {
        flex : 1,
        padding : 0,
        backgroundColor : '#3797FE',
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
    },
    myItemeBox2 : {
        flex : 1,
        padding : 5,
        backgroundColor : '#EEF3FF',
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
    },
    myItemeBadge : {
        resizeMode : 'contain',
        width : moderateScale(22),
        height : moderateScale(22),
    },
    myAllItemBoxArea : {
        flex : 1,
        backgroundColor : '#F3F4F8',
        borderRadius : moderateScale(15),
        padding : moderateScale(10),
        marginVertical : verticalScale(10),
    },
    myAllItemBoxRows : {
        flexDirection : 'row',
        marginVertical : verticalScale(5),
    },

});
