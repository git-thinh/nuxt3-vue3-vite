import { defineNuxtConfig } from 'nuxt'


export default defineNuxtConfig(async () => {

	const __getRouters = () => {
		return new Promise((resolve, reject) => {
			resolve(['/', '/not-find'])
		})
	};
	const __routers = await __getRouters();
	//console.log(__routers)

	const __cfAutoImport = () => {
		return {
			include: [/\.ts$/, /\.vue$/, /\.md$/],
			imports: [
				'vue',
				'vue-router',
				'vue/macros',
				'@vueuse/head',
				//'@vueuse/sound',
				//'@vueuse/core',
				//'@vueuse/nuxt',
				{
					'@vueuse/core': [
						// https://vueuse.org/guide/
						// import { useMouse } from '@vueuse/core',
						'useScriptTag',//https://vueuse.org/core/useScriptTag/
						'useNetwork', 'useOnline',
						'useClipboard',
						'useFullscreen', //https://vueuse.org/core/useFullscreen/#demo
						'useObjectUrl', //https://vueuse.org/core/useObjectUrl/#usage
						'useFileDialog', //https://vueuse.org/core/useFileDialog/#demo
						'useFileSystemAccess', //https://vueuse.org/core/useFileSystemAccess/#demo
						'useEyeDropper', //https://vueuse.org/core/useEyeDropper/#component-usage
						'useCssVar', 'useDark', 'useToggle', 'useMouse', 'onClickOutside', 'useConfirmDialog',
						'useMediaControls', //https://vueuse.org/core/useMediaControls/
						'useImage', 'useInfiniteScroll', 'useMouseInElement',
						'useElementVisibility', 'useDocumentVisibility',
						'useDevicesList', 'useUserMedia', 'useSpeechRecognition', 'useSpeechSynthesis',
						// alias
						['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
					],
					'@vueuse/sound': ['useSound'], //import { useSound } from '@vueuse/sound'

					//'vue': ['defineComponent', 'computed'],
					//'~store/user': ['useUserStore'] 

					'axios': [['default', 'axios']], //// import { default as axios } from 'axios',
					'vue-request': ['useRequest', 'usePagination'],

					//'^/type/speech-types': ['__postApi'],

					'♥/setup/AppSetup': ['AppSetup'],

					'^/mixin/GlobalFunction': ['__getWindow', '__postApi'],
					'^/mixin/MixLayout': ['MixLayout'],
					'^/mixin/MixPage': ['MixPage'],
					'^/mixin/MixComponent': ['MixComponent'],
				},
				// '[package-name]': [
				// 	 '[import-names]',
				// 	 ['[from]', '[alias]'],
				// ],
			],

			// Auto import for all module exports under directories
			// dirs: [
			// 	// './hooks',
			// 	// './composables'
			// 	// ...
			// ],

			// Filepath to generate corresponding .d.ts file.
			// Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
			// Set `false` to disable.
			// dts: 'src/auto-imports.d.ts',
			dts: `./auto-imports.d.ts`,

			// Auto import inside Vue template
			// see https://github.com/unjs/unimport/pull/15
			//vueTemplate: false,

			// Custom resolvers, compatible with `unplugin-vue-components`
			// see https://github.com/antfu/unplugin-auto-import/pull/23/
			//resolvers: [/* ... */],
		};
	};

	const __cfBuild = () => {
		const v = {
			html: {
				minify: false,
			},

			indicator: false,
			extractCSS: true,
			optimizeCSS: true,

			optimization: {
				splitChunks: {
					cacheGroups: {
						styles: {
							name: 'styles',
							test: /\.(css|vue)$/,
							chunks: 'all',
							enforce: true
						},
					}
				}
			},

			filenames: {
				app: 'modern.js',
				chunk: 'js/[name].js',
				font: 'fonts/[name].[ext]',
				img: '[path][name].[ext]'
			},

			postcss: {
				plugins: [
					// postcssImport(),
					// postcssPresetEnv({
					// 	stage: 2,
					// 	preserve: cf.NODE_ENV !== 'production',
					// 	//importFrom: ['assets/css/_mediaqueries.css', `assets/css/_variables.css`],
					// 	autoprefixer: {
					// 		grid: true
					// 	},
					// 	features: {
					// 		'color-mod-function': {
					// 			unresolved: 'warn'
					// 		},
					// 		'custom-media-queries': {}
					// 	},
					// 	browsers: ['>= 5% in DK', 'ie 11']
					// }),
					// postcssNested(),
					// postcssCalc(),
					// postcssReporter({
					// 	clearReportedMessages: true
					// })
				]
			},
			extend(config, {
				isDev,
				isClient
			}) {
				if (isDev && isClient) { }
			},
			extend(config, ctx) {
				if (ctx.isDev) {
					//config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
				}
			}
		};

		return v;
	};

	return {
		target: 'static', //spa static
		ssr: true,
		telemetry: true,

		components: {
			global: true,
			dirs: ['~/Test']
		},

		alias: {
			//'@': './'
			//'^runtime': cf.__pathRuntime,
		},

		vue: {
			config: {
				silent: true //Hide warning components runtimes...
			}
		},
		router: {
			prefetchLinks: false,
			trailingSlash: true,
			extendRoutes(routes, resolve) {
				routes.splice(0, routes.length);
				routes.push({
					name: 'content',
					path: '*',
					component: resolve(__dirname, 'pages/index.vue')
				});
			}
		},
		generate: {
			dir: './build',
			fallback: "404.html",
			crawler: false,
			interval: 100,
			concurrency: 1500, //def=500
			//routes: ['/', '/not-find']
			routes: __routers
		},
		sitemap: {
			//hostname: cf.BASE_URL,
			hostname: 'http://test.com',
			trailingSlash: true,
			cacheTime: 86400000,
			//cacheTime: cf.NODE_ENV === 'production' ? 86400000 : 0,
			exclude: ['**/_icons'],
			routes: __routers
		},

		build: __cfBuild(),

		//modules: ['@nuxtjs/axios', '@nuxtjs/svg-sprite', '@nuxtjs/sitemap', '@nuxtjs/netlify-files'],
		//plugins: ['~/plugins/axios', '~/plugins/apis', '~/plugins/utils', '~/plugins/app-mixins'],  
		modules: [
			'@vueuse/nuxt',
			'@unocss/nuxt',
			'@pinia/nuxt',
			'@nuxtjs/color-mode',
		],
		buildModules: [
			//['unplugin-auto-import/nuxt', {}],
			['unplugin-auto-import/nuxt', __cfAutoImport()],
		],

		experimental: {
			reactivityTransform: true,
			viteNode: false,
		},
		unocss: {
			preflight: true,
		},
		colorMode: {
			classSuffix: '',
		},
		render: {
			http2: {
				push: true
			}
		},
	};
})
