import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image } from 'react-native';
import { Font } from 'exponent';

class CardGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsLeft: null,
      character: null,
      attack: 0,
      defense: 0,
      luck: 0,
      attackPoints: 0,
      defensePoints: 0,
      luckPoints: 0,
      modifierConstant: 1,
      attackModifier: 0,
      defenseModifier: 0,
      luckModifier: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.level) {
      this.setState({pointsLeft: nextProps.user.level + 10});
    }
  }

  pressAttack() {
    let newValue;
    let newPointsLeft;
    if (this.state.pointsLeft > 0) {
      newValue = this.state.attackPoints + 1;
      newPointsLeft = this.state.pointsLeft - 1;
    } else if (this.state.pointsLeft === 0 && this.state.attackPoints > 0) {
      newValue = this.state.attackPoints - 1;
      newPointsLeft = this.state.pointsLeft + 1;
    } else {
      newValue = this.state.attackPoints;
      newPointsLeft = this.state.pointsLeft;
      Alert.alert('error');
    }
    this.setState({
      attackPoints: newValue,
      pointsLeft: newPointsLeft,
    });
  }

  pressDefense() {
    let newValue;
    let newPointsLeft;
    if (this.state.pointsLeft > 0) {
      newValue = this.state.defensePoints + 1;
      newPointsLeft = this.state.pointsLeft - 1;
    } else if (this.state.pointsLeft === 0 && this.state.defensePoints > 0) {
      newValue = this.state.defensePoints - 1;
      newPointsLeft = this.state.pointsLeft + 1;
    } else {
      newValue = this.state.defensePoints;
      newPointsLeft = this.state.pointsLeft;
      Alert.alert('error');
    }
    this.setState({
      defensePoints: newValue,
      pointsLeft: newPointsLeft,
    });
  }

  pressLuck() {
    let newValue;
    let newPointsLeft;
    if (this.state.pointsLeft > 0) {
      newValue = this.state.luckPoints + 1;
      newPointsLeft = this.state.pointsLeft - 1;
    } else if (this.state.pointsLeft === 0 && this.state.luckPoints > 0) {
      newValue = this.state.luckPoints - 1;
      newPointsLeft = this.state.pointsLeft + 1;
    } else {
      newValue = this.state.luckPoints;
      newPointsLeft = this.state.pointsLeft;
      Alert.alert('error');
    }
    this.setState({
      luckPoints: newValue,
      pointsLeft: newPointsLeft,
    });
  }

  // adjustStats() {
  //   this.setState({
  //     adjustedAttack: this.state.attack + this.state.attackModifier,
  //     adjustedDefense: this.state.defense + this.state.defenseModifier,
  //     adjustedLuck: this.state.luck + this.state.luckModifier,
  //   });
  // }

  submitPoints() {
    var attackModifier = this.generateModifier(this.state.attackPoints);
    var defenseModifier = this.generateModifier(this.state.defensePoints);
    var luckModifier = this.generateModifier(this.state.luckPoints);
    this.setState({
      attackModifier,
      defenseModifier,
      luckModifier,
      adjustedAttack: this.state.attack + attackModifier,
      adjustedDefense: this.state.defense + defenseModifier,
      adjustedLuck: this.state.luck + luckModifier,
    });
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
    console.log('CARD GAME PROPS', this.props);
    return (
      <View>
        <Text>
          This is the Card Game
        </Text>
        {this.state.pointsLeft !== null ?
        <View>
          <Text>
            User id: {this.props.user.char_id}
          </Text>
          <Text>
            Points to Spend: {this.state.pointsLeft}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.pressAttack()} style={styles.button}>
              <Text>Attack: {this.state.attackPoints}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pressDefense()} style={[styles.button, styles.middleButton]}>
              <Text>Defense {this.state.defensePoints}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pressLuck()} style={styles.button}>
              <Text>Luck {this.state.luckPoints}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.submitPoints()} style={styles.button}>
              <Text>Submit Points</Text>
            </TouchableOpacity>
          </View>
        </View>
        : null }
        {this.state.adjustedAttack ?
          <View>
            <View>
              <Text>Attack:{this.state.adjustedAttack} ({this.state.attack} + {this.state.attackModifier})  *{this.state.attackModifier/this.state.modifierConstant}/{this.state.attackPoints}*</Text>
              <Text>Defense:{this.state.adjustedDefense} ({this.state.defense} + {this.state.defenseModifier})  *{this.state.defenseModifier/this.state.modifierConstant}/{this.state.defensePoints}*</Text>
              <Text>Luck:{this.state.adjustedLuck} ({this.state.luck} + {this.state.luckModifier})  *{this.state.luckModifier/this.state.modifierConstant}/{this.state.luckPoints}*</Text>
            </View>
            <View>
              <Text>Attack:{this.state.adjustedAttack/this.state.modifierConstant}</Text>
              <Text>Defense:{this.state.adjustedDefense/this.state.modifierConstant}</Text>
              <Text>Luck:{this.state.adjustedLuck/this.state.modifierConstant}</Text>
            </View>
          </View>
        : null}
        {this.state.accumulator ?
        <View>
          <Text>{this.state.accumulator}</Text>
        </View>
        : null}


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
});

export default CardGame;