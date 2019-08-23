import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// Utils
import Priority from 'utils/constants/priority'
// Components
import Typography from '@material-ui/core/Typography'
import Message from 'components/Message'

//
// Styles
//

const useStyles = makeStyles((theme, props) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		borderLeft: `1px solid ${theme.palette.gray.lighter}`,
		'&:first-of-type': {
			borderLeft: 0
		}
	},
	header: {
		padding: 20,
	},
	title: props => ({
    fontSize: 16,
		color: theme.palette.black.main
  }),
	subtTitle: {
    fontSize: 14,
		color: theme.palette.gray.main
  },
	scrollArea: {
		flex: 1,
		margin: 20,
		marginTop: 0,
		padding: 20,
		overflow: 'hidden',
		overflowY: 'scroll',
		backgroundColor: '#f2f2f2',
		borderRadius: 4,
		boxShadow: 'inset 0 2px 2px rgba(0,0,0,0.15)'
	}
}))

const MessagesColumn = ({ messages, priority, onRemoveMessage }) => {
	const priorityData = Priority[priority]
	const classes = useStyles({ priority: priorityData.key })

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<Typography className={classes.title} >
					{priorityData.label}
				</Typography>
				<Typography className={classes.subtTitle}>
	        {messages ? messages.length : 0} Messages
	      </Typography>
			</div>
			<div className={classes.scrollArea}>
				{messages && messages.map(message => (
					<Message message={message} onRemoveMessage={onRemoveMessage}/>
				))}
			</div>
		</div>
	)
}

export default MessagesColumn
