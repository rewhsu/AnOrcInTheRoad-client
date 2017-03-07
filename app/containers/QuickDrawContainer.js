import { connect } from 'react-redux';
import { addQuest, storeCreateQuestInput, newDrawSpeed, setQuestType } from '../actions/actions';
import QuickDrawModal from '../components/QuickDrawModal';
import QuickDraw from '../components/QuickDraw';
import Exponent from 'exponent';
import socket from '../socket/socket';


const mapStateToProps = (state) => {
  return {
    user: state.user,
    location: state.location,
    lat: state.location.latitude,
    lng: state.location.longitude,
    info: state.info,
    speed: state.speed,
    questType: state.questType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitQuest: (name, location, questType, experience, latitude, longitude, creator_id, atk, def, drawSpeed) => {
      var newQuest = addQuest(name, location, questType, experience, latitude, longitude, creator_id, atk, def, drawSpeed);
      console.log('new quest', newQuest);
      dispatch(newQuest);
      socket.emit('create quest', newQuest);
    },
    // addPartialQuestInfo: (name, location, questType, experience, latitude, longitude, creator_id, atk, def, drawSpeed) => {
    //   var newQuest = storeCreateQuestInput(name, location, questType, experience, latitude, longitude, creator_id, atk, def, drawSpeed);
    //   console.log('add partial', newQuest);
    //   dispatch(newQuest);
    // },
    saveScore: (score) => {
      dispatch(setQuestType('addQuickDrawQuest'));
      dispatch(newDrawSpeed(score));
    },
  };
};

const QuickDrawContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuickDraw);

export default QuickDrawContainer;
