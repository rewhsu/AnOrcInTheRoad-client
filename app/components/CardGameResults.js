import React from 'react';
import { View, Text } from 'react-native';

export default class CardGameResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomGameData: null,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roomGameData !== this.props.roomGameData) {
      this.setState({roomGameData: nextProps.roomGameData});
    }
  }

  render() {
    return(
      <View>
        <Text>
          {JSON.stringify(this.state.roomGameData)}
        </Text>
      </View>
    );
  }
}