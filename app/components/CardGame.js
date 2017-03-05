import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image } from 'react-native';
import { Font } from 'exponent';
import socket from '../socket/socket';
import CardGameRoundContainer from '../containers/CardGameRoundContainer';
import CardGameResults from './CardGameResults';

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
      hp: {
        team1: 10,
        team2: 10,
      },
      roomInput: null,
      team: 1,
      team1Results: null,
      team2Results: null,
    };
  }

  componentDidMount() {
    this.generateRounds();
    socket.emit('get room results', this.props.room);
    socket.emit('get room members', this.props.room);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.level !== this.props.user.level) {
      this.setState({pointsLeft: nextProps.user.level + 10});
    }
    if (nextProps.roomGameData !== this.props.roomGameData) {
      this.calculateWinner(nextProps.roomGameData);
      this.setState({roomGameData: nextProps.roomGameData });
    }
    if (nextProps.roomMembersData !== this.props.roomMembersData) {
      this.setState({roomMembersData: nextProps.roomMembersData });
    }
    if (nextProps.team != this.props.team) {
      this.setState({ team: nextProps.team });
    }
  }

  calculateWinner(gameData) {
    console.log('CALCULATE WINNER gamedata', gameData);
    // gameData.forEach((item) => {
    //   console.log('WINNER', item);
    // });
    var team1 = gameData.filter((entry) => {
      return entry.team === '1';
    });
    var team2 = gameData.filter((entry) => {
      return entry.team === '2';
    });
    var t1r1 = team1.filter((entry) => {
      return entry.round === 1;
    }).reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t1r2 = team1.filter((entry) => {
      return entry.round === 2;
    }).reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t1r3 = team1.filter((entry) => {
      return entry.round === 3;
    }).reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t2r1 = team2.filter((entry) => {
      return entry.round === 1;
    }).reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t2r2 = team2.filter((entry) => {
      return entry.round === 1;
    }).reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t2r3 = team2.filter((entry) => {
      return entry.round === 1;
    }).reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t1sum = team1.reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t2sum = team2.reduce(function(acc, curr) {
      return {
        attack: acc.attack + curr.attack,
        defense: acc.defense + curr.defense,
      };
    }, { attack: 0, defense: 0 });
    var t1r1Net = t1r1.attack - t2r1.defense;
    var t1r2Net = t1r2.attack - t2r2.defense;
    var t1r3Net = t1r3.attack - t2r3.defense;
    var t2r1Net = t2r1.attack - t1r1.defense;
    var t2r2Net = t2r2.attack - t1r2.defense;
    var t2r3Net = t2r3.attack - t1r3.defense;
    console.log('T1: ', t1sum, 'T2: ', t2sum);
    this.setState({
      t1r1,
      t2r1,
      t1r2,
      t2r2,
      t1r3,
      t2r3,
      t1r1Net,
      t1r2Net,
      t1r3Net,
      t2r1Net,
      t2r2Net,
      t2r3Net,
      team1Results: t1sum,
      team2Results: t2sum,
    });
  } 

  generateRounds() {
    var rounds = [];
    for(var i = 0; i < this.props.rounds; i++) {
      rounds.push(<CardGameRoundContainer team={this.props.team}/>);
    }
    return(
      <View>
        {rounds}
      </View>
    );
  }

  toggleTeam() {
    if (this.props.team === 1) {
      this.props.setTeam(2);
      // socket.emit('toggle team', this.props.user.char_id, this.props.roomId, 2);
    } else {
      this.props.setTeam(1);
      // socket.emit('toggle team', this.props.user.char_id, this.props.roomId, 1);
    }
  }

  setRoom(roomId) {
    this.props.setRoom(roomId);
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

  updateHp() {
    this.setState({
      hp: {
        team1: this.state.hp.team1 - 1,
        team2: this.state.hp.team2 - 1,
      }
    });
    socket.emit('update team hp', this.props.room, this.state.hp.team1, this.state.hp.team2);
  }

  joinRoom() {
    for(var i = 0; i < this.state.roomMembersData.length; i++) {
      if (this.state.roomMembersData[i].character_id === this.props.user.char_id && this.state.roomMembersData[i].room_id === this.state.roomInput.toString()) {
        Alert.alert('Already Joined Room');
        return false;
      }
      console.log(this.state.roomMembersData[i], this.props.user.char_id, this.state.roomInput);
    }
    socket.emit('join room', this.props.user.char_id, this.state.roomInput, this.state.team);
  }

  setTeam(num) {
    this.setState({ team: num });
  }

  pressUpdateRoom() {
    socket.emit('get round results', this.props.room);
  }

  getRoomMembers(roomId) {
    socket.emit('get room members', roomId);
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

  // joinTheRoom() {
  //   socket.emit('join room', this.state.roomInput);
  // }

  // sendToAll() {
  //   socket.emit('send to all', this.state.roomInput);
  // }

  getResults() {
    socket.emit('get room results', this.props.room);
  }

  render() {
    var rounds = [];
    for(var i = 1; i <= this.props.rounds; i++) {
      rounds.push(<CardGameRoundContainer round={i} team={this.props.team}/>);
    }
    console.log('CARD GAME PROPS', this.props);
    return (
      <View>
        <Text>
          This is the Card Game
        </Text>
        <Text>
          Room Id: {this.props.room}
        </Text>    
        <Text>
          Rounds: {this.props.rounds}
        </Text>
        <Text>
          Team: {this.props.team} 
        </Text>
        <Text>
          Team 1:
        </Text>
        {this.props.room ?
          <View>
            <Text>Team Totals</Text>
            <CardGameResults roomGameData={this.state.team1Results} />
            <CardGameResults roomGameData={this.state.team2Results} />                      
            <Text>Round 1:</Text>
            <CardGameResults roomGameData={this.state.t1r1} />
            <CardGameResults roomGameData={this.state.t2r1} />
            <Text>Team 1 Power:</Text>
            <CardGameResults roomGameData={this.state.t1r1Net} />
            <Text>Team 2 Power:</Text>
            <CardGameResults roomGameData={this.state.t2r1Net} />
            <Text>Round 2:</Text>
            <CardGameResults roomGameData={this.state.t1r2} />
            <CardGameResults roomGameData={this.state.t2r2} />
            <Text>Team 1 Power:</Text>
            <CardGameResults roomGameData={this.state.t1r2Net} />
            <Text>Team 2 Power:</Text>
            <CardGameResults roomGameData={this.state.t2r2Net} />
            <Text>Round 3:</Text>            
            <CardGameResults roomGameData={this.state.t1r3} />
            <CardGameResults roomGameData={this.state.t2r3} />
            <Text>Team 1 Power:</Text>
            <CardGameResults roomGameData={this.state.t1r3Net} />
            <Text>Team 2 Power:</Text>
            <CardGameResults roomGameData={this.state.t2r3Net} />
          </View>
        : null}
        <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ roomInput: text })}
            placeholder="Room Name"
            value={this.state.roomInput}
            maxLength = {60}
            autoCorrect = {false}
            returnKeyType = {'done'}
        />  
        <View>
          <TouchableOpacity onPress={() => this.setRoom(this.state.roomInput)} style={styles.button}>
            <Text>Set Room</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleTeam()} style={styles.button}>
            <Text>Toggle Team</Text>
          </TouchableOpacity>
        </View>
        <Text>
          User id: {this.props.user.char_id}
        </Text>
        {rounds}
        <TouchableOpacity onPress={() => this.updateHp()} style={styles.button}>
          <Text>Update Room</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.getResults()} style={styles.button}>
          <Text>Get Results</Text>
        </TouchableOpacity>
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

export default CardGame;