const downloadItemPlayerElements = document.querySelectorAll(
  '.tl-download-do-player-js'
);
downloadItemPlayerElements.forEach((item) => {
  item.addEventListener('mouseenter', mainDemoVideoHover.bind(this, item, 1));
  item.addEventListener('mouseleave', mainDemoVideoHover.bind(this, item, 0));
});
function mainDemoVideoHover(videoLinkEl, isHover) {
  let outTimeout = videoLinkEl.outTimeout;
  let curIsHover = videoLinkEl.isHover || 0;
  if (outTimeout) {
    clearTimeout(outTimeout);
  }
  if (curIsHover == isHover) {
    return false;
  }
  if (!isHover) {
    outTimeout = setTimeout(function () {
      mainDemoVideoDoHover(videoLinkEl, isHover);
    }, 100);
    videoLinkEl.outTimeout = outTimeout;
    return false;
  }
  mainDemoVideoDoHover(videoLinkEl, isHover);
}
function mainDemoVideoDoHover(videoLinkEl, isHover) {
  delete videoLinkEl.outTimeout;
  let videoEl = videoLinkEl.querySelector('video');
  if (isHover) {
    if (videoEl.readyState > 1) {
      videoLinkEl.classList.add('video_play');
      videoEl.play();
      videoLinkEl.isHover = 1;
    }
  } else {
    videoLinkEl.isHover = 0;
  }
  if (!videoEl.inited) {
    videoEl.inited = true;
    // videoEl.onended =
    videoEl.addEventListener(
      'ended',
      function onVideoEnded(e) {
        if (videoLinkEl.isHover) {
          videoEl.currentTime = 0;
          videoEl.play();
        } else {
          videoEl.pause();
          videoEl.currentTime = 0;
          videoLinkEl.classList.remove('video_play');
        }
      },
      false
    );
  }
}
