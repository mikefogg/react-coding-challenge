import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// Utilities
import Priority from 'utils/constants/priority'
// Components
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: props => ({
		display: 'flex',
		marginTop: 10,
		padding: 20,
		alignItems: 'center',
		borderRadius: 4,
		backgroundColor: theme.palette[props.priority].main,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette[props.priority].dark,
		boxShadow: '0 2px 1px 1px rgba(0,0,0,0.1)',
		'&:first-of-type': {
			marginTop: 0
		}
  }),
	details: {
		flex: 1,
		paddingRight: 20
	},
	message: props => ({
		fontSize: 18,
		color: theme.palette[props.priority].contrastText
	}),
	timestamp: props => ({
		fontSize: 14,
		marginTop: 8,
		color: theme.palette[props.priority].dark
	}),
	icon: {
		fontSize: 20
	}
}))

const Message = ({ message, onRemoveMessage }) => {
	const classes = useStyles({ priority: Priority[message.priority].key })

	return (
		<div className={classes.card}>
			<div className={classes.details}>
      	<Typography className={classes.message}>{message.text}</Typography>
				<Typography className={classes.timestamp}>{message.createdAt.toLocaleString()}</Typography>
			</div>
			<IconButton onClick={() => onRemoveMessage(message.id)}>
				<CloseIcon className={classes.icon} />
			</IconButton>
    </div>
	)
}

export default Message
