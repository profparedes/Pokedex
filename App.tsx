/* eslint-disable react/style-prop-object */
import { config, GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainRoutes from 'routes/index';

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <MainRoutes />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
