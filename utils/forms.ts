export const focusAndScrollElement = (id: string) => {
	const element = document.getElementById(id)

	element?.focus()
	element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
