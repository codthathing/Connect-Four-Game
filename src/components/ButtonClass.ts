const landingButtonsDiv = document.querySelector("#landing-buttons-div") as HTMLDivElement;

export class ButtonClass {
  constructor(readonly text: string, readonly backgroundStyle: string, readonly image?: string, readonly alt?: string, readonly textStyle?: string) {}

  render() {
    const div = document.createElement("div");
    div.setAttribute("class", "landing-buttons");
    div.style.backgroundColor = this.backgroundStyle;

    const span = document.createElement("span");
    span.setAttribute("class", "landing-buttons-text");
    span.textContent = this.text;
    if (this.textStyle) span.style.color = this.textStyle;
    div.append(span);

    if (this.image && this.alt) {
      const image = document.createElement("img");
      image.setAttribute("src", this.image);
      image.setAttribute("class", "landing-buttons-image");
      image.setAttribute("alt", this.alt);
      div.append(image);
    }

    landingButtonsDiv.append(div);
  }
}
