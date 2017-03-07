import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image } from 'react-native';
import { Font } from 'exponent';

const styles = StyleSheet.create({
  counter: {
    height: 40,
    width: 40,
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('luminari'),
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
});

class QuickDrawCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 3,
    };
  }

  componentDidMount() {
    this.initializeCountdown();
  }

  initializeCountdown() {
    const context = this;
    var intervalId = setInterval(() => {
      if (context.state.counter > 1) {
        context.setState({counter: context.state.counter - 1});
      } else {
        context.setState({counter: 'READY!!!!'});
        clearInterval(intervalId);
      }
    }, 1000);
    // context.setState({counter: context.state.counter - 1});
    // setTimeout(() => console.log('counter', context.state.counter));
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={styles.mainButtonReactGray} >
          <Text style={styles.buttonText}>
            {this.state.counter}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default QuickDrawCounter;