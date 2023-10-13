import { ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { PokemonScreen } from 'screens/PokemonScreen';
import { PokemonsScreen } from 'screens/PokemonsScreen';

export type RootStackParamListType = {
  Home: NativeStackScreenProps<ParamListBase>;
  Pokemon: {
    id: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamListType>();

const MainRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={PokemonsScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default MainRoutes;
