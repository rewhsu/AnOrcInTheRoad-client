import React from 'react';
import Exponent, {
  Font,
  Accelerometer,
} from 'exponent';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import QuickDrawCounter from './QuickDrawCounter';

class QuickDraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accelerometerData: {},
      questType: 'addQuickDrawQuest',
      startTime: null,
      endTime: null,
      gameStarted: false,
      countdownStarted: false,
      timerStarted: false,
      gameFinished: false,
      triggerAlert: false,
      zingFault: false,
      accelRegisterMagnitude: 2,
      result: null,
      zingLegit: false,
      modalVisible: false,
      roundFinished: false,
    };
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentWillReceiveProps(nextProps) {
  }

  _toggle() {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow() {
    Accelerometer.setUpdateInterval(1000);
  }

  _fast() {
    Accelerometer.setUpdateInterval(32);
  }

  _subscribe() {
    this._subscription = Accelerometer.addListener((result) => {
      this.setState({accelerometerData: result});
      let largest = Math.abs(Math.max(result.x, result.y, result.z));
      this.checkZing(largest);
    });
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  alertTimer() {
    this.setState({ zingFault: true });
    Alert.alert('You have failed, wait until timer starts');
  }

  checkButton() {
    if (this.state.timerStarted) {
      this.registerZing(false);
    } else {
      this.alertTimer();
    }
  }

  checkZing(largest) {
    if(this.state.timerStarted) {
      if (largest >= this.state.accelRegisterMagnitude) {
        this.registerZing();
      }
    } else if (largest >= this.state.accelRegisterMagnitude) {
      this.alertTimer();
    }
  }

  registerZing(legit) {
    this.addEndTime(legit);
    if (this._subscription) {
      this._toggle();
    }
  }

  startCountdown() {
    const context = this;
    this._unsubscribe();
    context.setState({
      gameStarted: true,
      countdownStarted: true,
      timerStarted: false,
    });
    setTimeout(() => {
     context.validateCountdown();
    }, 3000)
  }

  validateCountdown() {
    if (!this.state.zingFault) {
      this.startRandomTimeout(3000);
    } else {
      this.resetState();
    }
  }

  startRandomTimeout(maxTimeout) {
    this.setState({
      countdownStarted: false,
      timeoutStarted: true,
    });
    const context = this;
    const randomDelay = Math.random() * maxTimeout;
    setTimeout(() =>  {
      context.addStartTime();
    }, randomDelay);
  }

  addStartTime() {
    const date = Date.now();
    const startTimestamp = date;
    if (!this._subscription) {
      this._toggle();
    }
    this.setState({
      startTime: startTimestamp,
      timerStarted: true,
      timeoutStarted: false,
    });
    console.log('startTimestamp', startTimestamp);
  }

  addEndTime(legit) {
    const date = Date.now();
    const endTimestamp = date;
    this.setState({
      timerStarted: false,
    });
    this.validateReactionTime(endTimestamp, legit);
  }

  validateReactionTime(endTime, legit) {
    var duration = endTime - this.state.startTime;
    var result;
    if (endTime === null || duration < 0) {
      Alert.alert('Invalid Time');
      return;
    } else {
      result = parseInt(endTime) - parseInt(this.state.startTime);
      this.setState({
        endTime: endTime,
        gameFinished: true,
        zingLegit: legit,
        result,
      });
      Alert.alert('Your speed was: ' + result);
    }
  }

  resetState() {
    this.setState({
      accelerometerData: {},
      startTime: null,
      endTime: null,
      gameStarted: false,
      timerStarted: false,
      triggerAlert: false,
      countdownStarted: false,
      zingFault: false,
      gameFinished: false,
      result: null,
      zingLegit: false,
    });
    this._unsubscribe();
  }

  round(n) {
    if (!n) {
      return 0;
    }

    return Math.floor(n * 100) / 100;
  }

  saveScoreAndClose() {
    this.props.saveScore(this.state.result);
    this.setModalVisible(false);
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;
    // let activeStyle = this.setBackgroundColor();

    return (
      <View style={styles.container}>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          style={styles.modal}
        >
          <ScrollView contentContainerStyle={styles.modal}>

          <View style={styles.sensor}>
            <View style={styles.container}>
              <Text style={styles.heading}>
                {this.state.result}
              </Text>
              {!this.state.gameStarted && !this.state.countdownStarted ?
              <TouchableHighlight onPress={() => this.startCountdown()} style={styles.mainButtonGreen} >
                <Text style={styles.buttonText}>Start Countdown</Text>
              </TouchableHighlight>
              : null}
              {this.state.countdownStarted ?
                <QuickDrawCounter />
              : null}
              {!this.state.countdownStarted && !this.state.timerStarted && this.state.gameStarted && !this.state.gameFinished ?
              <TouchableHighlight onPress={() => this.startCountdown()} style={styles.mainButtonReactGray} >
                <Text style={styles.buttonText}>Ready...</Text>
              </TouchableHighlight>
              : null}
              {this.state.timerStarted ?
              <TouchableHighlight onPress={() => this.checkButton()} style={styles.mainButtonReact} >
                <Text style={styles.buttonText}>Swing!</Text>
              </TouchableHighlight>
              : null}
              {this.state.gameFinished ?
              <View>      
                <TouchableHighlight onPress={() => this.resetState()} style={styles.mainButtonReset} >
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.saveScoreAndClose()} style={styles.mainButtonGreen} >
                  <Text style={styles.buttonText}>Save Score</Text>
                </TouchableHighlight>
              </View>
              : null}
            </View>
          </View>
        {/*<TouchableHighlight onPress={() => this.submitQuest()} style={styles.closeButton} >
            <Text style={styles.buttonText}>Submit Quest</Text>
        </TouchableHighlight>*/}
        <TouchableHighlight onPress={() => this.setModalVisible(false)} style={styles.closeButton} >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableHighlight>
        </ScrollView>
      </Modal>
      <View>
        <TouchableHighlight onPress={() => this.setModalVisible(true)} style={styles.mainButtonGreen}>
          <Text style={styles.buttonText}>Start Quick Draw</Text>
        </TouchableHighlight>
      </View>
    </View>

    );
  }
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
  mainButtonGreen: {
    backgroundColor: '#0eb27e',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonReactGray: {
    backgroundColor: '#333',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonReact: {
    backgroundColor: '#0eb27e',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonReset: {
    backgroundColor: '#333',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('luminari'),
  },
  heading: {
    ...Font.style('luminari'),
    fontSize: 40,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  closeButton: {
    backgroundColor: '#333',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuickDraw;