import { connect } from 'react-redux';
import { setTeam, setRoom } from '../actions/actions';
import CardGame from '../components/CardGame';
import Exponent from 'exponent';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    user: state.user,
    rounds: 3,
    roomGameData: state.roomGameData,
    roomMembersData: state.roomMembersData,
    team: state.team,
    room: state.room,
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
