import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image } from 'react-native';
import { Font } from 'exponent';

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
        <Text>
          {this.state.counter}
        </Text>
      </View>
    );
  }
}

export default QuickDrawCounter;