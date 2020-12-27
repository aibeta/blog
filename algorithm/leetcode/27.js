var removeElement = function(nums, val) {
  let len = 0;
  for(let i =0; i< nums.length; i++) {
    if(val !== nums[i]) {
      nums[len] = nums[i];
      len++;
    }
  }
  return len;
};

const t= removeElement([0,0,1,1,1,2,2,2,2,3,3,3,3,4,4,4], 4);
debugger



