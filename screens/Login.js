import React from 'react'
import { Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from  '@react-navigation/native'

import LoginForm from '../components/Tasks/LoginForm'

export default function Login() {
    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <LoginForm/>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: 40,
        marginTop: 200
    },
})
