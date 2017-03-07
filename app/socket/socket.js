import io from 'socket.io-client';
import { updateQuests, triggerUpdateCharacter, updateRoomData, updateRoomMemberData } from '../actions/actions';

import { store } from '../main';

// const socket = io('10.7.37.58:3000');

// const socket = io('http://10.7.24.210:3000');
// const socket = io('http://169.254.86.190:3000')

// const socket = io('http://10.6.20.151:3000');
// const socket = io('http://10.0.0.24:3000');
// const socket = io('10.235.19.87:443');
// const socket = io('http://10.6.20.234:3000');
// const socket = io('http://10.230.188.203:3000');
// const socket = io('http://10.7.24.229:3000');
// const socket = io('http://10.242.64.77:3000');
const socket = io('http://10.7.24.229:3000');

socket.on('trigger update quests', () => {
  socket.emit('get quests', store.getState().user.char_id);
});

socket.on('update quests', (data) => {
  store.dispatch(updateQuests(data));
});

socket.on('update character', (char) => {
  store.dispatch(triggerUpdateCharacter(char));
});

socket.on('zing response', (response) => {
  console.log('zing response', response);
});

socket.on('update room data', (data) => {
  console.log('update room data', data);
  store.dispatch(updateRoomData(data));
});

socket.on('update room hp', () => {
  console.log('update room hp');
});

socket.on('update room member data', (memberData) => {
  console.log('update room member data', memberData);
  store.dispatch(updateRoomMemberData(memberData));
});



export default socket;
