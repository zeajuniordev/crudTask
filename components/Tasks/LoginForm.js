import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import Loading from '../Loading'
import { validateEmail } from '../../utils/helpers'
import { loginWithEmailAndPassword } from '../../utils/actions'

export default function LoginForm() {
    const [showPassword, setshowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const onChange = (e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})

    }

    const doLogin = async () => {
        if(!validateData()){
            return;
        }

        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)
        if(!result.statusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }

        navigation.navigate("viewtask")

    }

    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email válido.")
            isValid = false
        }

        if(isEmpty(formData.password)){
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid = false
        }

        return isValid
    }

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                keyboardType="email-address"
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setshowPassword(!showPassword)}
                    />
                }
                errorMessage={errorPassword}
                defaultValue={formData.password}
            />
            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => 
                    doLogin()
                }
            />
            <Loading
                isVisible={loading}
                text="Iniciando Sesión..."
            />
        </View>
    )
}

const defaultFormValue = () => {
    return { email: "", password: ""}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor:"#008080"
    },
    icon:{
        color: "#c1c1c1"
    }
})
