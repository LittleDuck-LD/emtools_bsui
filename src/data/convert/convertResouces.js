import player_thumbnails_offest from "../global_data/player_thumbnails_offest";
import ranked_ranks from "../global_data/ranked_ranks";
import data_exp from "../global_data/exp";
import character from "../global_data/character";
import hero_tr from "../global_data/hero_tr";
import api from "../api";
import skins from "../global_data/skins";
export function GetThumbOffested(thumbID, head = false) {
    if (head) thumbID = thumbID - 28000000;
    const offsetCN = player_thumbnails_offest;
    //console.log(offset);
    // 计算总偏移量
    let totalOffset = 0;
    for (let i = 0; i < offsetCN.length; i++) {
        const range = offsetCN[i];
        if (thumbID < range[0]) {
            break;
        }
        totalOffset += (range[1] - range[0] + 1);
    }

    // 检查 thumbID 是否在 offsetCN 的任意范围内
    for (let i = 0; i < offsetCN.length; i++) {
        if (offsetCN[i][0] <= thumbID && thumbID <= offsetCN[i][1]) {
            return "/b_assets/CNThumb/" + thumbID + ".jpg";
        }
    }

    // 计算偏移后的 ID
    const minFirstRange = offsetCN[0][0];
    if (thumbID < minFirstRange) {
        return "https://brawlace.com/assets/images/brawlstars/icons-players/" + (thumbID + 28000000) + ".png?size=200";
    } else {
        const adjustedID = thumbID - totalOffset;
        return "https://brawlace.com/assets/images/brawlstars/icons-players/" + (adjustedID + 28000000) + ".png?size=200";
    }
}
export function GetHeroName(item) {
    let res = character.find((e) => e.csv_index == item);
    if (!res) return item;
    return hero_tr[res.hero] ?? res;
}
export function GetHeroImages(_item) {
    let item = _item;
    let res = character.find((e) => e.csv_index == item);
    if (!res) res = character[0];
    return `${api.api.hero_images_api}/${res.hero}_portrait.png`;
}
export function GetHeroSkins(item) {
    return skins[item] || false;
}
export function GetExpLevel(exp) {
    let { index } = Object.entries(data_exp).map((e, i) => ({ index: i, key: e[0], value: e[1] })).find((e) => exp < e.value);
    let explevel = index;
    return [explevel, exp - data_exp[index - 1], data_exp[index + 1] - data_exp[index] - 10];
}
export function GetRarity(rarity) {
    return ({ common: 0, rare: 1, super_rare: 2, epic: 3, mega_epic: 4, legendary: 5 })[rarity] || 0;
}
export function GetClubIco(ico) {
    return `https://brawlace.com/assets/images/brawlstars/icons-clubs/${8000000 + ico}.png`;
}
export function GetRanked(rank) {
    return ranked_ranks[rank - 1] || rank;
}
export const heroCount = api.heroCount;