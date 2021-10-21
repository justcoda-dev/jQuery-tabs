//
// по селекторам трохи не так зробив, якшо додати елементи то буде шукати
//  по сусідам замість конкретного селектора /next() - , nextAll(), not()
//  1) задача ******************************************************
const $buttons = $('.btn')
const $textFilds = $('.text-panel')
const $wrapper = $('.according-el')
$textFilds.hide()
$buttons.on('click', function () {
	const $button = $(this)
	const id = $button.data('id')
	const $textFild = $button.siblings(`[data-id="${id}"]`)
	const $unActiveFilds = $buttons.siblings(`[data-id!="${id}"]`)
	$textFild.slideToggle().toggleClass('active')
	$unActiveFilds.slideUp()
})
// ******************************************************************

// ****************************** Password **************************
// const $wrapperInput = $('.password-input-wrapper')
// const $wrapperDisplay = $('.password-display-wrapper')
// const $input = $('.input')
// const $line = $('.password-line')
// const $totalPercent = $('.password-percent')

// let total = {
// 	length: false,
// 	upper: false,
// 	nums: false,
// 	symbols: false,
// }

// const validations = [
// 	{
// 		rule: (text) => {
// 			total.length = true
// 			return text.length > 3
// 		},
// 		message: () => (total.length = false),
// 	},
// 	{
// 		rule: (text) => {
// 			const val = text.match(/[A-Z]/g)
// 			if (val) {
// 				total.upper = true
// 				return val.join('').length > 1
// 			}
// 		},
// 		message: () => (total.upper = false),
// 	},
// 	{
// 		rule: (text) => {
// 			const val = text.match(/[0-9]/g)
// 			if (val) {
// 				total.nums = true
// 				return val.join('').length > 1
// 			}
// 		},
// 		message: () => (total.nums = false),
// 	},
// 	{
// 		rule: (text) => {
// 			const val = text.match(/[!-,@]/g)
// 			console.log(val)
// 			if (val) {
// 				total.nums = true
// 				return val.join('').length > 1
// 			}
// 		},
// 		message: () => (total.symbols = false),
// 	},
// ]
// $totalPercent.text('0%')
// $input.on('input', function () {
// 	const value = $(this).val()

// 	valid(value, validations)

// 	const percent = transformFn(score(total), 0, 12, 0, 100)
// 	$line.css('background', `linear-gradient(90deg, #ff0000,#ffee00, #09ff00 ${percent}%)`)
// 	$totalPercent.text(`${Math.floor(percent)}%`)
// })

// function valid(value, validations) {
// 	for (const { rule, message } of validations) {
// 		if (!rule(value)) {
// 			return message(true)
// 		}
// 	}
// 	return ''
// }
// function transformFn(x, inMin, inMax, outMin, outMax) {
// 	return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
// }

// function score(total) {
// 	return Object.values(total).reduce((acc, val) => {
// 		if (val) {
// 			acc += 3
// 		}
// 		return acc
// 	}, 0)
// }

const $input = $('.input')
const $line = $('.password-line')
const $percent = $('.password-percent')
const $words = $('.password-words')

const rules = {
	length: {
		rule: (text) => text.length > 3,
	},
	nums: {
		rule: (text) => text.replace(/[^\d;]/g, '').length > 1,
	},
	upper: {
		rule: (text) => text.replace(/[a-z,0-9,^@!#$%&*()]/g, '').length > 1,
	},
	symbols: {
		rule: (text) => text.replace(/[A-Z,a-z,0-9]/g, ''),
	}
}

// const validText = {
// 	'-2': 'press more text',
// 	0: 'that is muthc better',
// 	2: 'good password',
// }

$input.on('input', function () {
	const value = $input.val()
	const score = validScore(value, rules)
	const rulesLength = Object.keys(rules).length
	const percent = transformFn(score, rulesLength * -1, rulesLength, 0, 100)

	// $words.text(validText[score])

	$line.css('width', ` ${percent}%`)
	$percent.text(`${Math.floor(percent)}%`)
})

function transformFn(x, inMin, inMax, outMin, outMax) {
	return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
function validScore(text, rules) {
	let statusObj = {}
	let score = 0
	Object.entries(rules).forEach(([key, val]) => {
		const status = val.rule(text)
		if (status) {
			statusObj[key] = true
		} else {
			statusObj[key] = false
		}
	})
	Object.values(statusObj).forEach((bool) => {
		if (bool) {
			score += 1
		} else {
			score -= 1
		}
	})

	return score
}

// ********************************************************************

//  ******************************* text ******************************

const $inputText = $('.input-text')
const $display = $('.display')
const $displayInner = $('.display-inner')
const $textInner = $('.text-inner')
const $letterInner = $('.letter-inner')

$inputText.on('input', function () {
	const value = $(this).val()
	const randomArr = $(randomLetter())

	randomArr.each(function (_, el) {
		const interval = setInterval(function () {
			$textInner.show().text(el)
		}, 10)

		setTimeout(function () {
			$textInner.hide()
			clearInterval(interval)
		}, 300)

		setTimeout(function () {
			$letterInner.text(value)
		}, 500)
	})
})

function randomLetter() {
	let arr = []
	for (let i = 0; i < 50; i++) {
		const smallRandom = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, '')
			.substr(0, 1)
		const upperRandom = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, '')
			.substr(0, 1)
			.toUpperCase()

		arr.push(smallRandom)
		arr.push(upperRandom)
	}
	return arr
}
// text then animation

const $button = $('#but')
const $inputTexts = $('.input-texts')
const $displays = $('.displays')
const $displayInners = $('.display-inners')
const $textInners = $('.text-inners')
const $letterInners = $('.letter-inners')


$button.on('click', function () {
	const value = $inputTexts.val()
	const time = 1000;
	const valLength = value.length
	const randomArr = $(randomLetters())
	randomArr.each(function (_, el) {
		const interval = setInterval(function () {
			$textInners.show().text(el)
		}, 10)
		setTimeout(function () {
			$textInners.hide()
			clearInterval(interval)
		}, time * valLength)
	})
		print($letterInners,value, time)
})

function print($el,text,time) {
	let index = 0;
	const printNextLetter = function() {
	  if (index < text.length) {
		const later = text[index];
		$el.append(later);
		index++;
		setTimeout(printNextLetter, time);
	  }
	}
	printNextLetter();
  }

  
function randomLetters() {
	let arr = []
	for (let i = 0; i < 50; i++) {
		const smallRandom = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, '')
			.substr(0, 1)
		const upperRandom = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, '')
			.substr(0, 1)
			.toUpperCase()

		arr.push(smallRandom)
		arr.push(upperRandom)
	}
	return arr
}
// 


