import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// API
import MessagesApi from 'utils/api/messages'
// Utilities
import SnackbarConductor from 'components/SnackbarConductor'
import NavBar from 'components/NavBar'
import MessagesPanel from 'components/MessagesPanel'

const useStyles = makeStyles(theme => ({
	wrapper: {
		margin: 0,
		paddingTop: 148
	}
}))

const MessagesPage = () => {
	const classes = useStyles()
	const [isLoading, setIsLoading] = useState(true)
	const [messages, setMessages] = useState([])
	const lastId = useRef(0)

	//
	// Setup our Message Generator
	//

	const messageGenerator = useRef(new MessagesApi({
		messageCallback: ({ message, priority }) => {
			// Create a new unique identifier
			lastId.current = lastId.current + 1
			// Combine our message into a nice object with all of our data
			const newMessage = {
				id: lastId.current,
				text: message,
				priority: priority,
				createdAt: new Date()
			}
			// Update our messages
			setMessages(prevMessages => ([
				newMessage,
				...prevMessages
			]))
		}
	}))

	useEffect(() => {
		isLoading ? messageGenerator.current.start() : messageGenerator.current.stop()
	}, [isLoading])

	//
	// Event Handlers
	//

	const onToggleLoading = () => {
		setIsLoading(!isLoading)
	}

	const onClearMessages = () => {
		setMessages([])
	}

	const onRemoveMessage = id => {
		console.log('removing', id)
		setMessages(prevMessages => prevMessages.filter(message => message.id !== id))
	}

  return (
    <div className={classes.wrapper}>
			<SnackbarConductor messages={messages}/>
			<NavBar isLoading={isLoading} onToggleLoading={onToggleLoading} onClearMessages={onClearMessages}/>
			<MessagesPanel messages={messages} onRemoveMessage={onRemoveMessage}/>
    </div>
  )
}

export default MessagesPage
