import { connect } from 'react-redux';
import { setTeam, setRoom, setBattleStats, setQuestType } from '../actions/actions';
import BattleGameInput from '../components/BattleGameInput';
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
    questType: state.questType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBattlePlan: (attack, defense) => {
      dispatch(setQuestType('addBattleQuest'));
      dispatch(setBattleStats(attack, defense));
    },
  };
};

const BattleGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BattleGameInput);

export default BattleGameContainer;
