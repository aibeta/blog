var removeDuplicates = function(nums) {
  let len = 0;
  let cur = null;
  for(let i =0; i< nums.length; i++) {
    if(cur !== nums[i]) {
      cur = nums[len] = nums[i];
      len++;
    }
  }
  return len;
};

const t= removeDuplicates([0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4]);