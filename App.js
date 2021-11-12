import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Map publish */
import PubMapMain from './component/screen/map/PubMapMain';

/** Effect Test */
import AnimationRoute from './component/effect/animation/animationRoute';
import SlideTest from './component/effect/animation/slide';
import IconDrag from './component/effect/animation/iconDragMove';
import FadeInOut from './component/effect/animation/fadeInOut';

/** 3D Test */
import ThreePrac from './component/effect/threejs/prac';

export default function App() {
    //StackNavigator
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={"ThreePrac"}
                screenOptions={{
                    headerShown: true, //top 영역을 보이게 할것인가?
                    headerStyle:{
                        backgroundColor : "pink",
                        borderBottomColor : "pink",
                        shadowColor:"pink"
                    },
                    headerTintColor:"white",
                    headerBackTitleVisible: false
                }
            }>
                {/** Publish Page */}
                <Stack.Screen name="PubMapMain" component={PubMapMain}/>

                {/** Animation samples */}
                <Stack.Screen name="AnimationRoute" component={AnimationRoute}/>

                <Stack.Screen name="SlideTest" component={SlideTest}/>
                <Stack.Screen name="IconDrag" component={IconDrag}/>
                <Stack.Screen name="FadeInOut" component={FadeInOut}/>

                {/** 3D render Test */}
                <Stack.Screen name="ThreePrac" component={ThreePrac}/>
                
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
