<template>
	<label
		class="relative flex justify-between"
		:class="classBox"
	>
		<input
			:type="type"
			:value="value"
			:checked="isChecked"
			class="absolute top-0 right-0 h-full w-full opacity-0 cursor-pointer"
			@change="handleChange"
		/>

		<slot :active="isChecked" />

		<slot
			name="control"
			:active="isChecked"
		>
			<span
				v-if="type === 'checkbox'"
				class="w-4 h-4 rounded flex items-center justify-center border flex-shrink-0"
				:class="[classControl, colorCheckBox]"
			>
				<Icon
					v-if="isChecked"
					name="ic:baseline-check"
					class="text-white"
					size="14"
				/>
			</span>

			<span
				v-if="type === 'radio'"
				class="w-4 h-4 rounded-full flex items-center justify-center border flex-shrink-0"
				:class="[classControl, colorRadio]"
			>
				<span
					v-if="isChecked"
					class="bg-primary-500 w-2.5 h-2.5 rounded-full"
				/>
			</span>
		</slot>
	</label>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
	value: {
		type: [String, Number, Boolean, Object, Array],
		required: true,
		default: null,
	},
	type: {
		type: String,
		default: 'checkbox',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	rounded: {
		type: String,
		default: 'rounded-lg',
	},
	padding: {
		type: String,
		default: 'p-4',
	},
	classActive: {
		type: String,
		default: 'ring-2 ring-primary-500 bg-primary-300 bg-opacity-5 text-primary-500',
	},
	classHover: {
		type: String,
		default: 'hover:ring-gray-300 hover:bg-gray-50 hover:bg-opacity-30',
	},
	classDisabled: {
		type: String,
		default: 'opacity-50 cursor-not-allowed filter grayscale',
	},
	classControl: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['change'])

const isChecked = computed(() => {
	if (props.type === 'checkbox') {
		if (Array.isArray(model.value)) {
			return model.value.includes(props.value)
		}

		return model.value === props.value
	} else {
		// radio
		return model.value === props.value
	}
})

const classBox = computed(() => {
	return [
		props.rounded,
		props.padding,
		!isChecked.value && !props.disabled ? props.classHover : '',
		isChecked.value ? props.classActive : 'ring-1 ring-gray-200',
		props.disabled ? props.classDisabled : '',
	]
})

const colorCheckBox = computed(() => {
	return isChecked.value ? 'bg-primary-500' : ''
})

const colorRadio = computed(() => {
	return isChecked.value ? 'border-primary-500' : 'border-neutral-300'
})

const handleChange = (event) => {
	if (props.disabled) return

	let newValue

	if (props.type === 'checkbox') {
		if (Array.isArray(model.value)) {
			newValue = isChecked.value ? model.value.filter((item) => item !== props.value) : [...model.value, props.value]
		} else {
			newValue = event.target.checked ? props.value : null
		}
	} else {
		// Para radios, establecer directamente el valor
		newValue = props.value
	}

	model.value = newValue
	emit('change', newValue)
}
</script>
