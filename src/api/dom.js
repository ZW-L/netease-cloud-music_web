export const boxOffsetLeft = function (element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
};

export default {

};
