import { memo, useCallback } from 'react';
import { Text, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { PokemonCard } from 'components/PokemonCard';
import { usePokemon } from 'contexts/PokemonContext';
import { RootStackParamListType } from 'routes/index';

type PokemonsScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Home'
>;

const PokemonsScreen: React.FC<PokemonsScreenType> = ({ navigation }) => {
  const { pokemons, loading, hasMorePages, fetchNextPage } = usePokemon();

  const Header = useCallback(
    () => (
      <View bg="$amber300">
        <Text>Which Pokémon would you choose?</Text>
      </View>
    ),
    [],
  );

  const Footer = useCallback(
    () => (
      <View>
        <Text>Footer</Text>
      </View>
    ),
    [],
  );

  return (
    <>
      <View>{loading && pokemons.length === 0 && <Text>Loading</Text>}</View>
      <FlatList
        ListHeaderComponent={Header}
        numColumns={2}
        data={pokemons}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() =>
              navigation.navigate('Pokemon', {
                pokemon: item,
              })
            }
          />
        )}
        keyExtractor={(pokemon) => pokemon.id.toString()}
        onEndReached={!loading && hasMorePages ? fetchNextPage : undefined}
        ListFooterComponent={Footer}
      />
    </>
  );
};

export default memo(PokemonsScreen);
