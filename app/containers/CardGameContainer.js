import { connect } from 'react-redux';
import { setTeam, setRoom } from '../actions/actions';
import CardGame from '../components/CardGame';
import Exponent from 'exponent';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    user: state.user,
    roomGameData: state.roomGameData,
    roomMembersData: state.roomMembersData,
    team: state.team,
    room: state.room,
    points: state.points,
    rounds: 3,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    test: () => console.log('test'),
    getCharacter: (userId) => {
      socket.emit('get character', userId);
    },
    setTeam: (team) => {
      dispatch(setTeam(team));
    },
    setRoom: (room) => {
      dispatch(setRoom(room));
    },
  };
};

const CardGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardGame);

export default CardGameContainer;
