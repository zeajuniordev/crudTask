import React from 'react'
import Stacks from './navigations/Stacks'
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Stacks/>
  );
}
