(function() {
  const startButton = document.getElementById('startBtn');
  const statusBar = document.getElementById('appStatus');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const experienceScreen = document.getElementById('experienceScreen');
  const appState = {
    isBuffering: false,
    cachedScene: '',
    scene: '',
    history: '',
  };

  const closeExperience = () => {
    window.location.reload();
  };

  const startExperience = () => {
    welcomeScreen.classList.add('scr-hidden');
    experienceScreen.classList.remove('scr-hidden');
    experienceScreen.classList.add('scr-visible');
    window.setTimeout(() => {
      document.querySelector('.btnClose').addEventListener('click', closeExperience);
    }, 1000);
  };

  const cacheExperience = () => {
    // cache the AR experience here in the background;
    statusBar.innerHTML = '<span class=\'ping\'></span> Buffering Experience...';
    appState.isBuffering = true;
    fetch('assets/experience/lazyload.html')
        .then((response) => response.text())
        .then((data) => {
          experienceScreen.innerHTML = data;
          statusBar.innerHTML = 'Ready';
          appState.isBuffering = false;
        })
        .catch((e) => {
          alert('Sorry, an error occured while loading your secret map');
        });
  };

  const setupInteraction = () => {
    startButton.addEventListener('click', startExperience);
  };

  const startApp = () => {
    window.setTimeout(cacheExperience, 100);
    setupInteraction();
  };


  startApp();
})();
