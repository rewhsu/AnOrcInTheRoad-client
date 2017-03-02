import React from 'react';
import Exponent, {
  Accelerometer,
} from 'exponent';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {},
    isOnCooldown: false,
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
    Accelerometer.setUpdateInterval(1000);
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener((result) => {
      this.setState({accelerometerData: result});
      // this.zing(result.x, result.y, result.z);
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  zing(x, y, z) {
    const minimumValue = 3;
    if (this.state.isOnCooldown) {
      console.log('isOnCooldown');
    } else {
      if (x > minimumValue || y > minimumValue || z > minimumValue) {
        Alert.alert('x: ' + x.toString() + 'y: ' + y.toString() + 'z: ' + z.toString());
        this.setState({isOnCooldown: true});
        this.props.onZing(this.props.user.char_id);
        console.log('zing sent', this.props.user.char_id)
        setTimeout(() => this.setState({isOnCooldown: false}), 5000);
      }
    }
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;
    return (
      <View style={styles.sensor}>
        <Text>Accelerometer:</Text>
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

Exponent.registerRootComponent(AccelerometerSensor);

export default AccelerometerSensor;