import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Map publish */
import PubMapMain from './component/screen/map/PubMapMain';

export default function App() {
    //StackNavigator
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={"PubMapMain"}
                screenOptions={{
                    headerShown: false,
                    headerStyle:{
                        backgroundColor : "pink",
                        borderBottomColor : "pink",
                        shadowColor:"pink"
                    },
                    headerTintColor:"white",
                    headerBackTitleVisible:false
                }
            }>
                <Stack.Screen name="PubMapMain" component={PubMapMain}/>

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
