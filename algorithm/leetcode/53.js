var merge = function(nums1, m, nums2, n) {

  if(n === 0) return;

  const nums = nums1.splice(m, n);
  nums1.splice(0, 0, ...nums);
  let m_index = n;
  let n_index = 0;
  for(let j=0; j< m + n; j++) {
      const nums1_value = nums1[m_index] == undefined ? Infinity : nums1[m_index];
      const nums2_value = nums2[n_index] == undefined ? Infinity : nums2[n_index];
      const temp = nums1[j];
      if(nums1_value >= nums2_value) {
          nums1[j] = nums2_value;
          nums2[n_index] = temp;
          n_index++;
        }else {
          nums1[j] = nums1_value;
          nums1[m_index] = temp;
          m_index++;
      }
  }
;

// merge([1,0,0,0,0, 0], 1, [2,5,6,7,8], 5);
merge([1,2,4,5,6,0], 5, [3], 1);
// merge([0], 0, [3], 1);

// merge([-1,0,0,3,3,3,0,0,0],6,[1,2,2], 3);