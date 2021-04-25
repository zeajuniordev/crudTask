import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { size } from 'lodash'

import OptionsForm from '../../screens/OptionsForm'



export default function ListTask({tasks, navigation}) {
    return (
        <View>
        <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString() }
            renderItem={(task) => (
                <Task taskObj={task} navigation={navigation}/>
            )}
        />
    </View>
    )
}

function Task({ taskObj , navigation }){
    const {id, createBy, task} = taskObj.item

    return(
        <TouchableOpacity
            onPress={() => navigation.navigate("optionsform", taskObj.item )}
        >
            <View style={styles.viewTask}>
                <View>                  
                    <Text style={styles.taskDescription}>
                        {
                            size(task) > 20
                            ? `${task.substr(0, 30)}...`
                            : task
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    viewTask:{
        margin: 20,
    },
    taskDescription:{
        paddingTop: 2,
        color: "black",
        fontSize: 15
    },
    edit:{

    }

})
