import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

/** 상단 스테이터스 바 */
import { StatusBar } from 'expo-status-bar';

/** React-Native-Map lib */
import MapView, { Marker, PROVIDER_GOOGLE, animateToRegion, Callout} from 'react-native-maps';

const windowSize = Dimensions.get('window');

export default function PubMapMain({navigation, route, options, back}){

    const IconBox = () => {
        return (
            <View style={styles.iconBoxArea}>
                
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/** 상단 스테이터스 바 */}
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />

            {/** Google Map View */}
            <MapView
                style={styles.map}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
            </MapView>

            {/**  */}
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container : {
        ...StyleSheet.absoluteFill,
    }, 
    map : {
        ...StyleSheet.absoluteFill,
    },
    iconBoxArea : {
        width : windowSize.width*0.08,
        height : windowSize.height*0.08,
    },
    iconBox : {
        width : windowSize.width*0.08,
        height : windowSize.height*0.08,
    },
})

const mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#0066ff"
            },
            {
                "saturation": 74
            },
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "weight": 0.6
            },
            {
                "saturation": -85
            },
            {
                "lightness": 61
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#5f94ff"
            },
            {
                "lightness": 26
            },
            {
                "gamma": 5.86
            }
        ]
    }
];

