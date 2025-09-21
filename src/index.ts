import { ButtonClass } from "./components/ButtonClass";

type ButtonType = {
  text:string, 
  backgroundStyle: string,
  image?: string, 
  alt?: string ,
  textStyle?: string
};

const buttonsDetails: ButtonType[] = [
  { text: "player vs cpu", backgroundStyle: "#FF5A84", image: "./assets/player-vs-cpu.svg", alt: "Player CPU", textStyle: "#FFFFFF" },
  { text: "player vs player", backgroundStyle: "#FFD35A", image: "./assets/player-vs-player.svg", alt: "Player Player" },
  { text: "game rules", backgroundStyle: "#FFFFFF" },
];

buttonsDetails.forEach((button: ButtonType) : void => {
  const buttonElement: ButtonClass = new ButtonClass(button.text, button.backgroundStyle, button.image, button.alt, button.textStyle);
  buttonElement.render();
})