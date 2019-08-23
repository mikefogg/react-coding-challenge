import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
// Utilities
import Priority from 'utils/constants/priority'
// Custom Hooks
import usePrevious from 'utils/hooks/usePrevious'
// Components
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

// Styles

const useStyles = makeStyles(theme => ({
	icon: {
		fontSize: 20,
	},
	error: {
		backgroundColor: theme.palette.error.main
	},
	warning: {
		backgroundColor: theme.palette.warning.main
	},
	info: {
		backgroundColor: theme.palette.info.main
	}
}))

// Component

const SnackbarConductor = ({ messages }) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [currentMessage, setCurrentMessage] = useState(null)
	const prevMessages = usePrevious(messages)
	const snackbarTimeout = useRef(null)

	useEffect(() => {
		// Only fire the snackbar if our length is greater than it was before
		if (
			messages.length === 0 ||
			!prevMessages ||
			messages.length < prevMessages.length
		) { return }
		// Messages changed, we need a snackbar!
		const newMessage = messages[0]
		if (newMessage.priority === 1) {
			setCurrentMessage(newMessage)
		}
	}, [messages, prevMessages])

	useEffect(() => {
		// Reset our timeout
		clearTimeout(snackbarTimeout.current)
		// If we set it to null, we don't need to reset the timeout
		if (!currentMessage) { return }
		// We changed our snackbar! Set a 2 second timeout to clear it
		snackbarTimeout.current = setTimeout(() => {
			setOpen(false)
		}, 2000)
		// Open our snackbar!
		setOpen(true)
		// Make sure we clera the timeout on teardown
		return () => clearTimeout(snackbarTimeout.current)
	}, [currentMessage])

	return (
		<div>
			{currentMessage && (
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={open}
					onClose={() => setOpen(false)}
				>
					<SnackbarContent
						className={classes[Priority[currentMessage.priority].key]}
						message={<span>{currentMessage.text}</span>}
						action={[
							<IconButton key='close' color='inherit' onClick={() => setOpen(false)}>
								<CloseIcon className={classes.icon} />
							</IconButton>
						]}
					/>
				</Snackbar>
			)}
		</div>
	)
}

// PropTypes

SnackbarConductor.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default SnackbarConductor
