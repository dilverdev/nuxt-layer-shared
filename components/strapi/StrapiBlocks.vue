<script setup lang="ts">
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'
const props = defineProps<{
	content: any[]
}>()
</script>

<template>
	<div class="content">
		<StrapiBlocks :content="props.content" />
	</div>
</template>

<style lang="postcss">
.content {
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0 0 0.7em;
		line-height: 1.35;
		@apply font-semibold;
	}

	h1 {
		font-size: 1.3em;
		@media (min-width: 768px) {
			font-size: 1.5em;
		}
		@media (min-width: 1060px) {
			font-size: 1.6em;
		}
	}

	h2 {
		font-size: 1.3em;
		line-height: initial;
		@media (min-width: 768px) {
			font-size: 1.4em;
		}
		@media (min-width: 1060px) {
			font-size: 1.7em;
		}
	}

	h3 {
		font-size: 1.2em;
		@media (min-width: 768px) {
			font-size: 1.4em;
		}
		@media (min-width: 1060px) {
			font-size: 1.6em;
		}
	}

	h4 {
		font-size: 1.1em;
		@media (min-width: 768px) {
			font-size: 1.3em;
		}
		@media (min-width: 1060px) {
			font-size: 1.5em;
		}
	}

	h5 {
		font-size: 1em;
		@media (min-width: 768px) {
			font-size: 1.2em;
		}
		@media (min-width: 1060px) {
			font-size: 1.4em;
		}
	}

	h6 {
		font-size: 0.95em;
		@media (min-width: 768px) {
			font-size: 1.1em;
		}
		@media (min-width: 1060px) {
			font-size: 1.3em;
		}
	}

	img,
	figure {
		max-width: 100%;
		height: auto;
	}

	ol,
	ul {
		padding-left: 27px;
		margin-bottom: 1.5em;
	}

	ul {
		list-style: disc;
	}

	li {
		margin-bottom: 0.6em;
	}

	p {
		margin-bottom: 1em;
	}

	p:last-child {
		margin-bottom: 0;
	}

	/*Images*/
	.alignleft,
	.alignright,
	.aligncenter {
		img {
			border-radius: 4px;
		}
	}

	.alignleft {
		float: left;
		margin: 0.7em 1em 0.7em 0;
	}

	.alignright {
		float: right;
		margin: 0.7em 0 0.7em 1em;
	}

	.aligncenter {
		margin: 0.7em auto 0.7em;
		display: block;

		img {
			display: block;
			margin: auto;
		}
	}

	strong,
	b {
		@apply font-semibold;
	}

	figcaption {
		border-top: 0;
		padding: 0.7em;
		font-size: 0.85em;
		text-align: center;
	}

	blockquote {
		font-style: italic;
		font-size: 1.55em;
		line-height: 1.6em;
		margin: 1.5em 0;
		font-weight: 500;
	}

	a {
		text-decoration: underline;
		font-weight: 600;
		@apply text-primary-400;
	}
}
</style>
