export const showPlayerCpuSections = (section: string) => {
  sessionStorage.setItem("CURRENT_PLAYER_CPU_SECTION", section);

  const formMainElement = document.querySelector("#player-cpu-form-main") as HTMLElement;
  const gameMainElement = document.querySelector("#player-cpu-section-main") as HTMLElement;

  if (section) {
    formMainElement.style.display = section === "player-cpu-form" ? "flex" : "none";
    gameMainElement.style.display = section === "player-cpu-section" ? "flex" : "none";
  }
}
