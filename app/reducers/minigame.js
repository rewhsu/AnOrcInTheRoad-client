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

export const setPoints = (state = 0, action) => {
  switch (action.type) {
    case 'SET_POINTS':
      return action.points;
    default:
      return state;
  }
}

export const setBattleStats = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BATTLE_STATS':
      return {
        attack: action.attack,
        defense: action.defense,
      }
    default:
      return state;
  }
}

export const storeCreateQuestInput = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_CREATE_QUEST_INPUT':
      return {
        id: action.id,
        name: action.name,
        location: action.location,
        questType: action.questType,
        experience: action.experience,
        creator_id: action.creator_id,
      }
    default:
      return state;
  }
}

export const speed = (state = null, action) => {
  switch (action.type) {
    case 'SET_NEW_DRAW_SPEED':
      return action.speed;
    default:
      return state;
  }
}

export const questType = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_QUEST_TYPE':
      return action.questType;
    default:
      return state;
  }
}

