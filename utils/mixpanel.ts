export const mixpanelGetUser = async (distinct_id: string) => {
	const config = useRuntimeConfig()

	const project_id = config.public.mixpanel.projectId
	const token = config.public.mixpanel.token

	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/x-www-form-urlencoded',
			authorization: `Basic ${token}`,
		},
		body: new URLSearchParams({ distinct_id }),
	}

	try {
		const response = await fetch(`https://mixpanel.com/api/query/engage?project_id=${project_id}`, options)
		const data = await response.json()
		return data?.results[0]
	} catch (e) {
		return null
	}
}
