import React, { useState, useEffect } from 'react'
import { Button, Input } from 'react-native-elements'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { isEmpty } from 'lodash'

import Loading from '../components/Loading'
import { getCurrentUser, updateTask, deleteTask } from '../utils/actions'

export default function OptionsForm({ navigation, route }) {

    const [formData, setFormData] = useState(defaultFormValues(route))
    const [errorTask, setErrorTask] = useState(null)
    const [loading, setLoading] = useState(null)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }


    const EditTarea = async() => {
        if(isEmpty(formData.task)){
            setErrorTask("Debes ingresar información para almacenar")
            return
        }
        const task ={
            id:  route.params.id,
            task : formData.task,
            createBy : getCurrentUser().uid
        }

        const response = await updateTask(task)
        if(response.statusResponse){
            navigation.navigate("viewtask")
        }
        
    }

    const AlertComplete = () => {
        Alert.alert(
            "Completar tarea",
            "¿estas seguro que quieres completar tarea?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text:"Si",
                    onPress: () =>{
                        DeleteTarea()
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    const DeleteTarea = async() => {
        const task ={
            id:  route.params.id,
            createBy : getCurrentUser().uid
        }

        const response = await deleteTask(task)
        if(response.statusResponse){
            navigation.navigate("viewtask")
        }
        
    }

    return (
        <View style={styles.container}>
        <Input
           containerStyle={styles.input}
           placeholder="Ingresa una tarea..."
           defaultValue={route.params.task}
           multiline
           onChange={(e) => onChange(e, "task")}
           errorMessage={errorTask}
       />
       <Button
           title="Editar tarea"
           containerStyle={styles.btnContainer}
           buttonStyle={styles.btnEdit}
           onPress={EditTarea}
       />
        <Button
           title="Completar tarea"
           containerStyle={styles.btnContainer}
           buttonStyle={styles.btnComplet}
           onPress={AlertComplete}
       />
       <Loading
           isVisible={loading}
           text="Creando tarea"
       />
   </View>
    )
}

const defaultFormValues = (route) => {
    return {
        task: route.params.task
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
    btnEdit:{
        backgroundColor:"#008080"
    },
    btnComplet:{
        backgroundColor:"#C70039"
    }
})
