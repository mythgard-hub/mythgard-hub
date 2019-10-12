export const scrollToTopOfList = listRef => {
  if (listRef && listRef.current && listRef.current.offsetTop) {
    window.scrollTo({
      top: listRef.current.offsetTop - 100
    });
  }
};
