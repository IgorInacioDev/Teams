
import { ThemeProvider } from "styled-components";

import theme from "./src/theme"

import { useFonts, 
         Roboto_400Regular,  
         Roboto_700Bold} from "@expo-google-fonts/roboto";
  
import {StatusBar } from 'react-native'
  
import { Loading } from "@components/Loading/index";
import { Routes } from './src/routes';

import { useNavigation } from '@react-navigation/native'






export default function App(){
  const [fontsloaded] = useFonts({Roboto_400Regular, Roboto_700Bold});
  
  return(
    <ThemeProvider theme={theme}> 
       <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
          />
   
       {fontsloaded ? <Routes/> : <Loading/>}
       
    </ThemeProvider>
  )
}