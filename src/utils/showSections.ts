export const showSections = (section: string) => {
  const rulesSection = document.querySelector("#rules-section") as HTMLDivElement;
  const landingSection = document.querySelector("#landing-section") as HTMLDivElement;

  if (section) {
    rulesSection.style.display = section === "rules-section" ? "block" : "none";
    landingSection.style.display = section === "landing-section" ? "flex" : "none";
  }
};
