import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image } from 'react-native';
import { Font } from 'exponent';
import socket from '../socket/socket';
import BattleGameCreate from './BattleGameCreate';

class BattleGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: this.props.points,
      modifierConstant: 1,
      attack: null,
      defense: null,
    };
  }
  generateModifier(coins) {
    // Modifiers are created by number of 'coin flips'
    var numHeads = 0;
    for(var i = 0; i < coins; i++) {
      var isHeads = Math.round(Math.random());
      if (isHeads) {
        numHeads++;
      }
    }
    var modifierValue = numHeads * this.state.modifierConstant;
    return modifierValue;
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          style={styles.modal}
        >
        <View style={styles.createQuest}>
          <BattleGameCreate onSubmitQuest={this.props.onSubmitQuest} user={this.props.user} lat={this.props.lat} lng={this.props.lng} />
        </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
  },
});

export default BattleGame;