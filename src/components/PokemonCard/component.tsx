import { memo } from 'react';
import { Image, Text, View } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { pokemonColors, unslugify } from 'helpers/index';
import { PokemonType } from 'types/pokemon';

interface IPokemonCardProps {
  pokemon: PokemonType;
  onPress: () => void;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon, onPress }) => {
  const colors =
    pokemonColors?.[pokemon.color as keyof typeof pokemonColors] ||
    pokemonColors.black;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        w="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth="$4"
        borderBlockColor={colors.background}
        px="$4"
        mb={30}
      >
        {pokemon.pixelImage && (
          <Image source={{ uri: pokemon.pixelImage }} alt={pokemon.name} />
        )}
        <Text
          fontSize="$3xl"
          lineHeight="$3xl"
          bold
          color="$black"
          alignSelf="center"
        >
          {unslugify(pokemon.name)}
        </Text>
        <Text fontSize="$xl" bold>
          {pokemon.pokedexIndex}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PokemonCard);
