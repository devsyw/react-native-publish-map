import React, { useEffect, useRef } from "react";
import {Alert, Text, View} from "react-native";
import {WebView} from "react-native-webview";

const WebViewTest = ({navigation, route, options, back}) => {
    useEffect(() => {
        console.log('test')
    })
    return (
        <WebView style={{flex : 1}} source={{ uri: 'http://10.0.0.48:3000/' }} />
    );
}

export default WebViewTest;