import { connect } from 'react-redux';
import { addQuest, setBattleStats, newDrawSpeed, setQuestType } from '../actions/actions';
import QuestCreate from '../components/QuestCreate';
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
    stats: state.stats,
    speed: state.speed,
    lat: state.location.latitude,
    lng: state.location.longitude,
    questType: state.questType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitQuest: (name, location, questType, experience, latitude, longitude, creator_id, atk, def, drawSpeed) => {
      const newQuest = addQuest(name, location, questType, experience, latitude, longitude, creator_id, atk, def, drawSpeed);
      console.log('new quest', newQuest);
      dispatch(newQuest);
      socket.emit('create quest', newQuest);
    },
    // addPartialQuestInfo: (name, questType, experience, creator_id) => {
    //   var newQuest = storeCreateQuestInput(name, questType, experience, creator_id);
    //   console.log('add partial', newQuest);
    //   dispatch(newQuest);
    // },
    saveScore: (score) => {
      dispatch(setQuestType('addQuickDrawQuest'));
      dispatch(newDrawSpeed(score));
    },
    setBattlePlan: (attack, defense) => {
      dispatch(setQuestType('addBattleQuest'));
      dispatch(setBattleStats(attack, defense));
    },
  };
};

const QuestCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestCreate);

export default QuestCreateContainer;
