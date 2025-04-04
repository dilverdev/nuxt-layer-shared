<template>
	<div
		v-if="getSrc"
		class="relative z-0"
	>
		<iframe
			width="630"
			height="394"
			:src="getSrc"
			class="absolute top-0 left-0 w-full h-full z-10"
			frameborder="0"
			webkitallowfullscreen
			mozallowfullscreen
			allowfullscreen
		/>
		<img
			:src="thumbnail"
			alt="video"
			width="1280"
			height="768"
			class="w-full h-auto filter blur-2xl"
		/>
	</div>
</template>

<script>
export default {
	name: 'VideoLoom',
	props: {
		src: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: false,
			default: '',
		},
	},
	computed: {
		getSrc() {
			if (this.src.includes('loom.com/share/')) {
				return this.src.replace('loom.com/share/', 'loom.com/embed/')
			}

			return ''
		},
	},
}
</script>
