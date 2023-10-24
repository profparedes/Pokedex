import { memo, useEffect } from 'react';
import { Image, ScrollView, Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { usePokemon } from 'contexts/PokemonContext';
import { unslugify } from 'helpers/index';
import { PokemonStackParamListType } from 'routes/PokemonViewRouter';
import { PokemonType } from 'types/pokemon';

type PokemonScreenType = NativeStackScreenProps<
  PokemonStackParamListType,
  'Pokemon'
> & {
  pokemon: PokemonType;
};

const PokemonScreen: React.FC<PokemonScreenType> = ({
  pokemon: routePokemon,
}) => {
  const { pokemonLoading, fetchPokemon, pokemon } = usePokemon();

  useEffect(() => {
    fetchPokemon({ variables: { name: routePokemon.name } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      {pokemonLoading && <Text>Loading...</Text>}
      {!pokemonLoading && pokemon && (
        <>
          <Text>
            {pokemon.image && (
              <Image
                style={{ width: 240, height: 240 }}
                source={{ uri: pokemon.image }}
                alt={pokemon.name}
              />
            )}
          </Text>
          <Text bold>{unslugify(pokemon.name)}</Text>
          <Text bold>{pokemon.pokedexIndex}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}
          >
            {pokemon.types.map((type, index) => (
              <Text
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{
                  backgroundColor: 'lightgrey',
                  padding: 5,
                  marginRight: 5,
                }}
              >
                {type}
              </Text>
            ))}
          </View>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Description:</Text>
            {pokemon.description && <Text>{pokemon.description}</Text>}
            {pokemon.gender && (
              <View style={{ flexDirection: 'row' }}>
                <Text>Gender:</Text>
                <Text color="#1fbba3">{pokemon.gender.m}</Text>
                <Text color="#c32bff">{pokemon.gender.f}</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            {pokemon.weight && (
              <View
                style={{ flex: 1, borderRightWidth: 1, borderColor: 'grey' }}
              >
                <Text>Weight:</Text>
                <Text>{pokemon.weight} Kg</Text>
              </View>
            )}
            {pokemon.height && (
              <View style={{ flex: 1 }}>
                <Text>Height:</Text>
                <Text>{pokemon.height} m</Text>
              </View>
            )}
            {pokemon.move && (
              <View
                style={{ flex: 1, borderLeftWidth: 1, borderColor: 'grey' }}
              >
                <Text>Move:</Text>
                <Text>{unslugify(pokemon.move)}</Text>
              </View>
            )}
          </View>
          <Text style={{ fontWeight: 'bold' }}>Feature:</Text>
          {pokemon.stats?.map((stat, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>
              <Text>{unslugify(stat.name)}</Text>
              <Text color={stat.value > 50 ? 'green' : 'red'}>
                {stat.value}
              </Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default memo(PokemonScreen);
