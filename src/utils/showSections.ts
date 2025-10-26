export const showSections = (section: string) => {
  const rulesSection = document.querySelector("#rules-section") as HTMLDivElement;
  const landingSection = document.querySelector("#landing-section") as HTMLDivElement;
  const playerPlayerSection = document.querySelector("#player-player-section") as HTMLDivElement;
  const playerCpuSection = document.querySelector("#player-cpu-section") as HTMLDivElement;

  if (section) {
    rulesSection.style.display = section === "rules-section" ? "block" : "none";
    landingSection.style.display = section === "landing-section" ? "flex" : "none";
    playerPlayerSection.style.display = section === "player-player-section" ? "block" : "none";
    playerCpuSection.style.display = section === "player-cpu-section" ? "block" : "none";
  }
};
