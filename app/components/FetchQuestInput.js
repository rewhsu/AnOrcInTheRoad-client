import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, Slider, Picker, ScrollView } from 'react-native';
import { Font } from 'exponent';
import MapScreen from '../screens/MapScreen';

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
    width: 200,
    height: 200,
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
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
  },
  modal: {
    paddingTop: 80,
    paddingBottom: 50,
  },
  picker: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 5,
    paddingBottom: 5,
  },
  map: {
    paddingTop: 100,
  },
});

class FetchQuestInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: null,
      location: null,
      experience: null,
      questType: 'addFetchQuest',
      item_id: null,
      creator_id: null,
      lat: null,
      lng: null,
      attack: null,
      defense: null,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  createPartialQuest() {
    this.setModalVisible(true);
  }

  render() {
    console.log('QUEST CREATE PROPS', this.props);
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
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(location) => this.setState({ location })}
                placeholder="Location"
                value={this.state.location}
                maxLength = {150}
                autoCorrect = {false}
                returnKeyType = {'done'}
              />
            </View>
            <MapScreen />
            <TouchableHighlight onPress={() => this.submitFetchQuest()} style={styles.submitButton} >
              <Text style={styles.buttonText}>Submit Location</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.setModalVisible(false)} style={styles.closeButton} >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
          </ScrollView>
        </Modal>
        <View>
          <TouchableHighlight onPress={() => { this.setModalVisible(true)}} style={styles.addButton}>
            <Text style={styles.buttonText}>Create Fetch Quest</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default FetchQuestInput;