import { memo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { RootStackParamListType } from 'routes/index';

type PokemonsScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Home'
>;

const PokemonsScreen: React.FC<PokemonsScreenType> = ({ navigation }) => {
  return (
    <View>
      <Text>Pokemons Screen</Text>
      <Button
        onPress={() =>
          navigation.navigate('Pokemon', {
            id: 123,
          })
        }
        title="Pokemon"
      />
    </View>
  );
};

export default memo(PokemonsScreen);
