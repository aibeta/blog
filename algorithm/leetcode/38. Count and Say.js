// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
// 6.     312211
// 7.     13112211
// 8.     1113212211

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let list = [1]
    for(let i=0; i< n-1 ; i++) {
        let tem_list =[], len = 1, former_v = list[0]
        for(let j=0; j< list.length; j++) {
            const current_v = list[j]
            const next_v = list[j+1]
            if(current_v === next_v) {
                ++len
            }else {
                tem_list.push(len, current_v)
                len = 1
            }
        }
        list = tem_list
    }
    return list.join("")
};