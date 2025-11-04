import { showSections } from "./showSections";

let currentPlayer: "you" | "cpu";
let lastGameStarter: "you" | "cpu";
const currentPlayersDetails: { you: { text: string; class: string; holeClass: string }; cpu: { text: string; class: string; holeClass: string } } = { you: { text: "your turn", class: "player-class", holeClass: "player-hole-class" }, cpu: { text: "cpu's turn", class: "cpu-class", holeClass: "cpu-hole-class" } };

let playerScores = { you: 0, cpu: 0 };
let winner: "you" | "cpu" | "";

function winnerConditions(matchingDivs: HTMLDivElement[], presentDiv: HTMLDivElement, no: number) {
  const possibleConditions = [
    { name: "left", condition: no % 7 >= 4 || no % 7 === 0, calculation: (i: number) => no - i },
    { name: "right", condition: no % 7 <= 4 && no % 7 !== 0, calculation: (i: number) => no + i },
    { name: "top", condition: no >= 22, calculation: (i: number) => no - i * 7 },
    { name: "topLeft", condition: no >= 22 && (no % 7 >= 4 || no % 7 === 0), calculation: (i: number) => no - i * 8 },
    { name: "topRight", condition: no >= 22 && no % 7 <= 4 && no % 7 !== 0, calculation: (i: number) => no - i * 6 },
    { name: "bottom", condition: no <= 21, calculation: (i: number) => no + i * 7 },
    { name: "bottomLeft", condition: no <= 21 && (no % 7 >= 4 || no % 7 === 0), calculation: (i: number) => no + i * 6 },
    { name: "bottomRight", condition: no <= 21 && no % 7 <= 4 && no % 7 !== 0, calculation: (i: number) => no + i * 8 },
  ];

  for (const { condition, calculation } of possibleConditions) {
    if (!condition) continue;

    const tempMatchingDivs: HTMLDivElement[] = [presentDiv];

    for (let i = 1; i <= 3; i++) {
      const nextElement = document.querySelector(`div[data-hole='${calculation(i)}']`) as HTMLDivElement;

      if (nextElement.hasAttribute("data-played") && presentDiv.getAttribute("data-type") === nextElement.getAttribute("data-type")) {
        tempMatchingDivs.push(nextElement);
      } else {
        break;
      }
    }

    if (tempMatchingDivs.length === 4) {
      matchingDivs.push(...tempMatchingDivs);
      matchingDivs.forEach((div) => {
        div.classList.add("player-winner-holes");
      });

      winner = matchingDivs[0].getAttribute("data-type") as "you" | "cpu";
      if (winner === "cpu") {
        playerScores = { ...playerScores, cpu: playerScores.cpu + 1 };
        document.getElementById("game-player-right-score")!.innerText = `${playerScores.cpu}`;
      } else if (winner === "you") {
        playerScores = { ...playerScores, you: playerScores.you + 1 };
        document.getElementById("game-player-left-score")!.innerText = `${playerScores.you}`;
      }

      activeTimers.forEach((timerId) => clearTimeout(timerId));
      activeTimers = [];

      return;
    }
  }
}

function checkWinner() {
  let presentMatchingDivs: HTMLDivElement[] = [];

  for (const divNo of presentHoles) {
    if (presentMatchingDivs.length === 4) break;

    const presentDiv = document.querySelector(`div[data-hole='${divNo}']`) as HTMLDivElement;

    winnerConditions(presentMatchingDivs, presentDiv, divNo);
  }

  return { presentMatchingDivs };
}

const presentHoles: number[] = [];

