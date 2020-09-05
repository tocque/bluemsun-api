
/**
 * @files user.js 用 户 xxxx
 */ 


/**
 * rua, 不要啊 
 * @param {@info[]} aaa 啊啊啊
 * @param {string} bbb get
 * @return {{
 *   code: 1 | 2 | 3
 * }}
 */
export function xxxx (id, aaa, bbb) {
    return _post(`/user/${id}`, {
        headers: {"content-type":"xxxx"}
    }, { aaa, bbb })
}

            