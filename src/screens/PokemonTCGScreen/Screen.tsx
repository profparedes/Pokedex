import { memo } from 'react';
import { ScrollView, Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PokemonStackParamListType } from 'routes/PokemonViewRouter';
import { PokemonType } from 'types/pokemon';

type PokemonTCGScreenType = NativeStackScreenProps<
  PokemonStackParamListType,
  'PokemonTCG'
> & {
  pokemon: PokemonType;
};

const PokemonTCGScreen: React.FC<PokemonTCGScreenType> = ({ pokemon }) => {
  console.log({ pokemon });
  return (
    <ScrollView>
      <Text>Pokemon TCG Screen</Text>
    </ScrollView>
  );
};

export default memo(PokemonTCGScreen);
