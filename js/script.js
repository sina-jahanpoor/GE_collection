const copyButton = document.getElementById("copy-button");
const copyMessage = document.getElementById("copy-message");
const textToCopy = "https://GEcollection.com"; //just for js test
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(textToCopy).then(() => {
    copyMessage.style.visibility = "visible";
    setTimeout(() => {
      copyMessage.style.visibility = "hidden";
    }, 2000);
  });
});
