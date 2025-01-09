import character from "../global_data/character";
import skins from "../global_data/skins";
import ranked_ranks from "../global_data/ranked_ranks";
import player_titles from "../global_data/player_titles";
import exp from "../global_data/exp";
import pves from "../global_data/pves";
const _data = {
    character,
    skins,
    ranked_ranks,
    player_titles,
    exp,
    pves
};
const formatPlayer = (e, data) => {
    let stats = mapStats(e.stats);
    let totalCup = e.heroes.reduce((o, p) => o += p.trophy, 0),//总奖杯
        totalMastery = e.heroes.reduce((o, p) => o += p.MasteryPoints, 0);//总专精
    let res = {
        tag: cvPlayerTag(e.high, e.low),//tag
        name: e.name,//名称
        reg_data: e.ReferenceRegData,//注册日期
        calc_reg_data: GetRegDateFromID(e.high, e.low),
        reg_year: stats.RegYear || '2020',
        head_id: e.thumbnail - 28000000,
        privacy: GetPrivacySettings(e.PrivacySettings),//隐私设置
        club: ((p) => ({
            joined: p.HasClub,//是否加入战队
            name: p.club[0].Name,//战队名称
            tag: p.HasClub ? cvPlayerTag(p.clubHigh, p.clubLow) : '',//战队tag
            peopleNumber: p.club[0].MemberCount,//战队人数,
            totalCup: p.club[0]['TotalTrophies']//战队总杯数
        }))(e.HasClub ? { club: e.club } : {
            HasClub: false,
            clubHigh: 0,
            clubLow: 0,
            club: [{
                Name: '无战队',
                MemberCount: 0,
                TotalTrophies: 0
            }]
        }),
        totalCup, totalMastery,
        rate: parseInt(totalCup / e.heroes.length),//平均奖杯,
        brawlpass: e.BrawlpassStatus >= 0,
        exp_info: ((op) => op[0] + "级-" + op[1] + "/" + op[2])(GetExpLevel(stats, data)),
        wins: (o => ({
            s: o['sd_wins'],//单人
            m: o['dsd_wins'],//双人
            sm: o['3v3'],//3v3
            maxWins: e.winstreak,//最高连胜
            cup: o['trophies'],//当前奖杯
            maxCup: o['highesttrophies'],//最高奖杯
            rankNow: o['CurrentRankScore'],//当前排位赛段位
            rankMax: o['HiggestRankScore'],//排位赛最高分
            rankClubNow: data.ranked_ranks[o['ClubLeague'] - 1],//战队联赛段位
            rankClubS: data.ranked_ranks[o['SoloRanked'] - 1],//个人最高段位
            rankClubM: data.ranked_ranks[o['TeamRanked'] - 1],//小队最高段位
            BrawlBoss: stats.RaidBoss != 0 ? data.pves[stats.RaidBoss - 1] : false,//首领之战
            RoboBoss: stats.RoboRumble != 0 ? data.pves[stats.RoboRumble - 1] : false//机甲入侵
        }))(stats),
        favouriteBrawler: {
            hero: e.favouriteBrawler[1],
            skin: data.skins[e.favouriteBrawlerSkin[1]]
        },
        brawlCard: {
            headOne: e.battleCardThumbnail1[1] || 0,
            headTwo: e.battleCardThumbnail2[1] || 0,
            title: e.battleCardTitle[0] == 76 ? data.player_titles[e.battleCardTitle[1]] : false
        },
        heros: e.heroes.map(p => ({
            hero_id: p.chara[1],
            level: p.level,
            cup: p.trophy,
            max_cup: p.highesttrophy,
            mastery: p.MasteryPoints,
            skin: {
                skin_name: p.skin[1] || false,
                head: p.havehalo ? p.halo[1] : false,
                back: p.havewing ? p.wing[1] : false
            },
            chara: p.chara
        }))

    };
    return res;
}

const cvPlayerTag = (hid, lid, hashTag = false) => {
    console.log(hid, lid);
    const conversionChars = "0289PYLQGRJCUV";
    let id = (BigInt(hid) << 8n) | BigInt(lid);
    let tag = "";
    while (id > 0n) {
        let index = Number(id % BigInt(conversionChars.length));
        tag = conversionChars[index] + tag;
        id /= BigInt(conversionChars.length);
    }
    if (hashTag == true) {
        return "#" + tag;
    }
    return tag;
}
const GetPrivacySettings = (integer) => {
    let rank = (integer & 1) !== 1;
    let profile = (integer & 4) !== 4;
    let club = (integer & 8) !== 8;
    let invite = (integer & 16) !== 16;
    return { rank, profile, club, invite };
}
const mapStats = (stats) => {
    let json_list = {
        "3v3": 1,
        "unk": 2,
        "trophies": 3,
        "highesttrophies": 4,
        "heros_count": 5,
        "sd_wins": 8,
        "RoboRumble": 9,
        "dsd_wins": 11,
        "RaidBoss": 12,
        "PowerPlayPoints": 13,
        "PowerPlayRank": 14,
        "championship": 15,
        "SuperCity": 16,
        "TeamRanked": 17,
        "SoloRanked": 18,
        "ClubLeague": 19,
        "Fame": 20,
        "exp": 21,
        "HighestRank": 22,
        "CurRank": 23,
        "CurrentRankScore": 24,
        "HiggestRankScore": 25,
        "MasterRank": 26,
        "RegYear": 27,
        "stars": 10000
    }
    let result = Object.fromEntries(Object.entries(json_list).map(([k, v]) => {
        let o = stats.find((p) => p[0] == v);
        return { f: o || false, obj: [k, o && o[1]] };
    }).filter(e => e.f).map(e => e.obj));
    return result;
}
const GetExpLevel = (stats, data) => {
    let { index } = Object.entries(data.exp).map((e, i) => ({ index: i, key: e[0], value: e[1] })).find((e) => stats.exp < e.value);
    let explevel = index;
    return [explevel, stats.exp - data.exp[index - 1], data.exp[index + 1] - data.exp[index] - 10];
}
const CalcPlayerId = (x, y, z) => (y - 1) * z + x + 1;
const GetRegDateFromID = (hid, lid) => {
    let PlayerCount = CalcPlayerId(hid, lid, 25);
    let PlayerCountCN = CalcPlayerId(hid - 99, lid, 13) - 1;
    const formatObject = (index, number, total, type) => ({ type, total, number, index });
    const formatComplate = () => {
        switch (true) {
            case parseInt(hid) == 0:
                return formatObject(hid + 1, lid, PlayerCount, 0);
            case parseInt(hid) < 30:
                return formatObject(hid + 1, lid, PlayerCount, 0);
            case parseInt(hid) < 120:
                return formatObject(hid - 99, lid, PlayerCountCN, 1);
            case parseInt(lid) > 99999999:
            case parseInt(lid) == 0:
                return { type: -1 };
        }
    };
    return formatComplate();
}
export default (e) => formatPlayer(e, _data);