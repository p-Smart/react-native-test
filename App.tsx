import UsersView from './src/screens/Users';
import DeviceInfo from 'react-native-device-info';
import { Alert, Platform, StatusBar } from 'react-native';
import { useEffect } from 'react';
import { primary } from './src/theme/palette';
import Test from './src/screens/Test';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from './src/components/Layout';
import Toast from 'react-native-toast-message';
import log from './src/utils/log';


const Stack = createNativeStackNavigator();



const App = () => {
  const deviceId = DeviceInfo.getUniqueIdSync()
  const batteryLevel = DeviceInfo.getBatteryLevelSync()
  const appName = DeviceInfo.getApplicationName()
  log(batteryLevel)

  // log('Device Id', deviceId)
  // log('Battery Level', batteryLevel)
  // log('App Name', appName)

  const showAlert = () => {
    Alert.alert(
      'Title',
      'Message',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  useEffect( () => {
    Platform.OS==='android' && SplashScreen.hide()
  }, [] )
  

  return (
    <>
    <StatusBar backgroundColor={primary.main} />

    <NavigationContainer>
    <Layout>
    <Stack.Navigator 
    screenOptions={{headerShown: false}}
    initialRouteName='home'
    >
    <Stack.Screen 
    name={'home'}
    component={UsersView}
    />

    <Stack.Screen 
    name={'test'}
    component={Test}
    options={{animation: 'slide_from_left'}}
    />
    </Stack.Navigator>
    </Layout>
    </NavigationContainer>

    <Toast
    visibilityTime={5000}
    position='bottom'
    />
    </>
  )
};

export default App;