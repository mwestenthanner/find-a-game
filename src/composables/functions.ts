import { Game } from "@/types";

export function randomizeTagColor(name: string): string {

    const firstChar = name.charAt(0).toLowerCase();
    const asciiCode = firstChar.charCodeAt(0);

    let color;

    switch (true) {
      case (asciiCode < 103):
        color = 'pink';
        break;
      case (103 <= asciiCode && asciiCode < 109):
        color = 'orange';
        break;
      case (109 <= asciiCode && asciiCode < 115):
        color = 'purple';
        break;
      default:
        color = 'red';
    }

    return color;

  }

export function parseApiData(data: Array<unknown> ): Array<Game> {

  const gameArray: Array<Game> = [];

  data.forEach(item => {
    gameArray.push(item as Game);
  })

  return gameArray;

}

export function parseGenres(data: Array<Game>): Array<string> {

  let genreList: Array<string> = [];

  data.forEach(game => {
    genreList = genreList.concat(game.genres);
  });

  return genreList.filter(function(item, pos) {
    return genreList.indexOf(item) == pos;
  }).sort();

}



