/**
 * @param {string} s
 * @return {boolean}
 */
var isLetter = c => c.toUpperCase() != c.toLowerCase();
debugger;
var isPalindrome = function(s) {
    let i = 0; 
    let j = s.length - 1;
    
    while(i <= j) {
      // error 2 把这两个放在了外面
      const char_i = s.charAt(i);
      const char_j = s.charAt(j);
        if(!isLetter(char_i) ){
            i ++;
            //error 1 : 用成了break
            continue;
        }
        if(!isLetter(char_j) ){
            j --;
            continue;
        }
        if(char_i.toUpperCase() === char_j.toUpperCase()) {
            i++;
            j--;
            continue;
        }
        return false
    }
    return true;
    
};

isPalindrome("race a car");