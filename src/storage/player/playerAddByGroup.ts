import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./playerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroups";


export async function playerAddByGroup( newPlayer: PlayerStorageDTO, group: string ){

    try{
        const storedPlayers = await playersGetByGroup(group);

        const playerAlrearyExists =  storedPlayers.filter(player => player.name === newPlayer.name)
         
        if (playerAlrearyExists.length > 0){
            throw new AppError('Ops... looks like this person has already been added to a class')
        }


        const storage = JSON.stringify([...storedPlayers, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

    }
    catch(error){
        throw (error)

    }

}
