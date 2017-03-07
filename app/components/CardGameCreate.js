import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, ScrollView, Slider, Picker, Image, TouchableOpacity } from 'react-native';
import { Font } from 'exponent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 30,
    fontWeight: '300',
  },
  heading2: {
    fontSize: 20,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '100',
    color: 'gray',
  },
  label: {
    marginLeft: 20,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: '200',
  },
  image: {
    width: 100,
    height: 100,
  },
  group: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Font.style('luminari'),
  },
  addButton: {
    backgroundColor: '#701616',
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
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
  buttonText: {
    color: '#FAFAFA',
    fontSize: 25,
    fontWeight: '600',
    ...Font.style('luminari'),
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
  },
  modal: {
    paddingTop: 80,
    paddingBottom: 50,
  },
  picker: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    marginBottom: 20,
    marginLeft: 20,
  },
});

class CardGameCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      roomInput: null,
      showCreate: true,
      cardCreateVisible: true,
      team: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedImage !== this.props.selectedImage) {
      this.setState({
        selectedImage: nextProps.selectedImage,
      });
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setRoom(roomId) {
    this.props.setRoom(roomId);
  }

  setTeam(team) {
    this.setState({ team: team });
  }
  //   toggleTeam() {
  //   if (this.props.team === 1) {
  //     this.props.setTeam(2);
  //     // socket.emit('toggle team', this.props.user.char_id, this.props.roomId, 2);
  //   } else {
  //     this.props.setTeam(1);
  //     // socket.emit('toggle team', this.props.user.char_id, this.props.roomId, 1);
  //   }
  // }

  handleCreateOrClose() {
    this.setState({ cardCreateVisible: false });
  }


  render() {
    let showCreate = false;
    if (this.state.showCreate) {
      showCreate = true;
    }
    return (
      <View style={styles.container}>
        {showCreate ?
        <ScrollView contentContainerStyle={styles.modal}>
          <Text style={styles.title}>Join A Room</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ roomInput: text })}
            placeholder="Room Name"
            value={this.state.roomInput}
            maxLength = {60}
            autoCorrect = {false}
            returnKeyType = {'done'}
          />
          <TextInput
            style={styles.input}
            onChangeText={(rounds) => this.setState({ rounds })}
            placeholder="Rounds"
            value={this.state.rounds}
            maxLength = {60}
            autoCorrect = {false}
            returnKeyType = {'done'}
          />
          <TouchableOpacity onPress={() => this.setRoom(this.state.roomInput)} style={styles.button}>
            <Text>Set Room</Text>
          </TouchableOpacity>
          <Text>
            Rounds: {this.props.rounds}
          </Text>
          <Text>
            Team: {this.props.team}
          </Text>
          <Picker
            selectedValue={this.state.classType}
            onValueChange={(teamNum) => this.setTeam({ team: teamNum })}
            style={styles.picker}
          >
            <Picker.Item label="Team 1" value={1} />
            <Picker.Item label="Team 2" value={2} />
          </Picker>
          <TouchableHighlight
            onPress={() => {
              this.setRoom(this.state.roomInput);
              this.handleCreateOrClose();
            }}
            style={styles.submitButton}
          >
            <Text style={styles.buttonText}>Create Game Room</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.handleCreateOrClose();
            }}
            style={styles.closeButton}
          >
            <Text style={styles.buttonText}>Close Menu</Text>
          </TouchableHighlight>
        </ScrollView>
        : null}
      </View>
    );
  }
}

export default CardGameCreate;
