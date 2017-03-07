import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, TextInput, Slider, Picker, ScrollView } from 'react-native';
import { Font } from 'exponent';
import QuickDrawContainer from '../containers/QuickDrawContainer';
import BattleGameInput from './BattleGameInput';
import FetchQuestInput from './FetchQuestInput';

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

class QuestCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: null,
      location: null,
      experience: null,
      questType: null,
      item_id: null,
      creator_id: null,
      lat: null,
      lng: null,
      attack: null,
      defense: null,
    };
    this.quickDrawInput = this.quickDrawInput.bind(this);
    this.battleGameInput = this.battleGameInput.bind(this);
    this.fetchQuestInput = this.fetchQuestInput.bind(this);
    // this.questNameText = this.questNameText.bind(this);
    // this.questPicker = this.questPicker.bind(this);
    // this.experienceSlider = this.experienceSlider.bind(this);
    this.pickerResultElements = this.pickerResultElements.bind(this);
    this.defaultInputElements = this.defaultInputElements.bind(this);
    // this.textInput = this.textInput.bind(this);
    this.setQuestType = this.setQuestType.bind(this);
  }

  componentDidMount() {
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  
  setQuestType() {
    // this.props.addPartialQuestInfo(this.state.name, this.state.location, this.state.questType, this.state.experience, this.props.user.char_id);
    this.setModalVisible(true);
  }

  defaultInputElements() {
    return (
      <View>
        {this.questNameText()}
        {this.experienceSlider()}
        {this.questPicker()}
      </View>
    );
  }

  pickerResultElements() {
    const type = this.state.questType;
    let pickerResult;
    if (type === "addFetchQuest") {
      pickerResult = this.fetchQuestInput();
    } else if (type === "addBattleQuest") {
      pickerResult = this.battleGameInput();
    } else if (type === "addQuickDrawQuest") {
      pickerResult = this.quickDrawInput();
    } else {
      pickerResult = null;
    }
    return (
      <View>
        {pickerResult}
      </View>
    );
  }

  fetchQuestInput() {
    return (
      <FetchQuestInput createQuest={this.createQuest} submitQuest={this.submitQuest} />
    );
  }

  battleGameInput() {
    return (
      <BattleGameInput createQuest={this.createQuest} submitQuest={this.submitQuest} attack={this.props.stats.attack} defense={this.props.stats.defense} setBattlePlan={this.props.setBattlePlan} />
    );
  }

  quickDrawInput() {
    return (
      <QuickDrawContainer createQuest={this.createQuest} />
    );
  }

  submitQuest(questType) {
    var context = this;
    this.props.submitQuest(
      context.state.name,
      context.state.location,
      context.props.questType,
      context.state.experience,
      context.props.lat,
      context.props.lng,
      context.props.user.char_id,
      context.props.stats.attack,
      context.props.stats.defense,
      context.props.speed,
    );
    context.setModalVisible(false);
  }


  render() {
    console.log('QUEST CREATE PROPS', this.props);
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          style={styles.modal}
        >
          <ScrollView contentContainerStyle={styles.modal}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              placeholder="Quest Name"
              value={this.state.name}
              maxLength = {30}
              autoCorrect = {false}
              returnKeyType = {'done'}
            />
            <Text style={styles.label}>Experience: {this.state.experience}</Text>
            <Slider
              style={styles.input}
              minimumValue={0}
              maximumValue={99999}
              onSlidingComplete={(experience) => {
                var exp = Math.round(experience);
                this.setState({ experience: exp });
              }}
            />
            <Picker
              selectedValue={this.state.questType}
              onValueChange={(itemValue) => this.setState({ questType: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Fetch Quest" value="addFetchQuest" />
              <Picker.Item label="Battle" value="addBattleQuest" />
              <Picker.Item label="Quickdraw" value="addQuickDrawQuest" />
            </Picker>
            {this.pickerResultElements()}
            <Text>
              Quest Type: {this.props.questType}
            </Text>
            <Text>
              Quick Draw Speed: {this.props.speed}
            </Text>
            <Text>
              Battle Stats - Attack: {this.props.stats.attack}
            </Text>
            <Text>
              Battle Stats - Defense: {this.props.stats.defense}
            </Text>
            <TouchableHighlight onPress={() => this.submitQuest()} style={styles.closeButton} >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.setModalVisible(false)} style={styles.closeButton} >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
          </ScrollView>
        </Modal>
        <View>
          <TouchableHighlight onPress={() => this.setModalVisible(true)} style={styles.addButton}>
            <Text style={styles.buttonText}>Create New Quest</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default QuestCreate;
