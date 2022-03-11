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

