export const minigame = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ROOM_DATA':
      return action.data;
    default:
      return state;
  }
};

export const minigameMembers = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ROOM_MEMBER_DATA':
      return action.data;
    default:
      return state;
  }
};

export const setTeam = (state = '', action) => {
  switch (action.type) {
    case 'SET_TEAM':
      return action.team;
    default:
      return state;
  }
}

export const setRoom = (state = '', action) => {
  switch (action.type) {
    case 'SET_ROOM':
      return action.room;
    default:
      return state;
  }
}