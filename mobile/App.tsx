import { StatusBar, View } from 'react-native';
import {useFonts, Roboto_700Bold, Roboto_400Regular} from '@expo-google-fonts/roboto'
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Loading } from './src/components/Loading';

export default function App() {

  const [fontsLoad] = useFonts({ Roboto_700Bold, Roboto_400Regular })
  return (
    <GluestackUIProvider config={config} >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      
      {fontsLoad ? (
        <Center flex={1} bg="$gray700">
          <Text>Home</Text>
        </Center>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  );
}

