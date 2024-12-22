import { StatusBar, Text, View } from 'react-native';
import {useFonts, Roboto_700Bold, Roboto_400Regular} from '@expo-google-fonts/roboto'

export default function App() {

  const [fontsLoad] = useFonts({ Roboto_700Bold, Roboto_400Regular })
  return (
    <View >
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoad ? <Text>Home</Text> : <View /> }
    </View>
  );
}

