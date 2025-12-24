import { ButtonClass } from "./components/ButtonClass";
import { RulesClass } from "./components/RulesClass";
import { showSections } from "./utils/showSections";
import { GamePageClass } from "./components/GamePageClass";
import { MenuButtonClass } from "./components/MenuButtonClass";
import { FormClass } from "./components/FormClass";
import { exitButtonFunction, gameFunctionality, restartButtonFunction } from "./utils/gameFunctionality";
import { showPlayerCpuSections } from "./utils/showPlayerCpuSections";

const currentPage = sessionStorage.getItem("CURRENT_PAGE") || "landing-section";
showSections(currentPage);

type ButtonType = {
  text: string;
  backgroundStyle: string;
  functionValue: string;
  image?: string;
  alt?: string;
  textStyle?: string;
  buttonFunction?: () => void;
};

const buttonsDetails: ButtonType[] = [
  { text: "player vs cpu", backgroundStyle: "#FF5A84", functionValue: "player-cpu-section", image: "./assets/player-vs-cpu.svg", alt: "Player CPU", textStyle: "#FFFFFF", buttonFunction: () => showPlayerCpuSections("player-cpu-form") },
  { text: "player vs player", backgroundStyle: "#FFD35A", functionValue: "player-player-section", image: "./assets/player-vs-player.svg", alt: "Player Player" },
  { text: "game rules", backgroundStyle: "#FFFFFF", functionValue: "rules-section" },
];

buttonsDetails.forEach(({ text, backgroundStyle, functionValue, image, alt, textStyle, buttonFunction }): void => {
  const buttonElement: ButtonClass = new ButtonClass(text, backgroundStyle, functionValue, image, alt, textStyle, buttonFunction);
  buttonElement.render();
});

type RulesType = {
  header: string;
  list: { id?: string; text: string }[];
  type: string;
};

const rulesDetails: RulesType[] = [
  { type: "text", header: "objective", list: [{ text: "Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally)." }] },
  {
    type: "list",
    header: "how to play",
    list: [
      { id: "1", text: "Red goes first in the first game." },
      { id: "2", text: "Players must alternate turns and only one disc can be dropped in each turn." },
      { id: "3", text: "The game ends when there is a 4-in-a-row or a stalemate." },
      { id: "4", text: "The starter of the previous game goes second on the next game." },
    ],
  },
];

rulesDetails.forEach(({ type, header, list }: RulesType) => {
  const rulesElement = new RulesClass(type, header, list);
  rulesElement.render();
});

const rulesButton = document.querySelector("#rules-button") as HTMLButtonElement;
rulesButton.onclick = () => showSections("landing-section");

interface GamePageInterface {
  pageId: string;
  mainId: string;
  menuButtonFunction: () => void;
  restartButtonFunction: () => void;
  playerDetails: { playerLogo: string; playeLogoId: string; playerLogoAlt: string; playerName: string; playerScoreId: string }[];
  gameTimerDivId: string;
  gamePlayerTurnId: string;
  gameTimerId: string;
}

const playerCpuPageDetails: GamePageInterface = {
  pageId: "player-cpu-section",
  mainId: "player-cpu-section-main",
  menuButtonFunction: () => (document.getElementById("menu-section")!.style.display = "flex"),
  restartButtonFunction: () => restartButtonFunction("you"),
  playerDetails: [
    { playerLogo: "./assets/player-one.svg", playeLogoId: "game-player-icon-left", playerLogoAlt: "Player 1", playerName: "you", playerScoreId: "game-player-left-score" },
    { playerLogo: "./assets/cpu.svg", playeLogoId: "game-player-icon-right", playerLogoAlt: "CPU", playerName: "cpu", playerScoreId: "game-player-right-score" },
  ],
  gameTimerDivId: "player-cpu-timer-div",
  gamePlayerTurnId: "game-player-turn",
  gameTimerId: "game-player-time",
};

const playerCpuObject = new GamePageClass(playerCpuPageDetails.pageId, playerCpuPageDetails.mainId, playerCpuPageDetails.menuButtonFunction, playerCpuPageDetails.restartButtonFunction, playerCpuPageDetails.playerDetails, playerCpuPageDetails.gameTimerDivId, playerCpuPageDetails.gamePlayerTurnId, playerCpuPageDetails.gameTimerId);
playerCpuObject.render();

const menuButtonDetails: { buttonText: string; buttonFunction: () => void }[] = [
  { buttonText: "continue game", buttonFunction: () => (document.getElementById("menu-section")!.style.display = "none") },
  {
    buttonText: "restart",
    buttonFunction: () => {
      document.getElementById("menu-section")!.style.display = "none";
      restartButtonFunction("you");
    },
  },
  {
    buttonText: "quit game",
    buttonFunction: () => {
      document.getElementById("menu-section")!.style.display = "none";
      exitButtonFunction();
      if (currentPage === "player-cpu-section") {
        sessionStorage.removeItem("CURRENT_PLAYER_CPU_SECTION");
        sessionStorage.removeItem("GAME_LEVEL");
      }
    },
  },
];

menuButtonDetails.forEach(({ buttonText, buttonFunction }) => {
  const newButtonObject = new MenuButtonClass(buttonText, buttonFunction);
  newButtonObject.render();
});

let gameLevel: "easy" | "regular" | "hard" = (sessionStorage.getItem("GAME_LEVEL") as "easy" | "regular" | "hard") || "easy";

