import "./styles/style.css";
import { ButtonClass } from "./components/ButtonClass";
import { RulesClass } from "./components/RulesClass";
import { showSections } from "./utils/showSections";
import { GamePageClass } from "./components/GamePageClass";

type ButtonType = {
  text: string;
  backgroundStyle: string;
  functionValue: string;
  image?: string;
  alt?: string;
  textStyle?: string;
};

const buttonsDetails: ButtonType[] = [
  { text: "player vs cpu", backgroundStyle: "#FF5A84", functionValue: "player-cpu-section", image: "./assets/player-vs-cpu.svg", alt: "Player CPU", textStyle: "#FFFFFF" },
  { text: "player vs player", backgroundStyle: "#FFD35A", functionValue: "player-player-section", image: "./assets/player-vs-player.svg", alt: "Player Player" },
  { text: "game rules", backgroundStyle: "#FFFFFF", functionValue: "rules-section" },
];

buttonsDetails.forEach((button: ButtonType): void => {
  const buttonElement: ButtonClass = new ButtonClass(button.text, button.backgroundStyle, button.functionValue, button.image, button.alt, button.textStyle);
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
  menuButtonId: string;
  restartButtonId: string;
  playerDetails: { playerLogo: string; playeLogoId: string; playerLogoAlt: string; playerName: string; playerScoreId: string }[];
  gamePlayerTurnId: string;
  gameTimerId: string;
}

const playerCpuPageDetails: GamePageInterface = {
  pageId: "player-cpu-section",
  menuButtonId: "game-menu-button",
  restartButtonId: "game-restart-button",
  playerDetails: [
    { playerLogo: "./assets/player-one.svg", playeLogoId: "game-player-icon-left", playerLogoAlt: "Player 1", playerName: "you", playerScoreId: "game-player-left-score" },
    { playerLogo: "./assets/cpu.svg", playeLogoId: "game-player-icon-right", playerLogoAlt: "CPU", playerName: "cpu", playerScoreId: "game-player-right-score" },
  ],
  gamePlayerTurnId: "game-player-turn",
  gameTimerId: "game-player-time",
};

const playerCpuObject = new GamePageClass(playerCpuPageDetails.pageId, playerCpuPageDetails.menuButtonId, playerCpuPageDetails.restartButtonId, playerCpuPageDetails.playerDetails, playerCpuPageDetails.gamePlayerTurnId, playerCpuPageDetails.gameTimerId);
playerCpuObject.render();
