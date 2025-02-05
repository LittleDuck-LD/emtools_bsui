import name_colors from "../global_data/name_colors";
const argb = (hex) => {
    // Extract the RGB part and convert to the CSS rgba() format
    hex = hex.slice(2); // Remove the '0x' prefix
    const r = parseInt(hex.slice(2, 4), 16);
    const g = parseInt(hex.slice(4, 6), 16);
    const b = parseInt(hex.slice(6, 8), 16);
    const a = parseInt(hex.slice(0, 2), 16) / 255; // Alpha channel is the first byte, convert to [0, 1] range
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
export default (_id) => {
    let id = parseInt(_id % 1000000);
    return argb(name_colors[id]);
}