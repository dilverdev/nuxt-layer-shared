<template>
	<div class="pt-20 pb-14">
		<div class="relative mb-3 z-0">
			<div class="calendar mx-auto">
				<div class="absolute z-10 flex justify-around top-0 -mt-1.5 w-full left-0">
					<div class="calendar__top-1" />
					<div class="calendar__top-2" />
				</div>

				<div class="calendar__month" />
				<div class="calendar__month z-20" />
			</div>
		</div>

		<p class="text-center text-sm text-gray-600">Cargando...</p>
	</div>
</template>

<script setup>
defineOptions({
	name: 'SkeletonCalendlyForm',
})
</script>

<style scoped>
.calendar {
	perspective: 40em;
	color: #979797;
	position: relative;
	width: 80px;
	height: 80px;
}

.calendar__top-1,
.calendar__top-2 {
	width: 4px;
	height: 8px;
	background: theme('colors.primary.700');
}

.calendar__month {
	position: absolute;
	top: 50%;
	left: 50%;
	display: block;
	width: 80px;
	height: 80px;
	transform: translate(-50%, -50%);
	border: 2px solid;
	background-color: #ffffff;
	background-image:
		linear-gradient(rgba(0, 0, 0, 0.1) 10%, transparent 10%),
		linear-gradient(90deg, rgba(0, 0, 0, 0.1) 10%, transparent 10%);
	background-size: 15px 15px;
	border-radius: 0.1875em;
	box-shadow: inset 0 1em theme('colors.gray.400');
}

.calendar__month:last-child {
	transform-origin: 50% -1.5%;
	animation: flip 1.05s infinite linear;
}

@keyframes flip {
	0%,
	62% {
		transform: translate(-50%, -50%) rotateX(0) scaleY(1);
	}
	100% {
		transform: translate(-50%, -50%) rotateX(265deg) scaleY(0.5);
	}
}
</style>
