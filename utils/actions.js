import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const loginWithEmailAndPassword = async (email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}

export const addDocumentWithoutId = async (collection, data) => {
    const result = { statusResponse: true , error: null}
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error =  error
    }
    return result
}

export const getTasks = async(userId) => {
    const result = { statusResponse: true, error: null, tasks: [], startTask: null }
    try {
        const response = await db
            .collection("tasks")
            .get()
        if (response.docs.length > 0) {
            result.startTask = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const task = doc.data()
            if(task.createBy === userId){
                result.tasks.push(task)
            }
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateTask = async(newTask) => {
    console.log("newTask", newTask)
    const result = { statusResponse: true, error:null , document:null}
    try {
        const response = await db
        .collection("tasks")
        .where("id", "==", newTask.id)
        .get()

        response.forEach(async(doc) =>{
             result.document = doc.id
        })
        const data = await db.collection("tasks").doc(result.document).update(newTask)
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result

}

export const deleteTask = async(newTask) => {
    const result = { statusResponse: true, error:null, document:null}
    try {
        const response = await db
        .collection("tasks")
        .where("id", "==", newTask.id)
        .get()
        response.forEach(async(doc) =>{
            result.document = doc.id
        })
        const deleteeeTask = await db.collection("tasks").doc(result.document).delete()
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result

}