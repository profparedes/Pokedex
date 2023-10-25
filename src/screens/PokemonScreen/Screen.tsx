import { memo, useEffect } from 'react';
import {
  AntDesign,
  FontAwesome5,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  Button,
  ButtonText,
  Image,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'components/StatusBar';
import { usePokemon } from 'contexts/PokemonContext';
import { pokemonColors, unslugify } from 'helpers/index';
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
  navigation,
}) => {
  const { pokemonLoading, fetchPokemon, pokemon } = usePokemon();

  const colors =
    pokemonColors?.[pokemon?.color as keyof typeof pokemonColors] ||
    pokemonColors.black;

  useEffect(() => {
    fetchPokemon({ variables: { name: routePokemon.name } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView backgroundColor={colors.background}>
      {pokemonLoading && <Text>Loading...</Text>}
      {!pokemonLoading && pokemon && (
        <>
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            pt={20}
            mb={20}
            px={20}
          >
            <Button
              size="md"
              variant="link"
              onPress={() => navigation.navigate('Home')}
            >
              <ButtonText size="3xl" lineHeight="$3xl" color={colors.name}>
                <AntDesign name="left" size={24} color={colors.name} />
              </ButtonText>
            </Button>
            <AntDesign name="hearto" size={24} color={colors.name} />
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            px={20}
            mb={10}
          >
            <Text color={colors.name} size="4xl" lineHeight="$4xl" bold>
              {unslugify(pokemon.name)}
            </Text>
            <Text color={colors.name} size="2xl" lineHeight="$2xl" bold>
              {pokemon.pokedexIndex}
            </Text>
          </View>
          <View flexDirection="row" gap={16} px={20}>
            {pokemon.types.map((type, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <View
                py={6}
                px={18}
                rounded={20}
                backgroundColor={colors.text}
                key={index}
              >
                <Text color={colors.name}>{type}</Text>
              </View>
            ))}
          </View>
          {pokemon.image && (
            <Image
              alignSelf="center"
              style={{ width: 240, height: 240 }}
              source={{ uri: pokemon.image }}
              alt={pokemon.name}
              zIndex={1}
            />
          )}
          <View
            borderTopEndRadius={36}
            borderTopStartRadius={36}
            backgroundColor="#fff"
            top={-52}
            px={20}
            py={52}
          >
            {pokemon.description && (
              <>
                <Text color={colors.background} bold fontSize={20} mb={42}>
                  Description:
                </Text>
                <Text mb={32}>{pokemon.description}</Text>
              </>
            )}
            <View flexDirection="row" justifyContent="space-between" mb={32}>
              {pokemon.weight && (
                <View
                  alignItems="center"
                  flex={1}
                  borderRightWidth={1}
                  borderColor="grey"
                  py={6}
                >
                  <View flexDirection="row" alignItems="center" gap={8}>
                    <MaterialCommunityIcons
                      name="weight-kilogram"
                      size={20}
                      color="black"
                    />
                    <Text>{pokemon.weight} Kg</Text>
                  </View>
                  <Text>Weight</Text>
                </View>
              )}
              {pokemon.height && (
                <View flex={1} alignItems="center" py={6}>
                  <View flexDirection="row" alignItems="center" gap={8}>
                    <MaterialCommunityIcons
                      name="human-male-height"
                      size={20}
                      color="black"
                    />
                    <Text>{pokemon.height} m</Text>
                  </View>
                  <Text>Height</Text>
                </View>
              )}
              {pokemon.move && (
                <View
                  flex={1}
                  alignItems="center"
                  py={6}
                  borderLeftWidth={1}
                  borderColor="grey"
                >
                  <View flexDirection="row" alignItems="center" gap={2}>
                    <MaterialIcons name="bolt" size={24} color="black" />
                    <Text>{unslugify(pokemon.move)}</Text>
                  </View>
                  <Text>Move</Text>
                </View>
              )}
            </View>
            <Text mb={10} bold>
              Feature:
            </Text>
            {pokemon.gender && (
              <View flexDirection="row" gap={16} mb={12}>
                <Text>Gender:</Text>
                <View flexDirection="row" gap={6}>
                  <Foundation name="male-symbol" size={24} color="#6c79db" />
                  <Text bold color="#6c79db">
                    {pokemon.gender.m}%
                  </Text>
                </View>
                <View flexDirection="row" gap={6}>
                  <Foundation name="female-symbol" size={24} color="#f0729f" />
                  <Text bold color="#f0729f">
                    {pokemon.gender.f}%
                  </Text>
                </View>
              </View>
            )}
            {pokemon.stats?.map((stat, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <View
                key={index}
                flexDirection="row"
                gap={12}
                mb={12}
                alignItems="center"
              >
                <Text width={124}>{unslugify(stat.name)}</Text>
                <Text color={stat.value > 50 ? '#48D0B0' : '#fb6c6c'}>
                  {stat.value}
                </Text>
                <StatusBar value={stat.value} />
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default memo(PokemonScreen);
