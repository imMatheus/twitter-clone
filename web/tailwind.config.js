module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                cole: {
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee',
                    500: '#070223',
                    600: '#06021C',
                    700: '#050215',
                    800: '#03020F',
                    900: '#020208',
                },
            },
        },
    },
    plugins: [],
}
