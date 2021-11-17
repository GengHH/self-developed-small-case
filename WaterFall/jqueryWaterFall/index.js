/*
 * @Author: your name
 * @Date: 2021-11-13 17:45:32
 * @LastEditTime: 2021-11-17 17:44:21
 * @LastEditors: Please set LastEditors
 * @Description: jquery事项图片的懒加载的瀑布流式布局
 */
let getData = function () {
	var imgData = []
	//生成十张张随机图片（应该有后台返回数据）
	for (let i = 0; i < 10; i++) {
		let random = Math.floor(
			Math.random() * Math.floor(Math.random() * 1000 + 100)
		)
		let randomPath = "https://picsum.photos/200/" + random + "/?image=" + random
		imgData.push({
			src: randomPath,
		})
	}
	return imgData
}

$(window).on("load", function () {
	waterFall("main", "box")
})

// 进行节流限制，每秒最多执行以此
$(window).on(
	"scroll",
	myThrottle(function () {
		if (needLoad()) {
			let parentDom = $("#main")
			let imgData = getData() || []
			imgData.forEach(function (ele) {
				let boxDom = $('<div class="box"></div>').appendTo(parentDom)
				let picDom = $('<div class="pic"></div>').appendTo(boxDom)
				let pic = $("<img src=" + ele.src + ">").appendTo(picDom)
				// 每次加载----全部图片重新计算布局
				waterFall("main", "box")
			})
		}
	}, 1000)
)

function waterFall(parent, box) {
	let $oParent = $("#" + parent)

	// let oBoxs = getByClass(oParent, box)
	let $oBoxs = $oParent.children("." + box)
	let oBoxw = $($oBoxs[0]).outerWidth()
	let cols = Math.floor(document.documentElement.clientWidth / oBoxw)
	$oParent.css({ width: oBoxw * cols + "px" })
	// 存放每列中已经占据的总高度
	let hArr = []
	$oBoxs.each(function (i, element) {
		if (i < cols) {
			hArr.push($(element).outerHeight())
		} else {
			// 选择总高度最小的一列
			let minH = Math.min.apply(null, hArr)
			let idx = hArr.indexOf(minH)
			$(element).css({
				position: "absolute",
				top: minH + "px",
				left: oBoxw * idx + "px",
			})
			hArr[idx] += $(element).outerHeight()
		}
	})
}
// 懒加载图
function needLoad() {
	let $oParent = $("#main")
	let $oBoxs = $(".box")
	let l = $oBoxs.length - 1
	let sH = $(document).scrollTop()
	let cliH = $(window).height()
	// let sH = document.body.scrollTop || document.documentElement.scrollTop
	// let cliH = document.body.clientHeight || document.documentElement.clientHeight
	let lastBoxH =
		$($oBoxs[l]).offset().top + Math.floor($($oBoxs[l]).outerHeight() / 2)
	return lastBoxH < sH + cliH
}
