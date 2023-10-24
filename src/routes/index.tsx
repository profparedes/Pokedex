import { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { PokemonsScreen } from 'screens/PokemonsScreen';
import { PokemonType } from 'types/pokemon';
import PokemonViewRouter, {
  PokemonStackParamListType,
} from './PokemonViewRouter';

type PokemonRouteType = { pokemon: PokemonType } & Partial<
  NavigatorScreenParams<PokemonStackParamListType>
>;

export type RootStackParamListType = {
  Home: NativeStackScreenProps<ParamListBase>;
  PokemonViewRouter: PokemonRouteType;
};

const Stack = createNativeStackNavigator<RootStackParamListType>();

const MainRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={PokemonsScreen} />
      <Stack.Screen name="PokemonViewRouter" component={PokemonViewRouter} />
    </Stack.Navigator>
  );
};

export default MainRoutes;
