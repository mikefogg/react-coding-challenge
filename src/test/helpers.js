import React from 'react'
import { mount } from 'enzyme'
// Styling
import MainTheme from 'utils/themes/main'
import { ThemeProvider } from '@material-ui/styles'

//
// Wrap a component in our theme
//

export const mountWithTheme = (child) => {
	return mount(child, {
		wrappingComponent: ({ children }) => <ThemeProvider theme={MainTheme}>{children}</ThemeProvider>
	})
}

//
// Generate a valid message
//

export const createMessage = opts => Object.assign({
	id: 1,
	priority: 1,
	text: 'example text',
	createdAt: new Date()
}, opts)
