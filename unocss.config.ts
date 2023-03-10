import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  shortcuts: [
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
    ],
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'
    ],
    ['center-layout', 'flex items-center justify-center'],
    ['center-layout-v', 'flex items-center'],
    ['center-layout-h', 'flex justify-center']
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    })
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
  rules: [
    [/^font-size-(\d+)$/, ([, d]) => ({ 'font-size': `${(d as any) / 10}rem` })],
    [/^hover:transform-scale-(\d+)$/, ([, d]) => ({ transform: `scale(${(d as any) / 10}rem)` })],
    [/^translate-([xyz])-(\d+)$/, ([, d, d1]) => ({ transform: `translate${d}(${d1 as any}px)` })]
  ]
})
