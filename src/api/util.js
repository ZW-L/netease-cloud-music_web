export const getMonthAndDay = function (time) {
  console.log(time);
  const date = new Date(time);
  const match = date.toLocaleDateString().match(/\d{4}-(\d{2})-(\d{2})/);
  return `${match[1]}月${match[2]}日`;
};

export const getDuration = function (duration) {
  const minutes = Math.floor(duration / (60 * 1000));
  const seconds = Math.floor((duration - 60 * 1000 * minutes) / 1000);
  let res = minutes > 9 ? `${minutes}:` : `0${minutes}:`;
  res += seconds > 9 ? `${seconds}` : `0${seconds}`;
  return res;
};

export default {};
