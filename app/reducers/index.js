import { combineReducers } from 'redux';
import { quests, updateQuests, toggleQuest } from './quests';
import user from './user';
import { location, addWatcher } from './location';
import { minigame, minigameMembers, setTeam, setRoom, setPoints, setBattleStats, storeCreateQuestInput, speed, questType } from './minigame';

const App = combineReducers({
  quests: updateQuests,
  user: user,
  location: location,
  watcherSub: addWatcher,
  toggleQuest: toggleQuest,
  roomGameData: minigame,
  roomMembersData: minigameMembers,
  team: setTeam,
  room: setRoom,
  points: setPoints,
  stats: setBattleStats,
  info: storeCreateQuestInput,
  speed,
  questType,
});

export default App;
