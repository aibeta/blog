/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  let set = new Set()
  for(let i=0; i<nums.length; i++) {
    for(let j=i+1; j< nums.length; j++) {
      for(let k= j+1; k< nums.length; k++) {
        set.add(nums[i] + nums[j] + nums[k])
      }
    }
  }
  let min_diff = null
  let sum = null
  for (let x of set) {
    const abs_diff = Math.abs(x - target)
    if(min_diff === null) {
      min_diff = abs_diff
      sum = x
    }else if(min_diff > abs_diff){
      min_diff = abs_diff
      sum = x
    }
  }
  return sum
};