import React from "react"
import { View, StyleSheet } from "react-native"
import Svgfile from './testfile.svg'

export const SvgTest = () => {

    return (
        <View style={styles.container}>
            <View style={styles.topArea}></View>
            <View style={styles.midArea}>
                {/* <Svgfile width={100} height={100}/> */}
            </View>
            <View style={styles.bottomArea}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    topArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
    },
    midArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
    },
    bottomArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
    },

})