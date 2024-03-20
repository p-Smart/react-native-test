import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';

const Touchable = () => {
  const [rippleColor, setRippleColor] = useState(randomHexColor());
  return (
      <TouchableNativeFeedback
      style={styles.container}
        onPress={() => {
          setRippleColor(randomHexColor());
        }}
        background={TouchableNativeFeedback.Ripple(
          rippleColor,
          false,
        )}>
        <View style={styles.touchable}>
          <Text style={styles.text}>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>
  );
};

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function () {
    return Math.round(Math.random() * 16).toString(16);
  });
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  touchable: {borderColor: 'black', borderWidth: 1},
  text: {alignSelf: 'center'},
});

export default Touchable;