import { connect } from 'react-redux';
import { setPoints } from '../actions/actions';
import CardGameRound from '../components/CardGameRound';
import Exponent from 'exponent';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    user: state.user,
    roomId: state.room,
    rounds: 3,
    hp: 10,
    roomGameData: state.roomGameData,
    team: state.team,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    test: () => console.log('test'),
    getCharacter: (userId) => {
      socket.emit('get character', userId);
    },
    setPoints: (points) => {
      dispatch(setPoints(points));
    },
  };
};

const CardGameRoundContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardGameRound);

export default CardGameRoundContainer;
