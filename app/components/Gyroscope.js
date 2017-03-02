import React from 'react';
import Exponent, {
  Gyroscope,
} from 'exponent';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

class GyroscopeSensor extends React.Component {
  state = {
    gyroscopeData: {},
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  }

  _fast = () => {
    Gyroscope.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Gyroscope.addListener((result) => {
      this.setState({gyroscopeData: result});
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    let { x, y, z } = this.state.gyroscopeData;
    var largest = 'x';
    let minimumValue = 6;
    if (y > largest) {
      largest = 'y';
    }
    if (z > largest) {
      largest = 'z';
    }
    if (round(x) > minimumValue) {
      Alert.alert('Rotated on x!');
    }
    if (round(y) > minimumValue) {
      Alert.alert('Rotated on y!');
    }
    if (round(z) > minimumValue) {
      Alert.alert('Rotated on z!');
    }

    return (
      <View style={styles.sensor}>
        <Text>Gyroscope:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});

Exponent.registerRootComponent(GyroscopeSensor);

export default GyroscopeSensor;
