import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import { normalizePokemonsQueryResults } from 'helpers/index';
import { PokemonsQueryResultDataType, PokemonType } from 'types/pokemon';
import { GET_POKEMONS_QUERY, GET_POKEMON_QUERY } from '../../queries';

interface IContextProps {
  loading: boolean;
  pokemons: PokemonType[];
  pokemonLoading: boolean;
  pokemon: PokemonType | null;
  hasMorePages: boolean;
  // fetchPokemons: LazyQueryExecFunction<
  //   PokemonsQueryResultDataType,
  //   OperationVariables
  // >;
  fetchPokemon: LazyQueryExecFunction<
    PokemonsQueryResultDataType,
    OperationVariables
  >;
  fetchNextPage: () => void;
}

interface IPokemonProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

const RESULT_PER_PAGE = 24;

export const PokemonProvider: React.FC<IPokemonProviderProps> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);

  const { data, loading } = useQuery<PokemonsQueryResultDataType>(
    GET_POKEMONS_QUERY,
    { variables: { limit: RESULT_PER_PAGE, offset } },
  );

  const fetchNextPage = useCallback(
    () => setOffset((prev) => prev + RESULT_PER_PAGE),
    [],
  );

  // const [fetchPokemons, { data, loading }] =
  //   useLazyQuery<PokemonsQueryResultDataType>(GET_POKEMONS_QUERY, {
  //     variables: { limit: RESULT_PER_PAGE, offset },
  //   });

  // const fetchNextPage = useCallback(
  //   () => setOffset((prev) => prev + RESULT_PER_PAGE),
  //   [],
  // );

  const [fetchPokemon, { data: pokemonData, loading: pokemonLoading }] =
    useLazyQuery<PokemonsQueryResultDataType>(GET_POKEMON_QUERY);

  useEffect(() => {
    if (!!data && Array.isArray(data.results)) {
      setPokemons((prev) => [
        ...prev,
        ...normalizePokemonsQueryResults(data.results),
      ]);

      if (data.results.length < RESULT_PER_PAGE) {
        setHasMorePages(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!!pokemonData && Array.isArray(pokemonData.results)) {
      setPokemon(
        normalizePokemonsQueryResults(pokemonData.results)?.[0] ?? null,
      );
    }
  }, [pokemonData]);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          loading,
          pokemon,
          pokemons,
          pokemonLoading,
          hasMorePages,
          // fetchPokemons,
          fetchPokemon,
          fetchNextPage,
        }),
        [
          loading,
          pokemon,
          pokemons,
          pokemonLoading,
          hasMorePages,
          // fetchPokemons,
          fetchPokemon,
          fetchNextPage,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const usePokemon = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usePokemonHook must be within PokemonProvider');
  }

  return context;
};