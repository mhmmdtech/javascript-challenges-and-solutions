// https://stackabuse.com/how-to-copy-to-clipboard-in-javascript-with-the-clipboard-api/
// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
class ClipboardCustom {
  constructor(copyButton) {
    this.copyButton = copyButton;
    this.targetId = this.copyButton.dataset.getCopy;
    this.targetElement = document.querySelector(this.targetId);
    this.copyTextToClipboard();
  }
  copyTextToClipboard() {
    let adText = this.targetElement.innerText;
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(adText);
      return;
    }
    navigator.clipboard
      .writeText(adText)
      .then(() => {
        console.log('Async: Copying to clipboard was successful!');
      })
      .catch((error) => {
        console.error('Async: Could not copy text: ', error);
      });
  }
  fallbackCopyTextToClipboard(text) {
    let textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    } finally {
      document.body.removeChild(textArea);
    }
  }
}
