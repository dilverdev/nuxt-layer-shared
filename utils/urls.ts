import type { LocationQuery } from 'vue-router'

export type UtmKey = 'utm_id' | 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content'
export type UtmParams = Partial<Record<UtmKey, string>>

export const isValidUrl = (url: string) => {
	try {
		new URL(url)
		return true
	} catch {
		return false
	}
}

export const filterUtmFromObject = (query: LocationQuery): UtmParams => {
	const utmParams: UtmParams = {}

	const utmKeys: UtmKey[] = ['utm_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

	for (const key of utmKeys) {
		if (query[key]) {
			utmParams[key] = Array.isArray(query[key]) ? query[key][query[key].length - 1] : (query[key] as string)
		}
	}

	return utmParams
}
