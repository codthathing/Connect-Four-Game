export const styleColumnElements = () => {
  for (let i = 1; i < 8; i++) {
    const columnDivs = document.querySelectorAll(`div[data-state="column-${i}"]`);
    columnDivs.forEach((div) => {
      div.classList.add(`column-${i}`);
    });
  }

  setTimeout(() => {
    for (let i = 1; i < 8; i++) {
      const columnDivs = document.querySelectorAll(`div[data-state="column-${i}"]`);
      const firstDiv = columnDivs[0] as HTMLDivElement;

      columnDivs.forEach((div) => {
        const img = document.createElement("img");
        img.setAttribute("src", "./assets/marker-red.svg");
        img.setAttribute("alt", "Current Column Marker");
        img.setAttribute("id", "player-column-marker");

        div.addEventListener("mouseenter", () => {
          firstDiv.classList.add("current-top");
          firstDiv.append(img);
        });

        div.addEventListener("mouseleave", () => {
          firstDiv.classList.remove("current-top");
          firstDiv.removeChild(img);
        });
      });
    }
  }, 3500);
};
