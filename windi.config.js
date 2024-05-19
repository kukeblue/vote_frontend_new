import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
    theme: {
        borderColor: theme => ({
            ...theme('colors'),
            DEFAULT: theme('colors.gray.300', 'currentColor'),
            secondary: 'rgba(255, 255, 255, 0.5)',
            primary: 'var(--primary-color)',
          }),
        extend: {
            lineHeight: {
                'icon_tab': '0.65rem',
            },
            fontSize: {
                'small': '0.32rem',
                'common': '0.37rem',
                'base': '0.34rem',
                'lg': '0.41rem',
                'icon': '0.55rem',
                'icon_tab': '0.65rem',
                'title': '0.44rem',
                'title_large': '0.5rem',
                'large': '1rem'
            },
            backgroundColor: {
                rank_item: '#fefaf7',
                input: '#f6f6f6',
                primary: 'var(--primary-color)',
                masking: 'rgba(0,0,0,.3)',
                page: '#f2f2f2',
                wechat: '#2BA245',
                gray: '#999999'
            },
            textColor: {
                primary: 'var(--primary-color)',
                secondary: '#ffed4a',
                danger: '#e3342f',
                color_type2: '#4a4a4a',
                color_title: '#333',
                color_input_placeholder: '#999',
                color_dec: '#666',
                color_time_count: '#999'
            },
        }
    }
})