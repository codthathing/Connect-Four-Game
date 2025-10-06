const main = document.querySelector("#rules-main") as HTMLDivElement;

export class RulesClass {
  constructor(private type: string, private header: string, private list: { id?: string; text: string }[]) {}

  render() {
    const div = document.createElement("div");
    div.setAttribute("class", "rules-div");

    const h3 = document.createElement("h3");
    h3.innerText = this.header;
    h3.setAttribute("class", "rules-div-head");

    div.append(h3);

    if (this.type === "text") {
      this.list.map(({ text }) => {
        const p = document.createElement("p");
        p.setAttribute("class", "rules-div-text");
        p.innerText = text;

        div.append(p);
      });
    } else {
      const ul = document.createElement("ul");
      ul.setAttribute("id", "rules-list");

      this.list.map(({ id, text }) => {
        const li = document.createElement("li");
        li.setAttribute("class", "rules-list-item");

        const span = document.createElement("span");
        span.setAttribute("class", "rules-div-number");
        span.innerText = id || "";

        const p = document.createElement("p");
        p.setAttribute("class", "rules-div-text");
        p.innerText = text;

        li.append(span, p);
        ul.append(li);
      });

      div.append(ul);
    }

    main.append(div);
  }
}