function colorNewHole(player: "you" | "cpu", columnDivs: NodeListOf<HTMLDivElement>) {
  const lastDivType: string = currentPlayersDetails[currentPlayer]["holeClass"];

  let divsNotPlayed = Array.from(columnDivs).filter((div) => !div.hasAttribute("data-played"));

  if (player === "cpu") {
    while (divsNotPlayed.length === 0) {
      const newColumnNumber = Math.floor(Math.random() * 7) + 1;

      const columnDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll(`div[data-state="column-${newColumnNumber}"]`);
      divsNotPlayed = Array.from(columnDivs).filter((div) => !div.hasAttribute("data-played"));
    }
  }

  if (divsNotPlayed.length > 0 && !winner && currentPlayer === player) {
    const lastDiv = divsNotPlayed[divsNotPlayed.length - 1];

    lastDiv.setAttribute("data-played", "true");
    lastDiv.setAttribute("data-type", currentPlayer);
    lastDiv.classList.add(lastDivType);

    presentHoles.push(Number(lastDiv.getAttribute("data-hole")));
    const { presentMatchingDivs } = checkWinner();

    if (presentMatchingDivs.length === 0) {
      currentPlayer = currentPlayer === "you" ? "cpu" : "you";
      playGame();
    } else {
      updatePlayAgainDiv(winner);
    }
  }
}

let hoverEffectsInitialized = false;
function holeHoverEffect() {
  if (hoverEffectsInitialized) return;
  hoverEffectsInitialized = true;

  for (let i = 1; i < 8; i++) {
    const columnDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll(`div[data-state="column-${i}"]`);
    const firstDiv = columnDivs[0] as HTMLDivElement;

    columnDivs.forEach((div) => {
      div.addEventListener("click", () => {
        colorNewHole("you", columnDivs);
      });
    });

    columnDivs.forEach((div) => {
      const img = document.createElement("img");
      img.setAttribute("src", "./assets/marker-red.svg");
      img.setAttribute("alt", "Current Column Marker");
      img.setAttribute("id", "player-column-marker");

      div.addEventListener("mouseenter", () => {
        firstDiv.classList.add("current-top");
        firstDiv.append(img);
      });

      div.addEventListener("mouseleave", () => {
        firstDiv.classList.remove("current-top");
        if (firstDiv.contains(img)) firstDiv.removeChild(img);
      });
    });
  }
}

function updateGameDetails() {
  const currentPlayerDetails: { text: string; class: string; holeClass: string } = currentPlayersDetails[currentPlayer];

  document.getElementById("game-player-turn")!.innerText = currentPlayerDetails.text;
  document.getElementById("player-cpu-timer-div")!.classList.remove(currentPlayer === "you" ? "cpu-class" : "player-class");
  document.getElementById("player-cpu-timer-div")!.classList.add(currentPlayerDetails.class);
  document.getElementById("player-cpu-timer-div")!.style.backgroundImage = `url('./assets/turn-background-${currentPlayer === "you" ? "red" : "yellow"}.svg')`;
}

function restartGame() {
  const timerDiv = document.querySelector("#player-cpu-timer-div") as HTMLDivElement;
  timerDiv.classList.remove("cpu-class", "player-class");

  const holeDivs = document.querySelectorAll("div[data-state^='column-']");
  holeDivs.forEach((div) => {
    if (div.hasAttribute("data-played")) div.removeAttribute("data-played");
    if (div.hasAttribute("data-type")) div.removeAttribute("data-type");
    div.classList.remove("cpu-hole-class", "player-hole-class", "player-winner-holes");
  });

  if (document.querySelector("#play-again-text")) timerDiv.removeChild(document.querySelector("#play-again-text") as HTMLParagraphElement);
  if (document.querySelector("#play-again-inner-div")) timerDiv.removeChild(document.querySelector("#play-again-inner-div") as HTMLDivElement);
  if (document.querySelector("#game-player-turn")) timerDiv.removeChild(document.querySelector("#game-player-turn") as HTMLParagraphElement);
  if (document.querySelector("#game-player-time")) timerDiv.removeChild(document.querySelector("#game-player-time") as HTMLHeadingElement);
  timerDiv.classList.remove("play-again-class");

  const pNew = document.createElement("p");
  pNew.setAttribute("class", "game-timer-topic");
  pNew.setAttribute("id", "game-player-turn");

  const h1New = document.createElement("h1");
  h1New.setAttribute("class", "gamer-timer-count");
  h1New.setAttribute("id", "game-player-time");
  h1New.innerText = "30s";

  timerDiv.append(pNew, h1New);

  winner = "";
}

