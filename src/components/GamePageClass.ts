export class GamePageClass {
  constructor(private pageId: string, private menuButtonId: string, private restartButtonId: string, private playerDetails: { playerLogo: string; playeLogoId: string; playerLogoAlt: string; playerName: string; playerScoreId: string }[], private gamePlayerTurnId: string, private gameTimerId: string) {}

  private renderPage(param: [HTMLHeadElement, HTMLDivElement]) {
    const pageDiv = document.querySelector(`#${this.pageId}`) as HTMLDivElement;
    pageDiv.append(...param);
  }

  render() {
    const header = document.createElement("header");
    header.setAttribute("class", "game-play-header");

    const menuButton = document.createElement("button");
    menuButton.setAttribute("class", "game-player-buttons");
    menuButton.setAttribute("id", this.menuButtonId);
    menuButton.innerText = "menu";

    const img = document.createElement("img");
    img.setAttribute("src", "./assets/logo.svg");
    img.setAttribute("fetchpriority", "high");
    img.setAttribute("loading", "eager");
    img.setAttribute("alt", "Logo Icon");
    img.setAttribute("class", "logo-icon");

    const restartButton = document.createElement("button");
    restartButton.setAttribute("class", "game-player-buttons");
    restartButton.setAttribute("id", this.restartButtonId);
    restartButton.innerText = "restart";

    header.append(menuButton, img, restartButton);

    const gameMain = document.createElement("div");
    gameMain.setAttribute("class", "game-play-main");

    this.playerDetails.forEach(({ playerLogo, playeLogoId, playerLogoAlt, playerName, playerScoreId }) => {
      const section = document.createElement("section");
      section.setAttribute("class", "game-player-section");

      const img = document.createElement("img");
      img.setAttribute("src", playerLogo);
      img.setAttribute("id", playeLogoId);
      img.setAttribute("alt", playerLogoAlt);
      img.setAttribute("class", "game-player-icon");

      const playerVar = document.createElement("var");
      playerVar.innerText = playerName;

      const h1 = document.createElement("h1");
      h1.setAttribute("id", playerScoreId);
      h1.innerText = "0";

      section.append(img, playerVar, h1);
      gameMain.append(section);
    });

    const section = document.createElement("section");
    section.setAttribute("class", "game-board-section");

    const boardMain = document.createElement("main");
    boardMain.setAttribute("class", "game-board-main");

    const boardDiv = document.createElement("div");
    boardDiv.setAttribute("class", "game-board-player");

    for (let i = 0; i < 7 * 6; i++) {
      const div = document.createElement("div");
      div.setAttribute("class", "game-board-hole");

      boardDiv.append(div);
    }

    boardMain.append(boardDiv);

    const timerDiv = document.createElement("div");
    timerDiv.setAttribute("class", "game-timer-div");

    const p = document.createElement("p");
    p.setAttribute("class", "game-timer-topic");
    p.setAttribute("id", this.gamePlayerTurnId);
    p.innerText = "player 1's turn";

    const h1 = document.createElement("h1");
    h1.setAttribute("class", "gamer-timer-count");
    h1.setAttribute("id", this.gameTimerId);
    h1.innerText = "6s";

    timerDiv.append(p, h1);
    section.append(boardMain, timerDiv);
    gameMain.append(section);

    this.renderPage([header, gameMain]);
  }
}
