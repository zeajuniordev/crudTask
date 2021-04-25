import React, { useState , useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Button } from "react-native-elements"
import { useNavigation } from '@react-navigation/native'
import { size } from 'lodash'

import Loading from '../components/Loading'
import { getCurrentUser, getTasks } from "../utils/actions"
import ListTask from '../components/Tasks/ListTask'

export default function ViewTask() {

    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const navigation = useNavigation()

    const userId = getCurrentUser().uid


    useFocusEffect(
        useCallback(async() => {
            setLoading(true)
            const response = await getTasks(userId)
            if(response.statusResponse){
                setTasks(response.tasks)
            }
            setLoading(false)
        }, [])
    )

    return (
        <View style={styles.viewBody}>
            <Text style={styles.welcome}>Bienvenido : {getCurrentUser().email}</Text>
            {
                size(tasks) > 0 ? (
                    <ListTask
                        tasks={tasks}
                        navigation={navigation}
                    />

                ): (
                <View style={styles.notFoundView}>
                    <Text style={styles.notFoundText}>
                        No hay Tasks registrados
                    </Text>
                </View>
                )
            }
            <Icon
                type="material-community"
                name="plus"
                color="#1F3580"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("addform")}
            />
            <Loading
                isVisible={loading}
                text="Cargando tareas"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex :  1,
    },
    btnContainer: {
        position: "absolute",
        bottom: 0,
        right: 1,
        shadowColor: "black",
        shadowOffset: { width:2, height:2},
        shadowOpacity: 0.5
    },
    welcome :{
        alignSelf: "center",
        marginVertical: 20,
        fontWeight: "bold",
        fontSize: 18
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText:{
        fontSize: 18
    }
})
