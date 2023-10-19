import { memo } from 'react';
import { Image, Text, View } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { unslugify } from 'helpers/index';
import { PokemonType } from 'types/pokemon';

interface IPokemonCardProps {
  pokemon: PokemonType;
  onPress: () => void;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{unslugify(pokemon.name)}</Text>
        <Text alignSelf="flex-end">{pokemon.pokedexIndex}</Text>
        {pokemon.pixelImage && (
          <Image source={{ uri: pokemon.pixelImage }} alt={pokemon.name} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(PokemonCard);
