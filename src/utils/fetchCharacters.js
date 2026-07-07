import { charactersData } from "../data/characters";
export function fetchCharacters() {
return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;
      if (shouldFail) {
        reject(new Error("Failed to reach the Survey Corps archives."));
      } else {
        resolve(charactersData);
      }
    }, 1200); 
  });
}