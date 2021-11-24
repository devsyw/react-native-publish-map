import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const mainBtn = require('../../../assets/icon/MainMapMyPlaceBtn.png')
const btn1 = require('../../../assets/icon/MainMapFinanceMapBtn.png')
const btn2 = require('../../../assets/icon/MainMapGroupListBtn.png')
const btn3 = require('../../../assets/icon/MainMapMyProfileBtn.png')
const btn4 = require('../../../assets/icon/MainMapLandBtn.png')


const OpenBtnList = ({navigation, route, options, back}) => {
    const [btnState, setBtnState] = useState(true);
    const listBtn = useRef(new Animated.Value(0)).current;

    const openList = () => {
        Animated.timing(listBtn, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setBtnState(false)
    };

    const closeList = () => {
        Animated.timing(listBtn, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setBtnState(true)
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    btnState ? openList() : closeList()
                }
            }>
                <Image source={mainBtn}/>
            </TouchableOpacity>

            <Animated.View
                style={[
                styles.fadingContainer,
                {
                    opacity: listBtn
                }
                ]}
            >
                <Image source={btn1}/>
                <Image source={btn2}/>
                <Image source={btn3}/>
                <Image source={btn4}/>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        //backgroundColor : 'red'
    },
    fadingContainer: {
        padding: 20,
        //backgroundColor: "powderblue",
    },
});

export default OpenBtnList;