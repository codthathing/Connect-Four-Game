let currentPlayer: "you" | "cpu";
const currentPlayersDetails: { you: { text: string; class: string; holeClass: string }; cpu: { text: string; class: string; holeClass: string } } = { you: { text: "your turn", class: "player-class", holeClass: "player-hole-class" }, cpu: { text: "cpu's turn", class: "cpu-class", holeClass: "cpu-hole-class" } };

let hoverEffectsInitialized = false;
function holeHoverEffect() {
  if (hoverEffectsInitialized) return;
  hoverEffectsInitialized = true;

  for (let i = 1; i < 8; i++) {
    const columnDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll(`div[data-state="column-${i}"]`);
    const firstDiv = columnDivs[0] as HTMLDivElement;

    changeHoleBGColor(columnDivs);

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

const presentHoles: number[] = [];

function changeHoleBGColor(columnDivs: NodeListOf<HTMLDivElement>) {
  columnDivs.forEach((div) => {
    div.addEventListener("click", () => {
      const lastDivType: string = currentPlayersDetails[currentPlayer]["holeClass"];

      const divsNotPlayed = Array.from(columnDivs).filter((div) => !div.hasAttribute("data-played"));

      if (divsNotPlayed.length > 0) {
        const lastDiv = divsNotPlayed[divsNotPlayed.length - 1];

        lastDiv.setAttribute("data-played", "true");
        lastDiv.setAttribute("data-type", currentPlayer);
        lastDiv.classList.add(lastDivType);

        presentHoles.push(Number(lastDiv.getAttribute("data-hole")));
        checkWinner();

        currentPlayer = currentPlayer === "you" ? "cpu" : "you";
        playGame();
      }
    });
  });
}

function updateGameDetails() {
  const currentPlayerDetails: { text: string; class: string; holeClass: string } = currentPlayersDetails[currentPlayer];

  document.getElementById("game-player-turn")!.innerText = currentPlayerDetails.text;
  document.getElementById("player-cpu-timer-div")!.classList.remove(currentPlayer === "you" ? "cpu-class" : "player-class");
  document.getElementById("player-cpu-timer-div")!.classList.add(currentPlayerDetails.class);
}

let activeTimers: number[] = [];
function playGame() {
  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers = [];

  updateGameDetails();

  for (let i = 30; i >= 0; i--) {
    const timerId = setTimeout(() => {
      if (i === 0) {
        if (currentPlayer === "you") {
          document.getElementById("game-player-right-score")!.innerText = "1";
          currentPlayer = "cpu";
        } else if (currentPlayer === "cpu") {
          document.getElementById("game-player-left-score")!.innerText = "1";
          currentPlayer = "you";
        }
        playGame();
      }

      document.getElementById("game-player-time")!.innerText = `${i}s`;
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
  updateGameDetails();

  setTimeout(() => {
    playGame();
  }, 3000);
};

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
        matchingDivs = [];
        break;
      }
    }

    if (tempMatchingDivs.length === 4) {
      matchingDivs.push(...tempMatchingDivs);

      return;
    }
  }
}

function checkWinner() {
  let presentMatchingDivs: HTMLDivElement[] = [];

  presentHoles.forEach((divNo) => {
    const presentDiv = document.querySelector(`div[data-hole='${divNo}']`) as HTMLDivElement;

    winnerConditions(presentMatchingDivs, presentDiv, divNo);
  });
}
