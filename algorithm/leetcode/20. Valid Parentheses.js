/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function(s) {
  let s_list = s.split('');
  let len = s_list.length;

  let left_bracket = []
  for(let i=0; i< len; i++) {
    const length = left_bracket.length;
    let left_value = length > 0 ? left_bracket[length - 1] : null;
    if(s_list[i] === ' ') i++;
    else if(s_list[i] === '[' || s_list[i] === '(' || s_list[i] === '{'){
      left_bracket.push(s_list[i]);
    }else if(s_list[i] === ']' && left_value === '['){
      left_bracket.pop();
    }else if(s_list[i] === '}' && left_value === '{'){
      left_bracket.pop();
    }else if(s_list[i] === ')' && left_value === '('){
      left_bracket.pop();
    }else {
      return false;
    }
  }
  if(left_bracket.length === 0) return true;
  return false;
};

// isValid("()[]{}");
// isValid("{[]}")
// isValid("(([]){})")
isValid("([)]")