<script>
	import {
		defineComponent,
		shallowRef
	} from 'vue'

	export default defineComponent({
		props: {
			name: {
				type: String,
				required: true
			}
		},
		setup(props) {
			// use shallowRef to remove unnecessary optimizations
			const currentComponent = shallowRef('')

			import(`@/${props.name}.vue`).then(val => {
				// val is a Module has default
				currentComponent.value = val.default
			})

			return {
				currentComponent
			}
		}
	})
</script>

<template>
	<div v-if="currentComponent">
		<component :is="currentComponent" />
	</div>
</template>
