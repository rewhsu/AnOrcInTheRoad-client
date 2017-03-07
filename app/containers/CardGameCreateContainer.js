import { connect } from 'react-redux';
import { setTeam, setRoom } from '../actions/actions';
import CardGameCreate from '../components/CardGameCreate';
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

  // toggleTeam() {
  //   if (this.state.team === 1) {
  //     this.setState({ team: 2 });
  //     // socket.emit('toggle team', this.props.user.char_id, this.props.roomId, 2);
  //   } else {
  //     this.setState({ team: 1 });
  //     // socket.emit('toggle team', this.props.user.char_id, this.props.roomId, 1);

  //   }
  // }

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

const CardGameCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardGameCreate);

export default CardGameCreateContainer;
