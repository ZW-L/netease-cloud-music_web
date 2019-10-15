export const getMonthAndDay = function (time) {
  console.log(time);
  const date = new Date(time);
  const match = date.toLocaleDateString().match(/\d{4}-(\d{2})-(\d{2})/);
  return `${match[1]}æœˆ${match[2]}æ—¥`;
};

export const getDuration = function (duration) {
  const minutes = Math.floor(duration / (60 * 1000));
  const seconds = Math.floor((duration - 60 * 1000 * minutes) / 1000);
  let res = minutes > 9 ? `${minutes}:` : `0${minutes}:`;
  res += seconds > 9 ? `${seconds}` : `0${seconds}`;
  return res;
};

export const addSeparator = function (arr) {
  return arr.join('%%%|%%%').split('%%%');
};

export const fillArray = function (count, start = 1) {
  return new Array(count).fill(null).map((v, i) => start + i);
};

export const pageChanges = function (currPage, maxPage) {
  // ????????
  if (maxPage < 10) {
    return fillArray(maxPage, 1);
  }
  let pages = [1];
  // ????????? currPage ?????
  if (currPage - 1 <= maxPage - currPage) {
    // ????????? '...'
    if (currPage <= 5) {
      pages = pages.concat(fillArray(7, 2));
    } else {
      pages.push('...');
      pages = pages.concat(fillArray(7, currPage - 3));
    }
    // ?????? '...'
    pages.push('...', maxPage);
  } else {
    // eslint-disable-next-line no-lonely-if
    // ?????? '...'
    pages.push('...');
    // ????????? '...'
    if (maxPage - currPage < 5) {
      pages = pages.concat(fillArray(7, maxPage - 7));
    } else {
      pages = pages.concat(fillArray(7, currPage - 3));
      pages.push('...');
    }
    pages.push(maxPage);
  }

  return pages;
};

export default {};
