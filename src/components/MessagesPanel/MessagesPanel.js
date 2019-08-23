import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// Components
import MessagesColumn from 'components/MessagesColumn'

const useStyles = makeStyles(theme => ({
	wrapper: {
		margin: '0 auto',
		display: 'flex',
		height: 'calc(100vh - 148px)'
	}
}))

const MessagesPanel = ({ messages, onRemoveMessage }) => {
	const classes = useStyles()

	const messageGroups = messages.reduce((groups, message) => {
		groups[message.priority] = groups[message.priority] || []
		groups[message.priority].push(message)

		return groups
	}, {})

	return (
		<div className={classes.wrapper}>
			{[1, 2, 3].map(priority => (
				<MessagesColumn key={priority} messages={messageGroups[priority]} priority={priority} onRemoveMessage={onRemoveMessage}/>
			))}
		</div>
	)
}

export default MessagesPanel
