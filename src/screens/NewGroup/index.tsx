import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highligth } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Container, Content, Icon } from "./style";


export function NewGroup() {

    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew(){
     try{
        if(group.trim().length === 0){
            return Alert.alert('New Class', 'Provide the name of the class.')
        } 

        await groupCreate(group);
        navigation.navigate('players', { group });

      } catch(error) {
        if ( error instanceof AppError ){
          Alert.alert('New Class', error.message);
        }
        else {
          Alert.alert('New Class', 'Could not create a new class!')
        }
      }
    
    }

    return(

        <Container>
            <Header showBackButton/>

            <Content>
                <Icon/>

                <Highligth
                    title="New Class"
                    subtitle="Create the class at personal add."
                />
                
                <Input
                    placeholder="Class Name."
                    onChangeText={setGroup}
                 />

                <Button
                    title="Create"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />
            </Content>

        </Container>

    )
 }