package main

/*
 * @lc app=leetcode id=136 lang=golang
 *
 * [136] Single Number
 */
// @lc code=start
func SingleNumber(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	if len(nums) == 1 {
		return nums[0]
	}
	sum := 0
	for i := 0; i < len(nums); i++ {
		sum += nums[i]
	}
	// count := (len(nums) - 1) / 2
	// for j := 0; j < len(nums); j++ {
	// 	asum := (sum-nums[j])/2

	// }
	return 0
}

// @lc code=end
