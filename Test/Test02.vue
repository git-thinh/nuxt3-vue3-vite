<template>
	<div style="margin: 10px;" ref="target">
		<h1>Test02: {{name}} - Is Visible: {{ targetIsVisible }}</h1>
		<button @click="count++" style="border: 1px solid red;padding: 3px;">{{count}}</button>
	</div>
</template>

<script>
	//https://github.com/vueuse/vueuse
	//https://vueuse.org/core/useelementvisibility/#type-declarations
	//import { ref } from 'vue'
	//import { useElementVisibility } from '@vueuse/core'

	export default {
		setup() {
			const target = ref(null)
			const targetIsVisible = useElementVisibility(target)

			return {
				target,
				targetIsVisible,
			}
		},
		props: {
			name: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				count: 5
			}
		}
	}
</script>

<style>
</style>
