import React , { useState, useRef } from 'react'
import { Button, Input } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import { StyleSheet, Text, View } from 'react-native'
import { isEmpty } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import uuid from 'random-uuid-v4'

import Loading from '../components/Loading'
import { getCurrentUser, addDocumentWithoutId } from '../utils/actions'

export default function AddForm() {

    const [formData, setFormData] = useState(defaultFormValues())
    const [newTask, setNewTask] = useState(null)
    const [errorTask, setErrorTask] = useState(null)
    const [loading, setloading] = useState(false)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const navigation = useNavigation()

    const AddTarea = async() => {
        if(isEmpty(formData.task)){
            setErrorTask("Debes ingresar información para almacenar")
            return
        }
        const task ={
            id:  uuid(),
            task : formData.task,
            createBy: getCurrentUser().uid
        }
        setloading(true)
        const response = await addDocumentWithoutId("tasks", task)
        
        navigation.navigate("viewtask")


    }

    return (
        <View style={styles.container}>
             <Input
                containerStyle={styles.input}
                placeholder="Ingresa una tarea..."
                multiline
                onChange={(e) => onChange(e, "task")}
                errorMessage={errorTask}
            />
            <Button
                title="Agregar tarea"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={AddTarea}
            />
            <Loading
                isVisible={loading}
                text="Creando tarea"
            />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        task: ""
    }
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
})
