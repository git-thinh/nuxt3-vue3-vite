<script setup>
	useHead({
		title: 'Mascot test for Nuxt 3',
		link: [{
			rel: 'icon',
			type: 'image/png',
			href: '/nuxt.png',
		}, ],
	})
</script>

<template>
	<NuxtPage />
</template>

<style>
	html,
	body,
	#__nuxt {
		height: 100vh;
		margin: 0;
		padding: 0;
	}

	html.dark {
		background: #222;
		color: white;
	}
</style>
