const isOS = () => {
  return (
    navigator &&
    navigator.userAgent &&
    navigator.userAgent.match &&
    navigator.userAgent.match(/ipad|iphone/i)
  );
};

const selectText = textArea => {
  if (isOS()) {
    const range = document.createRange();
    range.selectNodeContents(textArea);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }
};

export const copyToClipboard = text => {
  if (!document || !window || !navigator) {
    return false;
  }

  const textArea = document.createElement('textArea');
  textArea.value = text;
  textArea.readOnly = true;
  document.body.appendChild(textArea);

  selectText(textArea);

  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
