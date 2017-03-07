const quest = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_QUEST':
      return {
        id: action.id,
        name: action.name,
        location: action.location,
        questType: action.questType,
        experience: action.experience,
        creator_id: action.creator_id,
        lat: action.lat,
        lng: action.lng,
        item_id: action.item_id,
        attack: action.attack,
        defense: action.defense,
        drawSpeed: action.drawSpeed,
      };
    default:
      return quest;
  }
};

export const quests = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUEST':
      return [
        ...state,
        quest(undefined, action),
      ];
    default:
      return state;
  }
};

export const updateQuests = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_QUESTS':
      return action.quests;
    default:
      return state;
  }
};

export const toggleQuest = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_QUEST':
      return {
        id: action.id,
        active: action.active,
      };
    default:
      return state;
  }
};
