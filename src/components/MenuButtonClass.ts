const buttonsDiv = document.querySelector("#menu-button-div") as HTMLDivElement;

export class MenuButtonClass {
  constructor (
    private buttonText: string,
    private buttonFunction: () => void
  ){};

  render() {
    const button = document.createElement("button");
    button.setAttribute("class", "menu-buttons");
    button.innerText = this.buttonText;
    button.onclick = () => this.buttonFunction();

    buttonsDiv.append(button);
  }
}