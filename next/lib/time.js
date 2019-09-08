export const dateToDeltaString = date => {
  const now = new Date();
  const timeDelta = now.getTime() - date.getTime();
  const hrsDelta = Math.ceil(timeDelta / (1000 * 60 * 60 * 24));
  const daysDelta = Math.ceil(timeDelta / (1000 * 60 * 60 * 24));
  const monthsDelta = Math.ceil(timeDelta / (1000 * 60 * 60 * 24 * 30));

  let timeMsg;

  if (monthsDelta > 12) {
    timeMsg = 'over a year ago';
  } else if (monthsDelta > 1) {
    timeMsg = `${monthsDelta} months ago`;
  } else if (daysDelta > 1) {
    timeMsg = `${daysDelta} days ago`;
  } else if (hrsDelta > 1) {
    timeMsg = `${hrsDelta} hours ago`;
  } else {
    timeMsg = 'just now';
  }

  return timeMsg;
};
