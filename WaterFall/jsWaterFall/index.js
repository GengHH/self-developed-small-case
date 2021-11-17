/*
 * @Author: your name
 * @Date: 2021-11-13 17:45:32
 * @LastEditTime: 2021-11-17 17:22:17
 * @LastEditors: Please set LastEditors
 * @Description: 原生js事项图片的懒加载的瀑布流式布局
 */

window.onload = function () {
	waterFall("main", "box")
	let getData = function () {
		var imgData = []
		//生成十张张随机图片（应该有后台返回数据）
		for (let i = 0; i < 10; i++) {
			let random = Math.floor(
				Math.random() * Math.floor(Math.random() * 1000 + 100)
			)
			let randomPath =
				"https://picsum.photos/200/" + random + "/?image=" + random
			imgData.push({
				src: randomPath,
			})
		}
		return imgData
	}

	// 进行节流限制，每秒最多执行以此
	window.onscroll = myThrottle(function () {
		if (needLoad()) {
			var parentDom = document.getElementById("main")
			var data = getData() || []
			for (let i = 0; i < data.length; i++) {
				const element = data[i]
				var boxDom = document.createElement("div")
				boxDom.className = "box"
				parentDom.appendChild(boxDom)
				var picDom = document.createElement("div")
				picDom.className = "pic"
				boxDom.appendChild(picDom)
				var pic = document.createElement("img")
				pic.src = data[i].src
				picDom.appendChild(pic)
				waterFall("main", "box")
			}
		}
	}, 1000)
}

function waterFall(parent, box) {
	var oParent = document.getElementById(parent)
	var oBoxs = getByClass(oParent, box)
	var oBoxw = oBoxs[0].offsetWidth
	var cols = Math.floor(document.documentElement.clientWidth / oBoxw)
	oParent.style.width = oBoxw * cols + "px"
	var hArr = []
	for (let i = 0; i < oBoxs.length; i++) {
		const element = oBoxs[i]
		if (i < cols) {
			hArr.push(element.offsetHeight)
		} else {
			var minH = Math.min.apply(null, hArr)
			var idx = hArr.indexOf(minH)
			element.style.position = "absolute"
			element.style.top = minH + "px"
			element.style.left = oBoxw * idx + "px"
			hArr[idx] += element.offsetHeight
		}
	}
}

function getByClass(parent, calssName) {
	var boxArr = [],
		oElements = parent.getElementsByClassName(calssName)
	for (let i = 0; i < oElements.length; i++) {
		const element = oElements[i]
		boxArr.push(element)
	}
	return boxArr
}

// 懒加载图

function needLoad() {
	var oParent = document.getElementById("main")
	var oBoxs = document.getElementsByClassName("box")
	var l = oBoxs.length - 1
	var sH = document.body.scrollTop || document.documentElement.scrollTop
	var cliH = document.body.clientHeight || document.documentElement.clientHeight
	var lastBoxH = oBoxs[l].offsetTop + Math.floor(oBoxs[l].offsetHeight / 2)
	return lastBoxH < sH + cliH
}

//