const pageFormDetails: { pageId: string; mainId: string; backButtonFunction: () => void; selects: { selectId: string; selectOptions: { optionValue: string; optionIcon?: string; optionText: string }[] }[]; buttonText: string; buttonFunction?: () => void; inputs?: { type: string; inputId: string; placeholder: string }[] }[] = [
  {
    pageId: "player-player-section",
    mainId: "player-player-form-main",
    backButtonFunction: () => {},
    selects: [
      {
        selectId: "player-round",
        selectOptions: [
          { optionValue: "", optionText: "Please select # of rounds" },
          { optionValue: "1", optionIcon: "1️⃣", optionText: "One Round" },
          { optionValue: "2", optionIcon: "2️⃣", optionText: "Two Rounds" },
          { optionValue: "3", optionIcon: "3️⃣", optionText: "Three Rounds" },
          { optionValue: "4", optionIcon: "4️⃣", optionText: "Four Rounds" },
          { optionValue: "5", optionIcon: "5️⃣", optionText: "Five Rounds" },
          { optionValue: "unlimited", optionIcon: "♾️", optionText: "Unlimited Rounds" },
        ],
      },
    ],
    buttonText: "create game",
    inputs: [{ type: "text", inputId: "", placeholder: "Enter your name" }],
  },
  {
    pageId: "player-cpu-section",
    mainId: "player-cpu-form-main",
    backButtonFunction: () => sessionStorage.removeItem("CURRENT_PLAYER_CPU_SECTION"),
    selects: [
      {
        selectId: "game-difficulty-level",
        selectOptions: [
          { optionValue: "easy", optionText: "Select game difficulty level (default Easy)" },
          { optionValue: "easy", optionIcon: "🪶", optionText: "Easy" },
          { optionValue: "regular", optionIcon: "🛡️", optionText: "Regular" },
          { optionValue: "hard", optionIcon: "🔥", optionText: "Hard" },
        ],
      },
    ],
    buttonText: "start game",
    buttonFunction: () => {
      showPlayerCpuSections("player-cpu-section");

      gameLevel = (document.getElementById("game-difficulty-level-select") as HTMLSelectElement).value as "easy" | "regular" | "hard";
      sessionStorage.setItem("GAME_LEVEL", gameLevel);

      gameFunctionality("you", gameLevel);
    },
  },
];

pageFormDetails.forEach(({ pageId, mainId, backButtonFunction, selects, buttonText, buttonFunction, inputs }) => {
  const newSelectObject = new FormClass(pageId, mainId, backButtonFunction, selects, buttonText, buttonFunction, inputs);
  newSelectObject.render();
});

if (currentPage === "player-cpu-section") {
  const currentSection = sessionStorage.getItem("CURRENT_PLAYER_CPU_SECTION")!;

  showPlayerCpuSections(currentSection);
  if (currentSection === "player-cpu-section") gameFunctionality("you", gameLevel);
}

const arrays = [[3], [1], [4], [6], [7]];

function checkLastColumn(no: number) {
  return no % 7 === 0 ? 7 : no % 7;
}

for (const array of arrays) {
  if (1 > 1) {
    const calculation = (checkLastColumn(array[0]) > checkLastColumn(array[1]) && "decrease") || (checkLastColumn(array[0]) < checkLastColumn(array[1]) && "increase") || (checkLastColumn(array[0]) === checkLastColumn(array[1]) && "equal");

    let i = 0;

    switch (calculation) {
      case "decrease":
        while (i < array.length) {
          if (array[i + 1]) {
            if (checkLastColumn(array[i]) - checkLastColumn(array[i + 1]) === 2) {
              console.log((checkLastColumn(array[i]) + checkLastColumn(array[i + 1])) / 2);
              break;
            } else if (checkLastColumn(array[i]) - checkLastColumn(array[i + 1]) === 3) {
              console.log(Array.from({ length: checkLastColumn(array[i]) - checkLastColumn(array[i + 1]) - 1 }, (_, j) => j + checkLastColumn(array[i + 1]) + 1));
              break;
            }
          } else {
            console.log(checkLastColumn(array[i]) - 1);
            break;
          }

          i++;
        }

        break;
      case "increase":
        while (i < array.length) {
          if (array[i + 1]) {
            if (checkLastColumn(array[i + 1]) - checkLastColumn(array[i]) === 2) {
              console.log((checkLastColumn(array[i]) + checkLastColumn(array[i + 1])) / 2);
              break;
            } else if (checkLastColumn(array[i + 1]) - checkLastColumn(array[i]) === 3) {
              console.log(Array.from({ length: checkLastColumn(array[i + 1]) - checkLastColumn(array[i]) - 1 }, (_, j) => j + checkLastColumn(array[i]) + 1));
              break;
            }
          } else {
            console.log(checkLastColumn(array[i]) + 1);
            break;
          }

          i++;
        }

        break;
      case "equal":
        console.log(checkLastColumn(array[0]));
        break;
    }
  } else {
    const columnValue = array[0];
    if (checkLastColumn(columnValue) > 1) console.log(checkLastColumn(columnValue - 1));
    if (checkLastColumn(columnValue) < 7) console.log(checkLastColumn(columnValue + 1));
    console.log(checkLastColumn(columnValue + 7));
  }
}
