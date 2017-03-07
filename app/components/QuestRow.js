import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Alert } from 'react-native';
import socket from '../socket/socket';
import { Font } from 'exponent';
import QuickDrawContainer from '../containers/QuickDrawContainer';
import BattleGameContainer from '../containers/BattleGameContainer';
import FetchQuestInput from '../components/FetchQuestInput';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
     ...Font.style('luminari'),
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '100',
    color: 'gray',
     ...Font.style('luminari'),
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
     ...Font.style('luminari'),
  },
});


class QuestRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isSelected: false,
      quickDrawVisible: false,
      battleQuestVisible: false,
      fetchQuestVisible: false,
      distanceMiles: null,
    };
  }

  componentDidMount() {
    if (this.props.quest.active) {
      this.setState({ isSelected: true });
    }
    if (this.props.quest.questType === 'addQuickDrawQuest') {
      this.setState({quickDrawVisible: true});
    } else if (this.props.quest.questType === 'addBattleQuest') {
      this.setState({battleQuestVisible: true});
    } else if (this.props.quest.questType === 'addFetchQuest') {
      this.setState({fetchQuestVisible: true});
    }
    this.setState({ distanceMiles: this.convertDistanceToMiles(this.props.dist) });
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS from QROW: ', nextProps);
    if (nextProps.quest.active === 1) {
      this.setState({ isSelected: true });
    }
  }

  getDistance(lat1, lng1, lat2, lng2) {
    return this.props.calculateDistance({latitude: lat1, longitude: lng1}, {latitude: lat2, longitude: lng2});
  }

  convertDistanceToMiles(dist) {
    return Math.floor(dist * 0.000621371 * 10)/10;
  }

  handleSelect() {
    this.setState({isSelected: !this.state.isSelected});
    this.handleToggle();
      console.log('STATE IS SELECTED from HANDLE: ', this.state.isSelected);

  }

  handleToggle() {
     console.log('STATE IS SELECTED from HANDLE: ', this.state.isSelected);
    this.props.toggleQuest(this.props.id, this.props.quest.id, this.state.isSelected);
    this.checkIfComplete(this.state.distanceMiles);
  }

  checkIfComplete() {
    if (this.state.distanceMiles < 0.1 && this.state.isSelected) {
      this.processQuest();
    }
  }

  processQuest() {
    if (this.props.quest.questType === 'addFetchQuest') {
      console.log('quest completed: ', this.props.quest.id);
      socket.emit('complete quest', this.props.id, this.props.quest.id);
      Alert.alert('Completed Quest!');
    } else if (this.props.quest.questType === 'addBattleQuest') {
      console.log('PROCESSING BATTLE QUEST');
    } else if (this.props.quest.questType === 'addQuickDrawQuest') {
      console.log('PROCESSING QUICK DRAW QUEST');
    }
  }

  submitQuest(questType) {
    var context = this;
    this.props.submitQuest(
      context.props.quest.name,
      context.props.quest.location,
      context.props.quest.questType,
      context.props.quest.experience,
      context.props.quest.lat,
      context.props.quest.lng,
      context.props.id,
      context.state.attack,
      context.state.defense,
      context.state.speed,
    );
    context.setModalVisible(false);
  }

  render() {
    console.log('STATE IS SELECTED: ', this.state.isSelected);
    const rowPress = () => {
      console.log('You have pressed row');
    };
    console.log('ROW PROPS: ', this.props);
    return (
      <TouchableHighlight onPress={() => this.handleSelect()} underlayColor='white'>
        <View style={[styles.container, this.state.isSelected ? { backgroundColor: '#0eb27e' } : {}]} >
          <Text style={styles.title} /*onPress={rowPress}*/>
            {this.props.quest.name}
          </Text>
          {this.props.showDetails ?
          <View /*onPress={() => this.props.toggleQuest(this.props.quest.id)}*/>
            <Text style={styles.label}>{this.state.distanceMiles} Miles</Text>
            <Text style={styles.label}>Rewards: {this.props.quest.experience} EXP</Text>
          </View>
          : null}
          {this.state.quickDrawVisible ?
          <View>
            <QuickDrawContainer />
          </View>
          : null}
          {this.state.battleQuestVisible ?
          <View>
            <BattleGameContainer />
          </View>
          : null}
          {this.state.fetchQuestVisible ?
          <View>
            <FetchQuestInput />
          </View>
          : null}
          <TouchableHighlight onPress={() => this.submitQuest()} style={styles.closeButton} >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

QuestRow.propTypes = {
  quest: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    questType: React.PropTypes.string.isRequired,
    experience: React.PropTypes.number.isRequired,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
  }).isRequired,
  showDetails: React.PropTypes.bool.isRequired,
};

export default QuestRow;
