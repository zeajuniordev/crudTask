import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Loading from '../components/Loading'
import AddForm from '../screens/AddForm'
import Login from '../screens/Login'
import OptionsForm from '../screens/OptionsForm'
import ViewTask from '../screens/ViewTask'


const Stack = createStackNavigator()

export default function Stacks() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{
                        title: "Inicio de Sesión",
                        headerTitleAlign: "center"
                    }}
                />
                <Stack.Screen
                    name="viewtask"
                    component={ViewTask}
                    options={{
                        title: "Tareas",
                        headerTitleAlign: "center"
                    }}
                />
                <Stack.Screen
                    name="optionsform"
                    component={OptionsForm}
                    options={{
                        title: "Editar Tarea",
                        headerTitleAlign: "center"
                    }}
                />
                <Stack.Screen
                    name="addform"
                    component={AddForm}
                    options={{
                        title: "Agregar Tarea",
                        headerTitleAlign: "center"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
