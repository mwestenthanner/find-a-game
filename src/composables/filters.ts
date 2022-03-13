import { FilterGroup, Game } from "@/types";

export function filterByPlaytime(list: Array<Game>, filters: FilterGroup): Array<Game> {
    return list.filter(item => {

        if (item.playtime >= filters.playtimeMin && item.playtime <= filters.playtimeMax) {
            return true;
        } else return false;
      
    })
}

export function filterByScore(list: Array<Game>, filters: FilterGroup): Array<Game> {
    return list.filter(item => {

        if (item.score >= filters.scoreMin && item.score <= filters.scoreMax) {
            return true;
        } else return false;
      
    })
}

export function filterByPlatform(list: Array<Game>, filters: FilterGroup): Array<Game> {

    if (filters.platforms.length == 0) {
        return list;
      }
  
    return list.filter(item => filters.platforms.includes(item.platform));

}

export function filterByGenres(list: Array<Game>, filters: FilterGroup): Array<Game> {

    if (filters.genres.length == 0) {
        return list;
      }

    return list.filter(item => {

        if(filters.genres.some(genre => item.genres.includes(genre)) == true) {
            return true;
        } else return false;
        
    });

}

export function filterComingSoon(list: Array<Game>, filters: FilterGroup): Array<Game> {
    return list.filter(item => item.comingSoon == filters.comingSoon)
}

export function filterLeavingSoon(list: Array<Game>, filters: FilterGroup): Array<Game> {
    return list.filter(item => item.leavingSoon == filters.leavingSoon)
}

export function filterByAll(list: Array<Game>, filters: FilterGroup): Array<Game> {

    return filterByPlaytime(filterByScore(filterByPlatform(filterByGenres(filterComingSoon(filterLeavingSoon(list, filters), filters), filters), filters), filters), filters);

}

export function sortedBy(list: Array<Game>, criteria: string, down: boolean): Array<Game> {

    switch (criteria) {
        
        case 'playtime':

            if (down == false) {
                list = list.sort((a, b) => {
                    return a.playtime - b.playtime;
                });
            } else list = list.sort((a, b) => {
                return b.playtime - a.playtime;
            });

            break;

        case 'score':

            if (down == false) {
                list = list.sort((a, b) => {
                    return a.score - b.score;
                });
            } else list = list.sort((a, b) => {
                return b.score - a.score;
            });

            break;  
            
        default:

            if (down == false) {
                list = list.sort(
                    (a, b) => { return a.title.localeCompare(b.title); });
            } else list = list.sort(
                (a, b) => { 
                    return b.title.localeCompare(a.title);
                });

    }

    return list;

}

export function getMaxPlaytime(list: Array<Game>): number {

    let playtime = 0;

    list.forEach(game => {
        if (game.playtime > playtime) {
            playtime = game.playtime;
        }
    });

    return 10 * Math.ceil(playtime / 10);

}

