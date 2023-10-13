import { memo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { RootStackParamListType } from 'routes/index';

type PokemonScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Pokemon'
>;

const PokemonScreen: React.FC<PokemonScreenType> = ({ route }) => {
  return (
    <View>
      <Text>Pokemon Screen</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default memo(PokemonScreen);
