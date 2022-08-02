<script lang="ts" setup>
	// definePageMeta({
	// 	middleware: ["content"]
	// 	// or middleware: 'auth'
	// })


	const config = useRuntimeConfig();
	const route = useRoute();
	//console.log('setup = ', route)

	const url = 'https://m.op.pimage.mascot.dk/data/sites.json';
	const [{
		data: site
	}, {
		data: cafe
	}] = await Promise.all([
		useFetch(url),
		useFetch(url)
	])
 
</script>
<script lang="ts">
	export default {
		props: ['site'],
		emits: ['update:modelValue'],
		// async setup() {
		// 	const config = useRuntimeConfig();
		// 	const route = useRoute();
		// 	console.log('setup = ', route)

		// 	const url = 'https://m.op.pimage.mascot.dk/data/sites.json';
		// 	const [{
		// 		data: site
		// 	}, {
		// 		data: cafe
		// 	}] = await Promise.all([
		// 		useFetch(url),
		// 		useFetch(url)
		// 	])

		// 	return {
		// 		site,
		// 		cafe
		// 	}
		// },
		// head() {
		// 	return {
		// 		//title: '.',
		// 	};
		// },
		render() {
			console.log('data[2] = ', this.site.length);

			const c1 = resolveComponent('Test01')
			const c2 = resolveComponent('Test02')
			//console.log(com)
			// // use an array to return multiple root nodes
			// return [
			//   h('div'),
			//   h('div'),
			//   h('div')
			// ]

			const n1 = h(c1, {
				name: '12345 ' + this.name,
				site: this.site,

				// https://vuejs.org/guide/extras/render-function.html#v-model
				'onUpdate:modelValue': (vc) => {
					//this.$emit('update:modelValue', vc)
					//console.log('PageIndex = ', vc);
				}
			});

			const n2 = h(c2, {
				name: '789 ' + this.name,
				site: this.site,
			});

			//return h('main', {}, [n1, n2]);
			return [n1, n2];
		}
	}
</script>
