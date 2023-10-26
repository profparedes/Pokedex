import { memo, useCallback, useState } from 'react';
import { Image, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, TouchableOpacity } from 'react-native';
import { usePokemonTCG } from 'contexts/PokemonTCGContext';
import { PokemonStackParamListType } from 'routes/PokemonViewRouter';
import { PokemonTCGCardType } from 'types/pokemonTCG';

type PokemonTCGScreenType = NativeStackScreenProps<
  PokemonStackParamListType,
  'PokemonTCG'
>;

const PokemonTCGScreen: React.FC<PokemonTCGScreenType> = () => {
  const { cards } = usePokemonTCG();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (cardId: string) => {
    if (selectedCard === cardId) {
      setSelectedCard(null);
    } else {
      setSelectedCard(cardId);
    }
  };

  const renderItem = useCallback(
    ({ item, index }: { item: PokemonTCGCardType; index: number }) => (
      <TouchableOpacity
        onPress={() => handleCardClick(String(item.id))}
        style={{
          zIndex: selectedCard === String(item.id) ? 1 : 0,
          height: 260,
          width: 180,
        }}
      >
        <View>
          <Image
            alt={String(item.id)}
            width={selectedCard === String(item.id) ? 360 : 180}
            height={selectedCard === String(item.id) ? 520 : 260}
            position="absolute"
            top={0}
            {...(index % 2 === 0 ? { left: 0 } : { right: 0 })}
            source={{ uri: item.images.small }}
          />
        </View>
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCard],
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingVertical: 20,
        backgroundColor: '#000',
      }}
      data={cards}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 10 }}
      renderItem={renderItem}
      keyExtractor={(card) => String(card.id)}
    />
  );
};

export default memo(PokemonTCGScreen);
