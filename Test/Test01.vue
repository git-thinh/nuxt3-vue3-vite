<template>
	<div style="margin: 10px;">
		<h1>Test01: {{name}}</h1>
		<button @click="count++" style="border: 1px solid red;padding: 3px;">{{count}}</button>
		<div>
			{{json}}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			site: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				count: 5,
				json: JSON.stringify(this.site, null, 4)
			}
		},
		created() {
			//console.log('Test01: site = ', this.site);
			this.$emit('update:modelValue', this);
		}
	}
</script>

<style>
</style>
