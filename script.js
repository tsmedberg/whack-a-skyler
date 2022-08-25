let gameArea = document.getElementById("game_area");

const createSkyler = (x,y,t)=>{
    return new Promise((resolve,reject)=>{
        let s = document.createElement("div");
        s.className = "skyler";
        s.style.position = "absolute";
        s.style.top = `${y}px`;
        s.style.left = `${x}px`;
        gameArea.appendChild(s)
        let timer = setTimeout(()=>{
            //spelaren hann inte klicka
            gameArea.removeChild(s);
            resolve(false)
        },t);
        s.addEventListener("click",(e)=>{
            //spelaren hann
            clearTimeout(timer);
            s.classList.add("hit")
            resolve(true)
        })
    })
}
(async ()=>{
    let hits = 0;
    let lives = 3;
    let hasWon = false;

    let hitCounter = document.getElementById("hit_counter");
    let lifeCounter = document.getElementById("life_counter");
    let gameStatus = document.getElementById("game_status");
    while (!hasWon)
    {
        let x = parseInt(gameArea.offsetLeft+Math.random()*(300));
        let y = parseInt(gameArea.offsetTop+Math.random()*(300));
        if(await createSkyler(x,y,1000))
        {
            hits++;
            lifeCounter.innerText = lives;
            hitCounter.innerText = hits;
            switch(hits) {
                case 2:
                    new Audio("/assets/stupid_bitch.mp3").play();
                    break;
                case 7:
                    new Audio("/assets/yes_indeed.mp3").play();
                    break;
                case 25:
                    hasWon = true;
                    break;
            }
        }
        else if(hits > 0) {
            lives--;
            lifeCounter.innerText = lives;
            if(lives == 0) break;
        }
    }
    if(hasWon)
    {
        gameStatus.innerText = "Du vann"
        new Audio("/assets/theme.mp3").play();
    }
    else {
        gameStatus.innerText = "Du förlorade 😡"
        new Audio("/assets/what_is_wrong_with_you.mp3").play();
    }
    document.getElementById("game_stats").parentNode.removeChild(document.getElementById("game_stats"))
    gameArea.parentElement.removeChild(gameArea);
    document.getElementById("finish_screen").style.display = "inherit";
})();