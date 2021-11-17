/*
 * @Author: your name
 * @Date: 2021-11-17 17:06:11
 * @LastEditTime: 2021-11-17 17:24:10
 * @LastEditors: Please set LastEditors
 * @Description: 全局公用的节流函数
 * @FilePath: \LearnCase\WaterFall\utils\throttle.js
 */

window.myThrottle = function (func, wait) {
	let timeOut
	return function () {
		let context = this
		let args = arguments
		if (!timeOut) {
			timeOut = setTimeout(function () {
				timeOut = null
				func.apply(context, args)
			}, wait)
		}
	}
}
