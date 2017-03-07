import React from 'react';
import { View, ListView, StyleSheet, TouchableHighlight, Text } from 'react-native';
import QuestRow from './QuestRow';
import QuestCreateContainer from '../containers/QuestCreateContainer';
import socket from '../socket/socket';
import { updateQuests } from '../actions/actions'
import geolib from 'geolib';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
  createQuest: {
    paddingBottom: 20,
  },
});

class QuestList extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.quests),
      modalVisible: true,
      char_id: this.props.user.char_id,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  // componentWillMount() {
  //   this.props.pingLocation();
  // }

  componentDidMount() {
    this.props.fetchQuests(this.props.user.char_id);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.quests !== this.props.quests) {
      this.setState({
        elements: nextProps.quests,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.quests),
      });
    }
    // if (nextProps.user) {
    //   console.log('CHAR ID***: ', nextProps.user.char_id);
    //   this.setState({
    //     char_id: nextProps.user.char_id,
    //   });
    // }
  }

  // handleCreatorId() {
  //   this.props.fetchQuests(this.state.char_id);
  // }

  calculateDistance(lat1, lng1, lat2, lng2, accuracy) {
    const acc = accuracy || 20;
    var coord1 = { latitude: lat1, longitude: lng1 };
    var coord2 = { latitude: lat2, longitude: lng2 };
    return geolib.getDistance(coord1, coord2, acc);
  }
  
  renderRow(quest) {
    var dist = this.calculateDistance(this.props.lat, this.props.lng, quest.lat, quest.lng, 100);
    console.log(dist);
    return (
      <QuestRow quest={quest} showDetails={true} dist={dist} id={this.props.user.char_id} toggleQuest={this.props.toggleActiveQuest} />
    );
  }
  render() {
    // console.log('quest list component PROPS', this.props);
    return (
      <View>
        <View style={styles.createQuest}>
          <QuestCreateContainer />
        </View>
        <TouchableHighlight
          onPress={() => {
            this.props.onStartQuickDraw();
            this.props.handleCreateOrClose();
          }}
          style={styles.submitButton}
        >
          <Text style={styles.buttonText}>Create Character</Text>
        </TouchableHighlight>
        <View style={styles.container}>
          <View style={styles.createQuest}>
          {this.props.quests ?
            <ListView
              key={this.props.quests}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSeperator={this.renderSeperator}
              enableEmptySections={true}
            />
            : null }
          </View>
        </View>
      </View>
    );
  }

}

QuestList.propTypes = {
  quests: React.PropTypes
    .arrayOf(React.PropTypes.object).isRequired,
};

export default QuestList;
