<script setup lang="ts">
const box = ref(null)
const boxHeight = ref(0)

const computedBoxHeight = computed(() => (boxHeight.value ? boxHeight.value + 'px' : null))

const updateBoxHeight = () => {
	if (window.innerWidth < 992) {
		boxHeight.value = 0
		return
	}

	if (box.value) {
		const windowHeight = window.innerHeight
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		const BoxTop = box.value.getBoundingClientRect().top + scrollTop
		boxHeight.value = windowHeight - (BoxTop - scrollTop)
	}
}

onMounted(() => {
	updateBoxHeight()
	window.addEventListener('scroll', updateBoxHeight)
	window.addEventListener('resize', updateBoxHeight)
})

onUnmounted(() => {
	window.removeEventListener('scroll', updateBoxHeight)
	window.removeEventListener('resize', updateBoxHeight)
})
</script>

<template>
	<div
		ref="box"
		:style="{ height: computedBoxHeight }"
	>
		<slot />
	</div>
</template>

<style scoped></style>
