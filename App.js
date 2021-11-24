import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Effect Test */
import AnimationRoute from './component/effect/animation/animationRoute';
import SlideTest from './component/effect/animation/slide';
import IconDrag from './component/effect/animation/iconDragMove';
import FadeInOut from './component/effect/animation/fadeInOut';
import OpenBtnList from './component/effect/animation/openBtnList';

/** 3D Test */
import ThreePrac from './component/effect/threejs/prac';
import WebViewTest from './component/effect/threejs/webviewTest';

/** Map publish */
import PubMapMain from './component/screen/map/PubMapMain';

/** Sign publish */
import SignInName from './component/screen/sign/SignInName'
import SignInBirthday from './component/screen/sign/SignInBirthday'
import SignInCountry from './component/screen/sign/SignInCountry'
import SignInPhoneNumber from './component/screen/sign/SignInPhoneNumber'
import SignInVerifyCode from './component/screen/sign/SignInVerifyCode'
import P006 from './component/screen/sign/006'

export default function App() {
    //StackNavigator
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={"SignInName"}
                screenOptions={{
                    headerShown: false, //top 영역을 보이게 할것인가?
                    headerTintColor:"white",
                    headerBackTitleVisible: false
                }
            }>
                {/** Publish Page */}
                <Stack.Screen name="PubMapMain" component={PubMapMain}/>
                <Stack.Screen name="SignInName" component={SignInName} />
                <Stack.Screen name="SignInBirthday" component={SignInBirthday} />
                <Stack.Screen name="SignInCountry" component={SignInCountry} />
                <Stack.Screen name="SignInPhoneNumber" component={SignInPhoneNumber} />
                <Stack.Screen name="SignInVerifyCode" component={SignInVerifyCode} />
                <Stack.Screen name="P006" component={P006} />


                {/** Animation samples */}
                <Stack.Screen name="AnimationRoute" component={AnimationRoute}/>
                <Stack.Screen name="SlideTest" component={SlideTest}/>
                <Stack.Screen name="IconDrag" component={IconDrag}/>
                <Stack.Screen name="FadeInOut" component={FadeInOut}/>
                <Stack.Screen name="OpenBtnList" component={OpenBtnList}/>

                {/** 3D render Test */}
                <Stack.Screen name="ThreePrac" component={ThreePrac}/>
                <Stack.Screen name="WebViewTest" component={WebViewTest}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
