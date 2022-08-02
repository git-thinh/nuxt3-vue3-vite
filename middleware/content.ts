export default defineNuxtRouteMiddleware((to, from) => {
	const config = useRuntimeConfig();
	console.log('running global middleware', config)

})
