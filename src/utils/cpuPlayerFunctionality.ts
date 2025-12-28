function checkLastColumn(no: number) {
  return no % 7 === 0 ? 7 : no % 7;
}

function getNextPossibleStep(innerArrayLength: number, arrays: number[][], type: "you" | "cpu") {
  const possibleStepsArray: number[] = [];

  for (const array of arrays) {
    if (innerArrayLength > 1) {
      const calculation = (checkLastColumn(array[0]) > checkLastColumn(array[1]) && "decrease") || (checkLastColumn(array[0]) < checkLastColumn(array[1]) && "increase") || (checkLastColumn(array[0]) === checkLastColumn(array[1]) && "equal");

      let i = 0;

      switch (calculation) {
        case "decrease":
          while (i < array.length) {
            if (array[i + 1]) {
              if (checkLastColumn(array[i]) - checkLastColumn(array[i + 1]) === 2) {
                possibleStepsArray.push((checkLastColumn(array[i]) + checkLastColumn(array[i + 1])) / 2);
                break;
              } else if (checkLastColumn(array[i]) - checkLastColumn(array[i + 1]) === 3) {
                possibleStepsArray.push(...Array.from({ length: checkLastColumn(array[i]) - checkLastColumn(array[i + 1]) - 1 }, (_, j) => j + checkLastColumn(array[i + 1]) + 1));
                break;
              }
            } else {
              if (type === "you" && ((array[0] - array[1] === 8 && !(document.querySelector(`div[data-hole="${array[i] - 1}"]`) as HTMLDivElement).hasAttribute("data-played")) || (array[1] - array[0] === 6 && !(document.querySelector(`div[data-hole="${array[i] + 13}"]`) as HTMLDivElement).hasAttribute("data-played")))) {
                break;
              } else {
                possibleStepsArray.push(checkLastColumn(array[i]) - 1);
              }
            }

            i++;
          }

          break;
        case "increase":
          while (i < array.length) {
            if (array[i + 1]) {
              if (checkLastColumn(array[i + 1]) - checkLastColumn(array[i]) === 2) {
                possibleStepsArray.push((checkLastColumn(array[i]) + checkLastColumn(array[i + 1])) / 2);
                break;
              } else if (checkLastColumn(array[i + 1]) - checkLastColumn(array[i]) === 3) {
                possibleStepsArray.push(...Array.from({ length: checkLastColumn(array[i + 1]) - checkLastColumn(array[i]) - 1 }, (_, j) => j + checkLastColumn(array[i]) + 1));
                break;
              }
            } else {
              if (type === "you" && ((array[0] - array[1] === 6 && !(document.querySelector(`div[data-hole="${array[i] + 1}"]`) as HTMLDivElement).hasAttribute("data-played")) || (array[1] - array[0] === 8 && !(document.querySelector(`div[data-hole="${array[i] + 15}"]`) as HTMLDivElement).hasAttribute("data-played")))) {
                break;
              } else {
                possibleStepsArray.push(checkLastColumn(array[i]) + 1);
              }
              break;
            }

            i++;
          }

          break;
        case "equal":
          possibleStepsArray.push(checkLastColumn(array[0]));
          break;
      }
    } else {
      const columnValue = array[0];
      if (checkLastColumn(columnValue) > 1) possibleStepsArray.push(checkLastColumn(columnValue - 1));
      if (checkLastColumn(columnValue) < 7) possibleStepsArray.push(checkLastColumn(columnValue + 1));
      possibleStepsArray.push(checkLastColumn(columnValue + 7));
    }
  }

  return possibleStepsArray;
}

export function determineCpuPlay(gameLevel: "easy" | "regular" | "hard", presentHoles: number[], gameConditions: (no: number) => { name: string; condition: boolean; calculation: (i: number) => number }[]) {
  switch (gameLevel) {
    case "easy":
      return Math.floor(Math.random() * 7) + 1;
    case "regular":
      if (presentHoles.length < 2) return Math.floor(Math.random() * 7) + 1;

      const possibleNextStep: HTMLDivElement[][] = [];

      for (const holeNumber of presentHoles) {
        const possibleConditions = gameConditions(holeNumber);

        const presentDiv = document.querySelector(`div[data-hole="${holeNumber}"]`) as HTMLDivElement;

        for (const { condition, calculation } of possibleConditions) {
          if (!condition) continue;

          const tempMatchingDivs: HTMLDivElement[] = [presentDiv];

          for (let i = 1; i <= 3; i++) {
            const nextElement = document.querySelector(`div[data-hole='${calculation(i)}']`) as HTMLDivElement;

            if (nextElement.hasAttribute("data-played") && presentDiv.getAttribute("data-type") === nextElement.getAttribute("data-type")) {
              tempMatchingDivs.push(nextElement);
            } else if (nextElement.hasAttribute("data-played") && presentDiv.getAttribute("data-type") !== nextElement.getAttribute("data-type")) {
              break;
            }

            if (i === 3) possibleNextStep.push(tempMatchingDivs);
          }
        }
      }

      function getLongestWinners(type: "you" | "cpu") {
        const possibleStepsNumber = possibleNextStep.map((elements) => elements.map((div) => Number(div.getAttribute("data-hole"))));

        const possibleWinners = possibleStepsNumber.filter((divs) => divs.some((div) => (document.querySelector(`div[data-hole="${div}"]`) as HTMLDivElement).getAttribute("data-type") === type));

        const possibleLongestWinners = Math.max(...possibleWinners.map((array) => array.length));

        return { longestArrays: possibleWinners.filter((array) => array.length === possibleLongestWinners), longestLength: possibleLongestWinners };
      }

      const { longestArrays: possibleCpuArrays, longestLength: longestCpuArray } = getLongestWinners("cpu");
      const { longestArrays: possibleYouArrays, longestLength: longestYouArray } = getLongestWinners("you");

      if (!possibleCpuArrays && !possibleYouArrays) return Math.floor(Math.random() * 7) + 1;

      const possibleCpuWinnerArray = getNextPossibleStep(longestCpuArray, possibleCpuArrays, "cpu");
      const possibleYouWinnerArray = getNextPossibleStep(longestYouArray, possibleYouArrays, "you");

      if (longestCpuArray === 3 || (possibleCpuArrays && longestYouArray !== 3)) return possibleCpuWinnerArray[Math.floor(Math.random() * possibleCpuWinnerArray.length)];

      if (Boolean(possibleYouWinnerArray.length !== 0)) return possibleYouWinnerArray[Math.floor(Math.random() * possibleYouWinnerArray.length)];

      return possibleCpuWinnerArray[Math.floor(Math.random() * possibleCpuWinnerArray.length)];
    case "hard":
      return 0;
  }
}
