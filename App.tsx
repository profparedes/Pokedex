/* eslint-disable react/style-prop-object */
import { ApolloProvider } from '@apollo/client';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PokemonProvider } from 'contexts/PokemonContext';
import { PokemonTCGProvider } from 'contexts/PokemonTCGContext';
import MainRoutes from 'routes/index';
import GraphQLClient from 'services/Apollo';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <ApolloProvider client={GraphQLClient}>
          <PokemonProvider>
            <PokemonTCGProvider>
              <MainRoutes />
              <StatusBar style="auto" />
            </PokemonTCGProvider>
          </PokemonProvider>
        </ApolloProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

export default App;
