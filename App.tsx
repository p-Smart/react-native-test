import UsersView from './views/Users';
import log from './utils/log';
import DeviceInfo from 'react-native-device-info';
import { Alert, StatusBar } from 'react-native';
import { useEffect } from 'react';
import waitForTimeout from './utils/waitForTimeout';
import { primary } from './theme/palette';

const App = () => {
  const deviceId = DeviceInfo.getUniqueIdSync()
  const batteryLevel = DeviceInfo.getBatteryLevelSync()
  const appName = DeviceInfo.getApplicationName()

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
    // waitForTimeout(5000, showAlert)
  }, [] )
  

  return (
    <>
    <StatusBar backgroundColor={primary.main} />
    <UsersView />
    </>
  )
};

export default App;