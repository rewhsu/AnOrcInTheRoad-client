import Exponent from 'exponent';

let nextQuestId = 0;

export const addQuest = (name, location, questType, experience, lat, lng, creator_id, attack, defense, drawSpeed) => {
  return {
    type: 'ADD_QUEST',
    id: nextQuestId++,
    name,
    location,
    questType,
    experience,
    lat,
    lng,
    creator_id,
    attack,
    defense,
    drawSpeed,
  };
};

export const userLogin = (name, user_id) => {
  return {
    type: 'USER_LOGIN',
    name,
    user_id,
  };
};

export const updateCharId = (char_id) => {
  return {
    type: 'UPDATE_CHARID',
    char_id,
  };
};

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};

export const createCharacter = (character) => {
  return {
    type: 'CREATE_CHARACTER',
    character,
  };
};

export const triggerUpdateCharacter = (character) => {
  return {
    type: 'TRIGGER_UPDATE_CHARACTER',
    character,
  };
};

export const updateQuests = (quests) => {
  return {
    type: 'UPDATE_QUESTS',
    quests,
  };
};

export const addWatcher = (watcherSub) => {
  return {
    type: 'ADD_WATCHER',
    watcherSub,
  };
};

export const toggleQuest = (id, active) => {
  return {
    type: 'TOGGLE_QUEST',
    id,
    active,
  };
};

export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const REQUEST_QUESTS = 'REQUEST_QUESTS';
export const RECEIVE_QUESTS = 'RECEIVE_QUESTS';

export function requestLocation() {
  return {
    type: REQUEST_LOCATION,
  };
}

export function receiveLocation(coord) {
  return {
    type: RECEIVE_LOCATION,
    latitude: coord.latitude,
    longitude: coord.longitude,
  };
}

export function updateLocation() {
  return function (dispatch) {
    const { Location } = Exponent;
    dispatch(requestLocation());
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true })        // We can dispatch many times!
      .then(result => dispatch(receiveLocation(result.coords)));
  };
}

export const updateRoomData = (data) => {
  return {
    type: 'UPDATE_ROOM_DATA',
    data,
  };
};

export const updateRoomMemberData = (data) => {
  return {
    type: 'UPDATE_ROOM_MEMBER_DATA',
    data,
  };
};

export const setTeam = (team) => {
  return {
    type: 'SET_TEAM',
    team,
  };
};

export const setRoom = (room) => {
  return {
    type: 'SET_ROOM',
    room,
  };
};

export const setPoints = (points) => {
  return {
    type: 'SET_POINTS',
    points,
  };
};

export const setBattleStats = (attack, defense) => {
  return {
    type: 'SET_BATTLE_STATS',
    attack,
    defense,
  };
};

export const storeCreateQuestInput = (name, location, questType, experience, creator_id) => {
  return {
    type: 'STORE_CREATE_QUEST_INPUT',
    id: nextQuestId++,
    name,
    location,
    questType,
    experience,
    creator_id,
  };
};

export const newDrawSpeed = (speed) => {
  return {
    type: 'SET_NEW_DRAW_SPEED',
    speed,
  };
};

export const setQuestType = (questType) => {
  return {
    type: 'SET_CURRENT_QUEST_TYPE',
    questType,
  };
};

