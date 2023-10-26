import { useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { usePokemon } from 'contexts/PokemonContext';
import { PokemonScreen } from 'screens/PokemonScreen';
import { PokemonTCGScreen } from 'screens/PokemonTCGScreen';
import { RootStackParamListType } from '..';

export type PokemonStackParamListType = {
  Pokemon: undefined;
  PokemonTCG: undefined;
};

type PokemonViewRouterType = NativeStackScreenProps<
  RootStackParamListType,
  'PokemonViewRouter'
>;

const Tab = createMaterialTopTabNavigator<PokemonStackParamListType>();

const PokemonViewRouter: React.FC<PokemonViewRouterType> = ({ route }) => {
  const { pokemon } = route.params;

  const { setPokemon } = usePokemon();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPokemon(null);
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Pokemon" options={{ title: pokemon.name }}>
        {(props) => <PokemonScreen {...props} pokemon={pokemon} />}
      </Tab.Screen>
      <Tab.Screen name="PokemonTCG" component={PokemonTCGScreen} />
    </Tab.Navigator>
  );
};

export default PokemonViewRouter;
