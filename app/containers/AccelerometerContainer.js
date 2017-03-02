import { connect } from 'react-redux';
import { sendZing } from '../actions/actions';
import AccelerometerSensor from '../components/Accelerometer';
import Exponent from 'exponent';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onZing: (charId, isOnCooldown) => {
      if (isOnCooldown) {
        return false;
      } else {
        const date = new Date();
        socket.emit('add zing', charId, date.getTime());
      }
    },
  };
};

const AccelerometerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccelerometerSensor);

export default AccelerometerContainer;  