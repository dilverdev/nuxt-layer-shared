<template>
	<div
		v-if="props.type === 'popup'"
		@click="openCalendly"
	>
		<slot>Open Calendly</slot>
	</div>

	<div
		v-if="props.type === 'inline'"
		class="relative z-0"
	>
		<div
			v-show="props.loading"
			class="absolute z-10 top-0 left-0 bg-white w-full h-full flex justify-center"
		>
			<SkeletonCalendlyForm class="mt-24 lg:mt-32" />
		</div>

		<div v-show="!props.loading">
			<div
				:id="props.id"
				class="box-calendly"
			/>
		</div>
	</div>
</template>

<script setup>
/* global Calendly */
import SkeletonCalendlyForm from './SkeletonCalendly.vue'

const props = defineProps({
	id: {
		type: String,
		default: 'iframeCalendly',
	},
	urlCalendar: {
		type: String,
		default: 'https://calendly.com/d/cfx-x6m-bmj/test-calendly-balancer',
	},
	type: {
		type: String,
		default: 'inline',
	},
	width: {
		type: String,
		default: '1014',
	},
	classCalendly: {
		type: String,
		default: 'box-calendly',
	},
	closePopupAfterScheduled: {
		type: Boolean,
		default: false,
	},
	params: {
		type: Object,
		default: () => {},
		/* Example params
      {
         prefill: {
          name: String,
          email: String,
          customAnswers: {
            a1: "Yes",
            a2: "At the Starbucks on 3rd and 16th"
          },
        },
        utm: {
          utmCampaign: String,
          utmSource: String,
          utmMedium: String,
          utmContent: String,
          utmTerm: String,
        }
      }
      */
	},
})
const emit = defineEmits([
	'init-calendly',
	'script-loaded',
	'iframe-loaded',
	'profile-viewed',
	'event-viewed',
	'date-selected',
	'scheduled',
])

const loading = ref(true)
const urlCalendarFinal = ref('')

const isEvent = (e) => {
	return e.data.event && e.data.event.indexOf('calendly') === 0
}

const addEvents = () => {
	emit('script-loaded')

	const iframe = document.querySelector(`#${props.id} iframe`)

	if (iframe) {
		iframe.addEventListener(
			'load',
			() => {
				emit('iframe-loaded')
			},
			true,
		)
	}

	window.addEventListener('message', (e) => {
		if (isEvent(e)) {
			if (e.data.event === 'calendly.profile_page_viewed') {
				emit('profile-viewed', e.data)
				loading.value = false
			}

			if (e.data.event === 'calendly.event_type_viewed') {
				emit('event-viewed', e.data)
				loading.value = false
			}

			if (e.data.event === 'calendly.date_and_time_selected') {
				emit('date-selected', e.data)
			}

			if (e.data.event === 'calendly.event_scheduled') {
				if (props.closePopupAfterScheduled && props.type === 'popup') {
					Calendly.closePopupWidget()
				}

				emit('scheduled', e.data)
			}
		}
	})
}

const createCalendly = () => {
	waitForWindowProperty('Calendly')
		.then(async (Calendly) => {
			if (props.type === 'inline') {
				await Calendly.initInlineWidget({
					url: urlCalendarFinal.value,
					parentElement: document.getElementById(props.id),
					...props.params,
				})
				emit('init-calendly')
			}

			if (props.type === 'badge') {
				await Calendly.initBadgeWidget({
					url: urlCalendarFinal.value,
					...props.params,
				})
				emit('init-calendly')
			}

			addEvents()
		})
		.catch(() => {
			setTimeout(() => {
				createCalendly()
			}, 3000)
		})
}

const openCalendly = () => {
	Calendly.initPopupWidget({
		url: urlCalendarFinal.value,
		...props.params,
	})
	emit('init-calendly')
}

onMounted(async () => {
	const url = new URL(props.urlCalendar)
	const queryParams = new URLSearchParams(url.search)
	urlCalendarFinal.value = `${props.urlCalendar}?${queryParams.toString()}`

	await addResourceSrc('calendly-script', 'https://assets.calendly.com/assets/external/widget.js', 'script')

	createCalendly()
})
</script>

<style lang="postcss">
.calendly-inline-widget iframe,
.calendly-badge-widget iframe,
.calendly-overlay iframe {
	display: inline;
	width: 100%;
	height: 100%;
}

.calendly-popup-content {
	position: relative;
}

.calendly-popup-content.calendly-mobile {
	-webkit-overflow-scrolling: touch;
	overflow-y: auto;
}

.calendly-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	z-index: 9999;
	@apply bg-neutral-700 bg-opacity-60;
}

.calendly-overlay .calendly-close-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.calendly-overlay .calendly-popup {
	position: relative;
	top: 50px;
	width: 100%;
	height: 100%;
}

@media (min-width: 650px) {
	.calendly-overlay .calendly-popup {
		top: 0;
	}
}

.calendly-overlay .calendly-popup .calendly-popup-content {
	height: 100%;
}

.calendly-overlay .calendly-popup-close {
	position: absolute;
	top: 25px;
	right: 25px;
	color: #fff;
	width: 19px;
	height: 19px;
	cursor: pointer;
	background: url(https://assets.calendly.com/assets/external/close-icon.svg) no-repeat;
	background-size: contain;
}

@media (max-width: 975px) {
	.calendly-overlay .calendly-popup-close {
		top: 15px;
		right: 15px;
	}
}

.calendly-badge-widget {
	position: fixed;
	right: 20px;
	bottom: 15px;
	z-index: 9998;
}

.calendly-badge-widget .calendly-badge-content {
	display: table-cell;
	width: auto;
	height: 45px;
	padding: 0 30px;
	border-radius: 25px;
	box-shadow: rgba(0, 0, 0, 0.25) 0 2px 5px;
	font-family: sans-serif;
	text-align: center;
	vertical-align: middle;
	font-weight: 700;
	font-size: 14px;
	color: #fff;
	cursor: pointer;
}

.calendly-badge-widget .calendly-badge-content.calendly-white {
	color: #666a73;
}

.calendly-badge-widget .calendly-badge-content span {
	display: block;
	font-size: 12px;
}

.calendly-spinner {
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	transform: translateY(-50%);
	text-align: center;
	z-index: -1;
}

.calendly-spinner > div {
	display: inline-block;
	width: 18px;
	height: 18px;
	background-color: #e1e1e1;
	border-radius: 50%;
	vertical-align: middle;
	animation: calendly-bouncedelay 1.4s infinite ease-in-out;
	animation-fill-mode: both;
}

.calendly-spinner .calendly-bounce1 {
	animation-delay: -0.32s;
}

.calendly-spinner .calendly-bounce2 {
	animation-delay: -0.16s;
}

@keyframes calendly-bouncedelay {
	0%,
	80%,
	100% {
		transform: scale(0);
	}
	40% {
		transform: scale(1);
	}
}

.box-calendly {
	height: 1111px;

	@media (min-width: 658px) {
		height: 1120px;
	}

	@media (min-width: 1056px) {
		height: 850px;
	}

	@media (min-width: 1129px) {
		height: 850px;
	}
}
</style>
