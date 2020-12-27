var threeSum = function(nums) {
    let result = []
    if(nums.length < 3) {
      return []
    }
    nums.sort((a,b)=>{
      return a-b
    })
    for(let i=0; i<nums.length; i++){
      const a = nums[i]
      if(a>0) {
        break
      }
      if(a === nums[i-1]) {
        continue
      }
      for(let j = i+1, k=nums.length - 1; j<k;) {
        const b = nums[j]
        const c = nums[k]
        if(a+b+c === 0) {
          result.push([a,b,c])
          j++;
          k--;
          if(j<k) {
            while(b === nums[j]) {
              j++
            }
            while(c === nums[k]) {
              k--
            }
          }
        }else if(a+b+c > 0) {
          k--
        }else {
          j++
        }
      }
    }
    return result
}
