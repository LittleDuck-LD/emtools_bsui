export async function GetJson(Link) {
    const response = await fetch(Link);
    if (!response.ok) {
        console.error("无法获取json");
    }
    return await response.json();
}
export function randomString(e) {
    e = e || 32;
    let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}
export function GetImage(b) {
    return new URL(b, import.meta.url).href;
}
/******************************************************** */
export function ConvertPlayerTagToLong(tag) {
    const conversionChars = "0289PYLQGRJCUV";
    const tagArray = tag.toUpperCase().split("");
    let id = 0n;
    if (tagArray[0] == "#") {
        tagArray.shift();
    }
    for (let i = 0; i < tagArray.length; i++) {
        let character = tagArray[i];
        let charIndex = conversionChars.indexOf(character);
        id *= BigInt(conversionChars.length);
        id += BigInt(charIndex);
    }
    return [Number(id % 256n), Number((id - 256n) >> 8n) + 1];
}

export function IsTagCanUse(Tag) {
    Long = ConvertPlayerTagToLong(Tag);
    LongHigh = Long[0];
    LongLow = Long[1];
    var CanUse = false;
    if (100 <= parseInt(LongHigh) && parseInt(LongHigh) < 115 && 0 < parseInt(LongLow) && parseInt(LongLow) < 99999999) {
        CanUse = true;
    }
    return CanUse;
}
export function NoHTML(Text) {
    return Text.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}
export function GlobalIDToLongs(ID) {
    return [parseInt(ID / 1000000), parseInt(ID % 1000000)]
}
export function convertARGBtofunction(argb) {
    // Extract the RGB part and convert to the CSS rgba() format
    const hex = argb.slice(2); // Remove the '0x' prefix
    const r = parseInt(hex.slice(2, 4), 16);
    const g = parseInt(hex.slice(4, 6), 16);
    const b = parseInt(hex.slice(6, 8), 16);
    const a = parseInt(hex.slice(0, 2), 16) / 255; // Alpha channel is the first byte, convert to [0, 1] range
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function generateSymmetricGradient(colors) {
    const length = colors.length;
    if (length < 3) {
        throw new Error("The gradient array must contain at least 3 colors.");
    }

    const half = Math.floor((length - 1) / 2);
    const isOdd = length % 2 !== 0;

    let gradientArray = [];

    if (isOdd) {
        gradientArray = [
            ...colors.slice(0, half + 1),
            ...colors.slice(half).reverse(),
            ...colors.slice(1, half + 1),
            ...colors.slice(half).reverse()
        ];
    } else {
        gradientArray = [
            ...colors,
            ...colors.slice(0, half).reverse(),
            ...colors.slice(1),
            ...colors.slice(0, half).reverse()
        ];
    }




    return gradientArray.map(convertARGBtofunction).join(", ");
}

export function generateGradientCSS(gradientArray) {
    const gradientString = generateSymmetricGradient(gradientArray);
    return `background-image: linear-gradient(to right, ${gradientString}); background-position: -100% 0;`;
}
/********************************************************************************************* */