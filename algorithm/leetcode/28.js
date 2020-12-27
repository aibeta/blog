var strStr = function(haystack, needle) {
  const haystack_len = haystack.length;
  const needle_len = needle.length;
  if(haystack_len < needle_len) return -1;
  if(needle_len === 0) return 0;
  if(haystack_len === needle_len) return haystack === needle ? 0 : -1;

  for(let i=0; i<= haystack_len - needle_len; i ++) {
    if(haystack.charAt(i) === needle.charAt(0)) {
      if(haystack.slice(i, i+needle_len) === needle) return i;
    }
  }
  return -1;
};

const str = strStr('hell', 'll');
debugger