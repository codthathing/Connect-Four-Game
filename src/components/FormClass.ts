import { showSections } from "../utils/showSections";

export class FormClass {
  constructor(private pageId: string, private mainId: string, private backButtonFunction: () => void, private selects: { selectId: string; selectOptions: { optionValue: string; optionIcon?: string; optionText: string }[] }[], private buttonText: string, private buttonFunction?: () => void, private inputs?: { type: string; inputId: string; placeholder: string }[]) {}

  render() {
    const main = document.createElement("main");
    main.setAttribute("class", "player-create-main");
    main.setAttribute("id", this.mainId);

    const button = document.createElement("button");
    button.setAttribute("class", "game-player-buttons");
    button.innerText = "BACK";
    button.onclick = () => {
      showSections("landing-section");
      this.backButtonFunction();
    };

    const div = document.createElement("div");
    div.setAttribute("class", "player-create-div");

    const form = document.createElement("form");
    form.setAttribute("class", "player-form");

    const inputDiv = document.createElement("div");
    inputDiv.setAttribute("class", "player-form-div");

    this.inputs?.forEach(({ type, inputId, placeholder }) => {
      const input = document.createElement("input");
      input.setAttribute("class", "player-form-input-field");
      input.setAttribute("type", type);
      input.setAttribute("id", inputId);
      input.setAttribute("placeholder", placeholder);

      inputDiv.append(input);
    });

    this.selects.forEach(({ selectId, selectOptions }) => {
      const select = document.createElement("select");
      select.setAttribute("id", `${selectId}-select`);

      const button = document.createElement("button");
      const selectedcontent = document.createElement("selectedcontent");

      button.append(selectedcontent);
      select.append(button);

      selectOptions.forEach(({ optionValue, optionIcon, optionText }) => {
        const option = document.createElement("option");
        option.setAttribute("value", optionValue);

        if (optionIcon) {
          const spanIcon = document.createElement("span");
          spanIcon.setAttribute("class", `${selectId}-icon`);
          spanIcon.setAttribute("aria-hidden", "true");
          spanIcon.innerText = optionIcon;

          const spanText = document.createElement("span");
          spanText.setAttribute("class", `${selectId}-label`);
          spanText.innerText = optionText;

          option.append(spanIcon, spanText);
        } else {
          option.innerText = optionText;
        }

        select.append(option);
      });

      inputDiv.append(select);
    });

    const input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", this.buttonText);
    input.setAttribute("class", "player-form-button");
    if (this.buttonFunction) input.onclick = () => this.buttonFunction!();

    form.append(inputDiv, input);
    div.append(form);
    main.append(button, div);

    document.getElementById(this.pageId)?.append(main);
  }
}
