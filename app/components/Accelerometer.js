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
import QuickDrawCounter from './QuickDrawCounter';

class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {},
    isOnCooldown: false,
    startTime: null,
    endTime: null,
    timerStarted: false,
    triggerAlert: false,
    initCountdown: false,
    accelerometerOffset: {},
    enableAccelerometerOffset: false,
    zingFault: false,
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
    Accelerometer.setUpdateInterval(32);
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener((result) => {
      this.setState({accelerometerData: result});
      let largest = Math.abs(Math.max(result.x, result.y, result.z));
      this.checkZing(largest);
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  alertTimer = () => {
    this.setState({zingFault: true});
    Alert.alert('You have failed, wait until timer starts');
  }

  checkButton = () => {
    if (this.state.timerStarted) {
      this.registerZing();
    } else {
      this.alertTimer();
    }
  }

  checkZing = (largest) => {
    if(this.state.timerStarted) {
      if (largest >= 2) {
        this.registerZing();
      }
    } else if (largest >= 2) {
      this.alertTimer();
    }
  }

  registerZing = () => {
    this.addEndTime();
    if (this._subscription) {
      this._toggle();
    }
  }

  startCountdown = () => {
    const context = this;
    // this.recalibrateAccel();
    if (!this._subscription) {
      this._toggle();
    }
    context.setState({
      initCountdown: true,
      timerStarted: false,
    })
    setTimeout(() => {
     context.validateCountdown();
    }, 3000)
  }

  validateCountdown = () => {
    if (!this.state.zingFault) {
      this.startRandomTimeout(3000);
    } else {
      // Alert.alert('you suck');
      this.resetState();
    }
  }

  startRandomTimeout = (maxTimeout) => {
    const context = this;
    const randomDelay = Math.random() * maxTimeout;
    console.log('DELAYY', randomDelay);
    setTimeout(() =>  {
      console.log('in settimeout');
      context.addStartTime();
    }, randomDelay);
  }

  addStartTime = () => {
    const date = Date.now();
    const startTimestamp = date;
    if (!this._subscription) {
      this.toggle();
    }
    this.setState({
      startTime: startTimestamp,
      timerStarted: true,
    });
    console.log('startTimestamp', startTimestamp);
  }

  addEndTime = () => {
    const date = Date.now();
    const endTimestamp = date;
    console.log('END TIMESTAMP', endTimestamp);
    this.setState({
      endTime: endTimestamp,
      timerStarted: false,
      // triggerAlert: true,
      initCountdown: false,
    });
    this.validateReactionTime(endTimestamp);
  }

  validateReactionTime = (endTime) => {
    var duration = endTime - this.state.startTime;
    if (endTime === null || duration < 0) {
      Alert.alert('YOU DUN FUCKED UP -1000 POINTS');
      // this.resetState();
      return;
    } else {
      Alert.alert('Your speed was: ' + (parseInt(endTime) - parseInt(this.state.startTime)));
    }
  }

  resetState = () => {
    this.setState({
      accelerometerData: {},
      isOnCooldown: false,
      startTime: null,
      endTime: null,
      timerStarted: false,
      triggerAlert: false,
      initCountdown: false,
      zingFault: false,
    });
    this._unsubscribe();
  }

  // recalibrateAccel = (accelData) => {
  //   this.setState({
  //     enableAccelerometerOffset: true,
  //     accelerometerOffset: { 
  //       x: accelData.x,
  //       y: accelData.y,
  //       z: accelData.z,
  //     },
  //   })
  // }

  // toggleAccelOffset = () => {
  //   this.setState({
  //     enableAccelerometerOffset: !this.state.enableAccelerometerOffset,
  //   })
  // }

  setBackgroundColor = () => {
    if (this.state.timerStarted) {
      activeStyle = {
        backgroundColor: 'green',
      }
    } else {
      activeStyle = {
        backgroundColor: 'white',
      }
    }
    return activeStyle;
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;
    let activeStyle = this.setBackgroundColor();
    return (
      <View style={styles.sensor}>
        <View style={activeStyle}>
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
          {this.state.initCountdown ?
            <QuickDrawCounter />
          : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.startCountdown} style={styles.button}>
              <Text>Start Timer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.checkButton} style={styles.button}>
              <Text>React</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {/*<TouchableOpacity onPress={() => this.recalibrateAccel(this.state.accelerometerData)} style={styles.button}>
              <Text>Recalibrate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleAccelOffset} style={styles.button}>
              <Text>Reset Accel Offset</Text>
            </TouchableOpacity>*/}
          </View>
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