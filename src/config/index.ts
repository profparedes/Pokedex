import {
  API_GRAPHQL_BASE_URL,
  API_POKEMONTCG_BASE_URL,
  API_SPRITES_BASE_URL,
} from '@env';

const config = {
  services: {
    pokeApi: {
      baseURL: API_GRAPHQL_BASE_URL || 'https://beta.pokeapi.co/graphql/v1beta',
    },
    sprites: {
      baseURL:
        API_SPRITES_BASE_URL ||
        'https://raw.githubusercontent.com/PokeAPI/sprites/master',
    },
    tradingCardApi: {
      baseURL: API_POKEMONTCG_BASE_URL || 'https://api.pokemontcg.io/v2/cards',
    },
  },
};

export default config;
