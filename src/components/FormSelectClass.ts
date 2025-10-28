const form = document.querySelector("#player-form-div") as HTMLFormElement;

export class FormSelectClass {
  constructor(private selectId: string, private selectTopic: string, private optionDetails: { optionValue: string; optionIcon: string; optionText: string }[]) {}

  render() {
    const select = document.createElement("select");
    select.setAttribute("id", `${this.selectId}-select`);

    const button = document.createElement("button");
    const selectedcontent = document.createElement("selectedcontent");

    button.append(selectedcontent);
    select.append(button);

    const option = document.createElement("option");
    option.setAttribute("value", "");
    option.innerText = this.selectTopic;

    select.append(option);

    this.optionDetails.forEach(({ optionValue, optionIcon, optionText }) => {
      const option = document.createElement("option");
      option.setAttribute("value", optionValue);

      const spanIcon = document.createElement("span");
      spanIcon.setAttribute("class", `${this.selectId}-icon`);
      spanIcon.setAttribute("aria-hidden", "true");
      spanIcon.innerText = optionIcon;

      const spanText = document.createElement("span");
      spanText.setAttribute("class", `${this.selectId}-label`);
      spanText.innerText = optionText;

      option.append(spanIcon, spanText);
      select.append(option);
    });

    form.append(select);
  }
}
