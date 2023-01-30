import { Header } from '@components/Header';
import { Highligth } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { useCallback, useState } from 'react';
import { FlatList} from 'react-native'
import {Container} from './style';


export function Groups({}) {
  const [groups, setGroups] = useState<string[]>([])

  
  const navigation = useNavigation()

  function handleNewGroup(){
    navigation.navigate('new')
    console.log(groups)
  }

  async function fletchGroups() {
    try{
      const data = await groupsGetAll();
      setGroups(data)
     
    }
    catch(error) {  
      console.log(error);
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', {group})
  }

  useFocusEffect(useCallback(() => {
    console.log('use on')
    fletchGroups();
  },[]));

  return (
    <Container>
      <Header/>
      
      <Highligth
        title='Classes'
        subtitle='play with your class'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle = {groups.length === 0  && { flex:1 }}
        ListEmptyComponent = {() => 
            <ListEmpty 
            message='No classes registered. How about registering?'
            />}
      />

      <Button 
        title='Create new Class.'
        onPress={handleNewGroup}
        />

    </Container>
    
  );
}
