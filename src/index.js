import React from 'react'
import ReactDOM from 'react-dom'
import MessagesPage from './containers/MessagesPage'
import { ThemeProvider } from '@material-ui/styles'
import MainTheme from 'utils/themes/main'
import './index.css'

//
// Theme Helper
//

const renderApp = App => {
  ReactDOM.render((
		<ThemeProvider theme={MainTheme}>
			<App />
		</ThemeProvider>
	), document.getElementById('root'))
}

renderApp(MessagesPage)

if (module.hot) {
  module.hot.accept('./containers/MessagesPage', () => {
    renderApp(MessagesPage)
  })
}
