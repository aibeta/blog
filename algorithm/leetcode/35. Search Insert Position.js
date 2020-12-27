/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

 // 15min

var searchInsert = function(nums, target) {
    const index = nums.indexOf(target)
    if( index > -1) return index
    let insert_index = null
    for(let i=0 ;i <nums.length; i++) {
        if(target === nums[i]) {
             insert_index = i === 0 ? 0 : i
             break 
        }
        if(target < nums[i]) {
            insert_index = i
            break
        }
    }
    return insert_index === null ? nums.length : insert_index
};