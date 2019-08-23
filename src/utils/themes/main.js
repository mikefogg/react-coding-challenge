import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#90b3ff',
			main: '#5584ff',
			dark: '#0058cb',
			contrastText: '#ffffff'
		},
		black: {
			main: '#000000',
			contrastText: '#ffffff'
		},
		gray: {
			lighter: '#f2f2f2',
			light: '#e2e2e2',
			main: '#c2c2c2',
			dark: '#a2a2a2',
			contrastText: '#000000'
		},
		error: {
			light: '#ff9463',
			main: '#f56236',
			dark: '#bb2f07',
			contrastText: '#000000'
		},
		warning: {
			light: '#ffffb9',
			main: '#fce788',
			dark: '#c7b559',
			contrastText: '#000000'
		},
		info: {
			light: '#bcffd5',
			main: '#88fca3',
			dark: '#53c874',
			contrastText: '#000000'
		}
	}
})

export default theme
