/**
 * @param {string} s
 * @return {number}
 */

// 求最长不重复子字符串（有可能会特别长）
// 一个字符串的长度 str.length
// charAt()，charCodeAt()
// for 循环的 break
// 最早用操作数组的方式直接导致了数组溢出

var lengthOfLongestSubstring = function(s) {
	let long_str = ""
	for(let i =0; i< s.length; i++){
		let tmp_str = ""
		for(let j=i; j<s.length; j++) {
			const char = s.charAt(j)
			if(tmp_str.indexOf(char) === -1){
				tmp_str += char
			} 
			else {
				break
			}
		}
		if(tmp_str.length > long_str.length) long_str = tmp_str
	}
	
	return long_str.length
};

lengthOfLongestSubstring("pwwkew")