function ListNode(val) {
       this.val = val;
       this.next = null;
   }

var mergeTwoLists = function(l1, l2) {
  let list = null;
  let move_list = null;
  while(l1 && l2) {
    if(l2.val <= l1.val) {
      // current l2 is smaller,
      if(!move_list) {
        list= l2;
        move_list = list;
      }else if(move_list) {
        move_list.next = l2;
        move_list = move_list.next;
      }
      // cut off l2
      l2 = l2.next;
    }else {
      if (!move_list) {
        list = l1;
        move_list = list;
      } else if (move_list) {
        move_list.next = l1;
        move_list = move_list.next;
      }
      l1 = l1.next;
    }
  }
  if(l1) {
    if(move_list) move_list.next = l1;
    else if(!list) list = l1;
  }
  if(l2){
    if(move_list) move_list.next = l2;
    else if(!list) list = l2;
  }
  return list;
};

const l1 = new ListNode(1); 
l1.next = new ListNode(2);
l1.next.next = new ListNode(3);
const l2 = new ListNode(1); 
l2.next = new ListNode(2);
l2.next.next = new ListNode(4);

const list = mergeTwoLists(l1, l2);
debugger;


// var mergeTwoLists = function(l1, l2) {
//   const long_list = l1.length > l2.length ? l1 : l2;
//   const short_list = l1.length > l2.length ? l2 : l1;

//   let final_list = [];

//   while(short_list.length > 0 && long_list.length > 0) {
//     let short_v = short_list[0];
//     let long_v = long_list[0];

//     if(short_v > long_v) {
//       final_list.push(long_v);
//       long_list.shift();
//     }else {
//       final_list.push(short_v);
//       short_list.shift();
//     }
//   }
//   if(short_list.length > 0) final_list = final_list.concat(short_list);
//   if(long_list.length > 0) final_list = final_list.concat(long_list);
//   return final_list;
// };

// const list = mergeTwoLists([1,2,3], [1,2,4]);
// debugger;