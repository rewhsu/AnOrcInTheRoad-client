import { connect } from 'react-redux';
import { sendZing, updateCharacter } from '../actions/actions';
import CardGame from '../components/CardGame';
import Exponent from 'exponent';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    test: () => console.log('test'),
    getCharacter: (userId) => {
      socket.emit('get character', userId);
    },
  };
};

const CardGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardGame);

export default CardGameContainer;
