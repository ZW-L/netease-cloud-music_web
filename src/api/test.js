const dateFormat = function (time) {
  const match = new Date(time).toLocaleDateString().split(/\W/);
  const month = match[1].length === 2 ? match[1] : `0${match[1]}`;
  const day = match[2].length === 2 ? match[2] : `0${match[2]}`;
  return `${match[0]}-${month}-${day}`;
};

console.log(dateFormat(1566489600000));
