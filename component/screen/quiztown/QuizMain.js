import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, moderateScale, verticalScale, height} from '../scaling';
import { GoldBar } from '../map/KogWorldMapComp';
import { useState } from 'react';
import { YnImageModal } from '../modal/ModalComp';

/** 테스트 이미지 */
const bgPattern = require('../../asset/pattern/ptn_ballon.png'); 
const noTownImg = require('../../asset/image/qt_no_town_img.png'); 
const quizCorrectImg = require('../../asset/image/qt_quiz_correct_img.png'); 
const quizIncorrectImg = require('../../asset/image/qt_quiz_incorrect_img.png'); 
const startQuizImg = require('../../asset/image/qt_start_quiz_img.png'); 
export const QuizMain = ({navigation}) => {
    /** init modal */
    const [initModal, setInitModal] = useState(true)

    /** 정답 모달 팝업 */
    const [corrModal, setCorrModal] = useState(false)

    /** 오답 모달 팝업 */
    const [wrongModal, setWrongModal] = useState(false)

    /** 선택된 문제 색상변환 */
    const [boxSelect, setBoxSelect] = useState(0)

    return (
        <ImageBackground source={bgPattern} style={styles.container} resizeMode={'repeat'}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFA9C'} translucent={false} />

            {/** 친구 선택 후 다음버튼 클릭 */}
            <YnImageModal
                modalYn={initModal} 
                setModalYn={setInitModal}
                image={startQuizImg}
                msg={`퀴즈타운에 오신 것을 환영해요!\n퀴즈를 풀어볼까요?`}
                callback={()=>{}}
                cancleCallback={()=>{}}
            />

            {/** 정답 모달 팝업 */}
            <YnImageModal
                modalYn={corrModal} 
                setModalYn={setCorrModal}
                image={quizCorrectImg}
                msg={`1골드와 명예템을 선물 받으셨어요 :)\n지금 명예템을 확인할래요?`}
                option={{ok : '예', no : '아니요!'}}
                callback={()=>{navigation.push('QuizGetItem')}}
                cancleCallback={()=>{}}
            />

            {/** 오답 모달 팝업 */}
            <YnImageModal
                modalYn={wrongModal} 
                setModalYn={setWrongModal}
                image={quizIncorrectImg}
                msg={`틀려도 괜찮아요!\n다시 한 번 도전해볼까요?`}
                option={{ok : '예', no : '아니요!'}}
                callback={()=>{}}
                cancleCallback={()=>{}}
            />

            {/** 상단영역, 뒤로가기 및 골드 */}
            <View style={styles.topArea}>
                {/** 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.gobackBtn} onPress={()=>{navigation.goBack()}}>
                    <Ionicons name="chevron-back" size={moderateScale(30)} color="#3298FF"/>
                </TouchableOpacity>

                <GoldBar gold={'10,000'}/>
            </View>

            {/** 중앙영역, 퀴즈 영역 */}
            <View style={styles.midArea}>
                {/** title Area */}
                <View style={styles.midTitleArea}>
                    <Text style={styles.midTitleTxt}>Quiz Town</Text>
                </View>

                {/** quiz Box */}
                <View style={styles.midQuizBoxArea}>
                    <View style={styles.midQuizBox}>
                        {/** 질문 */}
                        <View style={styles.quizQ}>
                            <Text style={styles.quizQTxt}>Q. 아마존의 제품이 아닌것은?</Text>
                        </View>

                        {/** 문제 보기 */}
                        <View style={styles.quizA}>
                            <TouchableOpacity 
                                style={boxSelect === 1 ? [styles.quizRow, { backgroundColor : '#FCF677' }] : styles.quizRow}
                                onPress={()=>{setBoxSelect(1)}}
                            >
                                <Text style={styles.quizATxt}>a. 전자상거래</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={boxSelect === 2 ? [styles.quizRow, { backgroundColor : '#FCF677' }] : styles.quizRow}
                                onPress={()=>{setBoxSelect(2)}}
                            >                                
                                <Text style={styles.quizATxt}>b. 클라우드 컴퓨팅</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={boxSelect === 3 ? [styles.quizRow, { backgroundColor : '#FCF677' }] : styles.quizRow}
                                onPress={()=>{setBoxSelect(3)}}
                            >                                
                                <Text style={styles.quizATxt}>c. 오프라인 식료품</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={boxSelect === 4 ? [styles.quizRow, { backgroundColor : '#FCF677' }] : styles.quizRow}
                                onPress={()=>{setBoxSelect(4)}}
                            >                                
                                <Text style={styles.quizATxt}>d. 전자책</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={boxSelect === 5 ? [styles.quizRow, { backgroundColor : '#FCF677' }] : styles.quizRow}
                                onPress={()=>{setBoxSelect(5)}}
                            >                                
                                <Text style={styles.quizATxt}>e. 우주여행</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>

            {/** 하단영역, 버튼 영역 */}
            <View style={styles.bottomArea}>
                {/** 모르겠어요 버튼 */}
                <View style={styles.bottomLeft}>
                    <TouchableOpacity style={styles.dontKnowBtn} onPress={()=>{setWrongModal(true)}}>
                        <Text style={styles.dontKnowTxt}>모르겠어요 :(</Text>
                    </TouchableOpacity>
                </View>

                {/** padding */}
                <View style={{flex: 1}}></View>

                {/** 정답확인 버튼 */}
                <View style={styles.bottomRight}>
                    <TouchableOpacity style={styles.answerBtn} onPress={()=>{setCorrModal(true)}}>
                        <Text style={styles.answerTxt}>정답 확인 :)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    ) 
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        backgroundColor : '#FFFA9C',
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
        flex : 7,
        marginHorizontal : scale(18),
    },
    bottomArea : {
        flex : 1.5,
        marginHorizontal : scale(18),
        flexDirection : 'row',
        justifyContent : 'center',
    },
    midTitleArea : {
        flex : 1,
        
    },
    midTitleTxt : {
        fontSize : moderateScale(36),
        fontWeight : 'bold',
    },
    midQuizBoxArea : {
        flex : 6,
    },
    midQuizBox : {
        width : '100%',
        height : '100%',
        backgroundColor : '#fff',
        borderRadius : moderateScale(30),
        padding : moderateScale(20),
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
    quizQ : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    quizA : {
        flex : 5, 
        marginHorizontal : scale(20),
        paddingVertical : verticalScale(50),
    },
    quizQTxt : {
        fontSize : moderateScale(24),
        fontWeight : 'bold',
    },
    quizRow : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'flex-start',
        paddingLeft : scale(20),
        borderRadius : moderateScale(20),
        marginVertical : verticalScale(5),
    },
    quizATxt : {
        fontSize : moderateScale(20),
    },
    bottomLeft : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomRight : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    dontKnowBtn : {
        width : '100%',
        height : verticalScale(45),
        backgroundColor : '#fff',
        borderRadius : moderateScale(30),
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
        justifyContent : 'center',
        alignItems : 'center',
    },
    answerBtn : {
        width : '100%',
        height : verticalScale(45),
        backgroundColor : '#fff',
        borderRadius : moderateScale(30),
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
        justifyContent : 'center',
        alignItems : 'center',
    },
    dontKnowTxt : {
        fontSize : moderateScale(14),
        color : '#3298FF',
    },
    answerTxt : {
        fontSize : moderateScale(14),
        fontWeight : 'bold',
        color : '#FA717A',
    },
});
