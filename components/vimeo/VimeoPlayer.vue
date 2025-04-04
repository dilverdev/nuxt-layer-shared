<template>
	<div class="relative z-0">
		<vueVimeoPlayer
			ref="player"
			:video-id="idVideo"
			:options="options"
			:autoplay="autoplay"
			class="absolute top-0 left-0 w-full z-10"
			@durationchange="durationchange"
			@progress="progress"
			@loaded="loaded"
			@timeupdate="timeupdate"
		/>
		<img
			:src="thumbnail"
			alt="video"
			width="1280"
			height="768"
			:class="isLoaded ? 'opacity-0' : null"
		/>
	</div>
</template>

<script>
import { vueVimeoPlayer } from 'vue-vimeo-player'

export default {
	name: 'VimeoPlayer',
	components: {
		vueVimeoPlayer,
	},
	props: {
		idVideo: {
			type: String,
			required: true,
			default: '508720412',
		},
		options: {
			type: Object,
			required: false,
			default: () => ({
				responsive: true,
				title: false,
			}),
		},
		autoplay: {
			type: Boolean,
			required: false,
			default: false,
		},
		thumbnail: {
			type: String,
			required: false,
			default: '',
		},
	},
	data: () => ({
		isLoaded: false,
	}),
	methods: {
		loaded() {
			this.isLoaded = true
		},
		durationchange(val) {
			this.$emit('durationchange', val)
		},
		progress(val) {
			this.$emit('progress', val)
		},
		timeupdate(val) {
			this.$emit('timeupdate', val)
		},
	},
}
</script>
