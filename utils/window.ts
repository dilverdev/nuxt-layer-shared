export const waitForWindowProperty = (value) => {
	return new Promise((resolve) => {
		const checkValue = () => {
			if (window[value] !== undefined) {
				resolve(window[value])
			} else {
				setTimeout(checkValue, 100)
			}
		}

		checkValue()
	})
}
