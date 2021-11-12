import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Image, SafeAreaView } from "react-native";

const MapIcon_Finance = require('../../../assets/icon/MainMapMyPlaceBtn.png')

const IconDrag = ({navigation, route, options, back}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      }
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>눌러서 아이콘을 옮겨보자</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        {/* <View style={styles.box} /> */}
        <Image source={MapIcon_Finance}/>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default IconDrag;