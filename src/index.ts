import "./styles/style.css";
import { ButtonClass } from "./components/ButtonClass";
import { RulesClass } from "./components/RulesClass";
import { showSections } from "./utils/showSections";

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


const boardPlayerSection = document.querySelector("#game-board-player-section") as HTMLDivElement;
for (let i = 0; i < 7 * 6; i++) {
  const div = document.createElement("div");
  div.setAttribute("class", "game-board-hole");

  boardPlayerSection.append(div);
}
