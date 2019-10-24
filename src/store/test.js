let payload = {};
payload.id = 1234;
payload.name = 'Alice';
payload.singer = 'Anna';
payload.picUrl = 'http://p2.music.126.net/xLSpSuXb1wJPC2CC0V_O_g==/38482906984297.jpg?param=34y34';

let obj = {
  id: '',
  name: '',
  singer: '',
  picUrl: '',
};

obj = payload;

payload = null;

console.log(obj);
