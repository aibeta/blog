function findCommon(pre_str, next_str) {
  const min_len = pre_str.length - next_str.length > 0 ? next_str.length : pre_str.length
  let common_str = ''
  // 这里的判断条件保证了获取的是公共的前缀
  for(let i=0; (i < min_len && i === common_str.length); i++) {
    const pre_char = pre_str.charAt(i)
    const next_char = next_str.charAt(i)
    if(pre_char === next_char) {
      common_str = common_str.concat(pre_char)
    }
  }
  return common_str
}

var longestCommonPrefix = function(strs) {
  let common_str = ""
  strs.forEach((d, i) => {
    if(i === 0) {
      common_str = d
    }else {
      common_str = findCommon(common_str, d)
    }
  })
  console.log(common_str)
  return common_str
}

// longestCommonPrefix(["flower","flow","flight"])
// longestCommonPrefix(["caa","","a","acb"])
