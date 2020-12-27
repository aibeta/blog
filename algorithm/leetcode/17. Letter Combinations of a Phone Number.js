/**
 * @param {string} digits
 * @return {string[]}
 */
const num2list = {
  '2': ['a', 'b' , 'c'],
  '3': ['d', 'e' , 'f'],
  '4': ['g', 'h' , 'i'],
  '5': ['j', 'k' , 'l'],
  '6': ['m', 'n' , 'o'],
  '7': ['p', 'q' , 'r', 's'],
  '8': ['t', 'u' , 'v'],
  '9': ['w', 'x' , 'y', 'z'],
}

function concat(list1, list2) {
  const list = []
  for(let i=0; i<list1.length; i++) {
    for(let j=0; j<list2.length; j++) {
      const pre_str = list1[i]
      const next_c = list2[j]
      list.push(pre_str.concat(next_c))
    }
  }
  return list
}

var letterCombinations = function(digits) {
  const len = digits.length
  let result = []
  for(let i=0; i<len; i++) {
    const char = digits.charAt(i)
    const list = num2list[char]
    if(i === 0) {
      result = list
    }else {
      result = concat(result,list)
    }
  }
  console.log(result)
  return result
};

letterCombinations('222')