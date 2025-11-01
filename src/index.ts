import "./styles/style.css";
import { ButtonClass } from "./components/ButtonClass";
import { RulesClass } from "./components/RulesClass";
import { showSections } from "./utils/showSections";
import { GamePageClass } from "./components/GamePageClass";
import { MenuButtonClass } from "./components/MenuButtonClass";
import { FormSelectClass } from "./components/FormSelectClass";
import { gameFunctionality } from "./utils/gameFunctionality";
import { styleColumnElements } from "./utils/styleColumnElement";

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
  { text: "player vs cpu", backgroundStyle: "#FF5A84", functionValue: "player-cpu-section", image: "./assets/player-vs-cpu.svg", alt: "Player CPU", textStyle: "#FFFFFF", buttonFunction: gameFunctionality },
  { text: "player vs player", backgroundStyle: "#FFD35A", functionValue: "player-player-section", image: "./assets/player-vs-player.svg", alt: "Player Player" },
  { text: "game rules", backgroundStyle: "#FFFFFF", functionValue: "rules-section" },
];

buttonsDetails.forEach((button: ButtonType): void => {
  const buttonElement: ButtonClass = new ButtonClass(button.text, button.backgroundStyle, button.functionValue, button.image, button.alt, button.textStyle, button.buttonFunction);
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
  menuButtonFunction: () => void;
  restartButtonFunction: () => void;
  playerDetails: { playerLogo: string; playeLogoId: string; playerLogoAlt: string; playerName: string; playerScoreId: string }[];
  gamePlayerTurnId: string;
  gameTimerId: string;
}

const playerCpuPageDetails: GamePageInterface = {
  pageId: "player-cpu-section",
  menuButtonFunction: () => (document.getElementById("menu-section")!.style.display = "flex"),
  restartButtonFunction: () => {},
  playerDetails: [
    { playerLogo: "./assets/player-one.svg", playeLogoId: "game-player-icon-left", playerLogoAlt: "Player 1", playerName: "you", playerScoreId: "game-player-left-score" },
    { playerLogo: "./assets/cpu.svg", playeLogoId: "game-player-icon-right", playerLogoAlt: "CPU", playerName: "cpu", playerScoreId: "game-player-right-score" },
  ],
  gamePlayerTurnId: "game-player-turn",
  gameTimerId: "game-player-time",
};

const playerCpuObject = new GamePageClass(playerCpuPageDetails.pageId, playerCpuPageDetails.menuButtonFunction, playerCpuPageDetails.restartButtonFunction, playerCpuPageDetails.playerDetails, playerCpuPageDetails.gamePlayerTurnId, playerCpuPageDetails.gameTimerId);
playerCpuObject.render();

const menuButtonDetails: { buttonText: string; buttonFunction: () => void }[] = [
  { buttonText: "continue game", buttonFunction: () => (document.getElementById("menu-section")!.style.display = "none") },
  { buttonText: "restart", buttonFunction: () => {} },
  {
    buttonText: "quit game",
    buttonFunction: () => {
      document.getElementById("menu-section")!.style.display = "none";
      showSections("landing-section");
    },
  },
];

menuButtonDetails.forEach(({ buttonText, buttonFunction }) => {
  const newButtonObject = new MenuButtonClass(buttonText, buttonFunction);
  newButtonObject.render();
});

const formSelectDetails: { selectId: string; selectTopic: string; optionDetails: { optionValue: string; optionIcon: string; optionText: string }[] }[] = [
  {
    selectId: "player-round",
    selectTopic: "Please select # of rounds",
    optionDetails: [
      { optionValue: "1", optionIcon: "1️⃣", optionText: "One Round" },
      { optionValue: "2", optionIcon: "2️⃣", optionText: "Two Rounds" },
      { optionValue: "3", optionIcon: "3️⃣", optionText: "Three Rounds" },
      { optionValue: "4", optionIcon: "4️⃣", optionText: "Four Rounds" },
      { optionValue: "5", optionIcon: "5️⃣", optionText: "Five Rounds" },
      { optionValue: "unlimited", optionIcon: "♾️", optionText: "Unlimited Rounds" },
    ],
  },
];

formSelectDetails.forEach(({ selectId, selectTopic, optionDetails }) => {
  const newSelectObject = new FormSelectClass(selectId, selectTopic, optionDetails);
  newSelectObject.render();
})

document.getElementById("game-create-button")?.addEventListener("click", () => showSections("landing-section"))

window.addEventListener("load", () => {
  if (currentPage === "player-cpu-section") styleColumnElements();
})