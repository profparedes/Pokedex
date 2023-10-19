import config from 'config/index';
import { PokemonType, PokemonsQueryResultArrayType } from 'types/pokemon';

export const unslugify = (slug: string): string =>
  slug
    .split('-')
    .map((i) => `${i[0].toLocaleUpperCase()}${i.substring(1)}`)
    .join(' ');

const calcFemaleGenderRatePercent = (value: number): number => {
  let result = (value / 8) * 100;
  if (result > 100) result = 100;
  if (result < 0) result = 0;
  return result;
};

const calcMaleGenderRatePercent = (value: number): number => {
  let result = (value / 8) * 100;
  if (result > 100) result = 100;
  if (result < 0) result = 0;
  return result;
};

export const normalizePokemonsQueryResults = (
  results: PokemonsQueryResultArrayType[],
): PokemonType[] =>
  results.map((item) => ({
    id: item.id,
    pokedexIndex: `#${String(item.id).padStart(3, '0')}`,
    name: item.name,
    height: item.height ? item.height / 10 : undefined,
    weight: item.weight ? item.weight / 10 : undefined,
    color: item.specy.color.name,
    gender: {
      m: item.specy.has_gender_differences
        ? calcMaleGenderRatePercent(item.specy.gender_rate ?? 10)
        : 100,
      f: item.specy.has_gender_differences
        ? calcFemaleGenderRatePercent(item.specy.gender_rate ?? 10)
        : 0,
    },
    types: item.types.data.map((t) => t.type.name),
    image:
      `${JSON.parse(item?.images[0]?.sprites)?.other?.['official-artwork']
        ?.front_default}`.replace('/media', config.services.sprites.baseURL) ??
      null,
    pixelImage:
      `${JSON.parse(item?.images[0]?.sprites)?.front_default}`.replace(
        '/media',
        config.services.sprites.baseURL,
      ) ?? null,
    description: item.specy?.descriptions?.[0]?.text ?? undefined,
    move: item.moves?.[0]?.move?.name ?? undefined,
    stats:
      item.stats?.map((s) => ({ name: s.stat.name, value: s.value })) ??
      undefined,
  }));

export const pokemonColors = {
  black: {
    background: '#000000',
    text: '#FFF',
    name: '#FFF',
  },
  blue: {
    background: '#77BDFE',
    text: '#4689C7',
    name: '#FFF',
  },
  brown: {
    background: '#CE8083',
    text: '#9B4043',
    name: '#FFF',
  },
  gray: {
    background: '#393332',
    text: '#FFF',
    name: '#FFF',
  },
  green: {
    background: '#48D0B0',
    text: '#3E8570',
    name: '#FFF',
  },
  pink: {
    background: '#F2CDD6',
    text: '#CE8083',
    name: '#FFF',
  },
  purple: {
    background: '#A499C1',
    text: '#575176',
    name: '#FFF',
  },
  red: {
    background: '#FB6C6C',
    text: '#DE5050',
    name: '#FFF',
  },
  white: {
    background: '#FFFFFF',
    text: '#000',
    name: '#000',
  },
  yellow: {
    background: '#FFCE4B',
    text: '#BF8400',
    name: '#FFF',
  },
};
