export const scrollToTopOfElement = ref => {
  if (ref && ref.current && ref.current.offsetTop) {
    window.scrollTo({
      top: ref.current.offsetTop - 100
    });
  }
};
