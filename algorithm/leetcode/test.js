
const int_roman = {
  3000: 'MMM',
  2000: 'MM',
  1000: 'M',
  900: 'CM',
  800: 'DCCC',
  700: 'DCC',
  600: 'DC',
  500: 'D',
  400: 'CD',
  300: 'CCC',
  200: 'CC',
  100: 'C',
  90: 'XC',
  80: 'LXXX',
  70: 'LXX',
  60: 'LX',
  50: 'L',
  40: 'XL',
  30: 'XXX',
  20: 'XX',
  10: 'X',
  9: 'IX',
  8: 'VIII',
  7: 'VII',
  6: 'VI',
  5: 'V',
  4: 'IV',
  3: 'III',
  2: 'II',
  1: 'I',
}

var intToRoman = function(num) {
  const arr = String(num).split('')
  const num_list = arr.map((v,i)=>{
    v = Number(v)
    if(v === 0) {
      return ''
    }
    const value = v * Math.pow(10,arr.length-1-i)
    return int_roman[value]
  })
  return num_list.join('')
};
console.log(intToRoman(200))
