function ARapp() {
    const startButton = document.getElementById("startBtn");
    const statusBar = document.getElementById("appStatus");
    const viewPort = document.getElementById("appBody");
    const appState = {
        isBuffering: false,
        cachedScene: '',
        scene: '',
        history: ''
    };

    const closeExperience = () => {
        window.location.reload();
        /*
        viewPort.innerHTML = appState.history;
        appState.history = '';
        //unload ar.js etc here
        */
    }

    const startExperience = () => {
        appState.history = viewPort.innerHTML;
        viewPort.innerHTML = appState.cachedScene;
        window.setTimeout(() => {
            document.querySelector(".btnClose").addEventListener("click", closeExperience);
        }, 1000);
    }

    const cacheExperience = () => {
        //cache the AR experience here in the background;
        statusBar.innerHTML = "<span class='ping'></span> Buffering Experience..."
        appState.isBuffering = true;
        fetch("assets/experience/lazyload.html")
            .then(response => response.text())
            .then(data => {
                appState.cachedScene = data;
                statusBar.innerHTML = "Ready"
                appState.isBuffering = false;
            })
            .catch(e => {
                alert("Sorry, an error occured while loading your secret map");
            })

    }

    const setupInteraction = () => {
        startButton.addEventListener("click", startExperience);
    }

    const startApp = () => {
        window.setTimeout(cacheExperience, 100);
        setupInteraction();
    }

    this.startApp = startApp;
    this.appState = appState;
}

webApp = new ARapp();
webApp.startApp();