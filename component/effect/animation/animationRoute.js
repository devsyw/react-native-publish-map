import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Button, SafeAreaView } from "react-native";

const MapIcon_Finance = require('../../../assets/icon/MainMapMyPlaceBtn.png')

const AnimationRoute = ({navigation, route, options, back}) => {

    const navi = (screen) => {
        navigation.push(screen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>애니메이션 샘플</Text>
            <View style={styles.buttonRow}>
                <Button title="드래그 앤 드랍" onPress={() => navi('IconDrag')} />
                <Button title="페이드 인/아웃" onPress={() => navi('FadeInOut')} />
                <Button title="슬라이드" onPress={() => navi('SlideTest')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    fadingContainer: {
        padding: 20,
        //backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: "space-evenly",
        marginVertical: 16
    }
});

export default AnimationRoute;