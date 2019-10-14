const fillArray = function (count, start = 1) {
  return new Array(count).fill(null).map((v, i) => start + i);
};

const pageChanges = function (currPage, maxPage) {
  // 不需要显示省略号
  if (maxPage < 10) {
    return fillArray(maxPage, 1);
  }
  let pages = [1];
  // 省略号先出现在距离 currPage 较远的一端
  if (currPage - 1 <= maxPage - currPage) {
    // 判断是否在前端添加 '...'
    if (currPage <= 5) {
      pages = pages.concat(fillArray(7, 2));
    } else {
      pages.push('...');
      pages = pages.concat(fillArray(7, currPage - 3));
    }
    // 尾部始终添加 '...'
    pages.push('...', maxPage);
  } else {
    // eslint-disable-next-line no-lonely-if
    // 前端始终添加 '...'
    pages.push('...');
    // 判断是否在尾部添加 '...'
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

console.log(pageChanges(9, 38));
