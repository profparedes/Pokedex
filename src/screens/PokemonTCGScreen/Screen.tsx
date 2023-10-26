import { memo, useState } from 'react';
import { FlatList, Image, ScrollView, View } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { usePokemonTCG } from 'contexts/PokemonTCGContext';
import { PokemonStackParamListType } from 'routes/PokemonViewRouter';

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

  return (
    <ScrollView backgroundColor="#000" py={20}>
      <FlatList
        data={cards}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardClick(String(item.id))}>
            <View ml={10} mb={10}>
              <Image
                alt={String(item.id)}
                style={{
                  width: selectedCard === String(item.id) ? 360 : 180,
                  height: selectedCard === String(item.id) ? 520 : 260,
                }}
                source={{ uri: item.images.small }}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(card) => String(card.id)}
      />
    </ScrollView>
  );
};

export default memo(PokemonTCGScreen);
