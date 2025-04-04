export const addResourceSrc = (id, url, type = 'script', body = true, params = {}) => {
	return new Promise((resolve) => {
		const isScript = document.getElementById(id)

		if (isScript) {
			resolve(id)
			return
		}

		const newScript = document.createElement(type)
		newScript.setAttribute('id', id)

		if (type === 'script') {
			newScript.setAttribute('src', url)
		}

		if (type === 'link') {
			newScript.setAttribute('href', url)
			newScript.setAttribute('rel', 'stylesheet')
		}

		Object.keys(params).forEach((key) => {
			newScript.setAttribute(key, params[key])
		})

		if (body) {
			document.body.appendChild(newScript)
		} else {
			document.head.appendChild(newScript)
		}

		newScript.addEventListener('load', () => {
			resolve(id)
		})
	})
}
