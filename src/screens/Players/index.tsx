import { ButtonIcon } from '@components/ButtonIcon';
import { Header } from '@components/Header';
import { Highligth } from '@components/Highlight';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Alert, FlatList, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import {Container, 
        Form, 
        HeaderList, 
        NumbersOfPlayers} from './style';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroups';
import { playersGetByGroupsAndTeam } from '@storage/player/playersGetByGroupsAndTeam';
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';


type RouteParams = {
    group: string;
}


export function Players(){
const [newPlayerName, setNewPlayerName] = useState ('')
const [team, setTeam] = useState('team a');
const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

const navigation = useNavigation();
const route = useRoute()
const { group } = route.params as RouteParams;

const newPlayerNameInputRef = useRef<TextInput>(null)

async function handleAddPlayer() {
    
    if(newPlayerName.trim().length === 0){
        return Alert.alert('New Person', 'Enter the name of the person to add.')

    }   
    const newPlayer = {
        name: newPlayerName,
        team
    } 

    try {

        await playerAddByGroup(newPlayer, group);

        newPlayerNameInputRef.current?.blur();

        setNewPlayerName('')
        fletchPlayersByTeam();
        
    }
    catch( error ){
        if(error instanceof AppError){
            Alert.alert('New person', error.message)
        }else{
            console.log(error)
            Alert.alert('New person', 'Could not add!')
        }
    }
}

async function fletchPlayersByTeam(){
        try{
            const playersByTeam = await playersGetByGroupsAndTeam(group, team)
            setPlayers(playersByTeam)


        }catch(error){
            console.log(error)
            Alert.alert('People', 'It was not possible to load the people of the selected team.')
        }
}

async function handlerPlayerRemove(playerName:string) {
    try{
        await playerRemoveByGroup(playerName, group);
        fletchPlayersByTeam()
    }
    catch(error){
        console.log(error)
        Alert.alert('Remove Person', 'Unable to remove this person.')
    }
    
}

async function groupRemove() {
    try{
        await groupRemoveByName(group)

        navigation.navigate('groups')
    }
    catch(error){

    }
}

async function handleGroupRemove() {
    Alert.alert(
        'Remove',
        'Do you want to remove the class?',
        [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => groupRemove() }
        ]
    )
}

    useEffect(() => {
        fletchPlayersByTeam()
    }, [team]);

    return(

        <Container>
            <Header showBackButton />

            <Highligth
                title={group}
                subtitle='Add people to your class.'
            />

         <Form>
            <Input
                inputRef={newPlayerNameInputRef}
                value={newPlayerName}
                onChangeText={setNewPlayerName}
                placeholder='Persons name'
                autoCorrect= {false}
                onSubmitEditing={handleAddPlayer}
                returnKeyType='done'
            />

            <ButtonIcon
                icon='add'
                onPress={handleAddPlayer}
            />
         </Form>
         
         <HeaderList>
            <FlatList
                data={['team a', 'team b']}
                keyExtractor={ item => item}
                renderItem={({ item }) => (
                <Filter
                    title={item}
                    isActive={item === team}
                    onPress={() => setTeam(item)}
                />
                )}
                horizontal
            />
            <NumbersOfPlayers>
                {players.length}
            </NumbersOfPlayers>

         </HeaderList>

         <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
                <PlayerCard
                    name={item.name}
                    onRemove={() => handlerPlayerRemove(item.name)}
                />
            )}
            ListEmptyComponent = {() => 
                <ListEmpty 
                message='There are no people registered.'
                />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
                {paddingBottom:100},
                players.length === 0 && { flex: 1 }
            ]}
         />

            <Button
                title='Remove class'
                type='SECONDARY'
                onPress={handleGroupRemove}
            />

        </Container>

    )
}