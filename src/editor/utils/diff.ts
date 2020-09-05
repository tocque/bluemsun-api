export type diffType = "none" | "untracked" | "modified" | "deleted"

export function calDiff(data: any, diffsource: any): [any, [string, diffType][]] {
    const diffs = [];
    const diff = function(key: string, data: any, diffsource = {}) {
        const map: Map<string, any> = new Map, redata: { [key: string]: any } = {};
        Object.entries(data).forEach(([k, v]) => {
            map.set(k, v);
            if (typeof v === 'object') {
                redata[k] = diff(key+`[${k}]`, data[k], diffsource[k]);
            } else {
                redata[k] = v;
            }
        })
        Object.entries(diffsource).forEach(([k, v]) => {
            if (!map.has(k)) {
                diffs.push([key+`[${k}]`, "deleted"]);
                redata[k] = v;
            } else {
                if (typeof v !== 'object' && map.get(k) != v) {
                    diffs.push([key+`[${k}]`, "modified"]);
                }
                map.delete(k);
            }
        })
        map.forEach((k) => {
            diffs.push([key+`[${k}]`, "untracked"]);
        })
        return redata;
    }
    const caledData = diff("", data, diffsource);
    console.log(diffs);
    return [ caledData, diffs ]
}



export function getDiffType(types: diffType[]): diffType {
    if (types.length == 0) return "none";
    if (types.includes("deleted")) {
        return "deleted";
    } else if (types.includes("modified")) {
        return "modified";
    }
    return "untracked";
}