function quitGame() {
  restartGame();
  playerScores = { cpu: 0, you: 0 };

  document.getElementById("game-player-left-score")!.innerText = `${playerScores.you}`;
  document.getElementById("game-player-right-score")!.innerText = `${playerScores.you}`;
}

export function restartButtonFunction(player: "you" | "cpu") {
  quitGame();

  currentPlayer = player;
  lastGameStarter = player;

  playGame();
}

export function exitButtonFunction() {
  quitGame();

  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers = [];

  showSections("landing-section");
}

function updatePlayAgainDiv(winnerText: "you" | "cpu" | "") {
  const timerDiv = document.querySelector("#player-cpu-timer-div") as HTMLDivElement;
  timerDiv.classList.remove("cpu-class", "player-class");
  if (document.querySelector("#game-player-turn")) timerDiv.removeChild(document.querySelector("#game-player-turn") as HTMLParagraphElement);
  if (document.querySelector("#game-player-time")) timerDiv.removeChild(document.querySelector("#game-player-time") as HTMLHeadingElement);
  timerDiv.classList.add("play-again-class");

  const p = document.createElement("p");
  p.setAttribute("id", "play-again-text");
  p.innerText = winnerText;

  const div = document.createElement("div");
  div.setAttribute("id", "play-again-inner-div");

  const h1 = document.createElement("h1");
  h1.setAttribute("id", "play-again-topic");
  h1.innerText = winnerText === "cpu" ? "WINS" : "WIN";

  const button = document.createElement("button");
  button.setAttribute("id", "play-again-button");
  button.innerText = "PLAY AGAIN";
  button.onclick = () => {
    restartGame();

    lastGameStarter = lastGameStarter === "you" ? "cpu" : "you";
    currentPlayer = lastGameStarter;

    playGame();
  };

  div.append(h1, button);
  timerDiv.append(p, div);
}

let activeTimers: number[] = [];

function playGame() {
  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers = [];

  updateGameDetails();

  let cpuTime: number;
  if (currentPlayer === "cpu") {
    cpuTime = Math.floor(Math.random() * 10) + 1;
  }

  for (let i = 30; i >= 0; i--) {
    const timerId = setTimeout(() => {
      if (i === 0) {
        if (currentPlayer === "you") {
          playerScores = { ...playerScores, cpu: playerScores.cpu + 1 };
          document.getElementById("game-player-right-score")!.innerText = `${playerScores.cpu}`;
          winner = "cpu";
        } else if (currentPlayer === "cpu") {
          playerScores = { ...playerScores, you: playerScores.you + 1 };
          document.getElementById("game-player-left-score")!.innerText = `${playerScores.you}`;
          winner = "you";
        }

        updatePlayAgainDiv(winner);
      }

      if (currentPlayer === "cpu" && i === 30 - cpuTime) {
        const columnDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll(`div[data-state="column-${Math.floor(Math.random() * 7) + 1}"]`);

        colorNewHole("cpu", columnDivs);
      }

      if (document.getElementById("game-player-time")) document.getElementById("game-player-time")!.innerText = `${i}s`;
    }, (30 - i) * 1000);

    activeTimers.push(timerId);
  }

  holeHoverEffect();
}

export const gameFunctionality = (player: "you" | "cpu") => {
  (() => {
    for (let i = 1; i < 8; i++) {
      const columnDivs = document.querySelectorAll(`div[data-state="column-${i}"]`);

      columnDivs.forEach((div) => {
        div.classList.add(`column-${i}`);
      });
    }
  })();

  currentPlayer = player;
  lastGameStarter = player;

  updateGameDetails();

  setTimeout(() => {
    playGame();
  }, 3000);
};
