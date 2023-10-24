import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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

  return (
    <Tab.Navigator>
      <Tab.Screen name="Pokemon" options={{ title: pokemon.name }}>
        {(props) => <PokemonScreen {...props} pokemon={pokemon} />}
      </Tab.Screen>
      <Tab.Screen name="PokemonTCG">
        {(props) => <PokemonTCGScreen {...props} pokemon={pokemon} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default PokemonViewRouter;
