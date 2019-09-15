const toSquareMiles = val => {
  if (val) {
    if (val < 1) {
      val = (val / 2.59).toFixed(2);
    } else if (val < 100) {
      val = (val / 2.59).toFixed(1);
    } else {
      val = Math.round(val / 2.59);
    }

    return val.toLocaleString();
  }
};

const prependWithFilter = val => {
  const firstLetter = val.charAt(0);
  const dataToSearch = val.replace(firstLetter, firstLetter.toUpperCase());
  return `filtered${dataToSearch}`;
};

export { toSquareMiles, prependWithFilter };
