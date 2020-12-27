/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

//最早用字符串转数组，结果加减法溢出

var addTwoNumbers = function(l1, l2, v=0) {
    var new_v = 0, sum = null
    var param_l1 = null, param_l2 = null
    var node = new ListNode()

    if(l1 !== null && l2 !== null){
        sum = l1.val + l2.val + v 
        param_l1 = l1.next
        param_l2 = l2.next
    }else if(l1 !== null ) {
        sum = l1.val + v 
        param_l1 = l1.next
    }else if(l2 !== null) {
        sum = l2.val + v 
        param_l2 = l2.next
    }else if(v === 1) {
        sum = v
    }else if(v === 0) {
        return null
    }

    if(sum < 10) {
        var node = new ListNode(sum)
    }else {
        var node = new ListNode(sum % 10)
        new_v = 1
    }
    
    node.next = addTwoNumbers(param_l1, param_l2, new_v)

    return node
};