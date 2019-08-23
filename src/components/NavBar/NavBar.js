import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
// Components
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
	wrapper: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		boxShadow: '0 0 4px rgba(0,0,0,0.25)'
	},
	title: {
		flex: 1,
		color: theme.palette.primary.contrastText
	},
	titleSpan: {
		paddingLeft: 10,
		color: theme.palette.primary.light
	},
	button: {
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		marginLeft: 20,
		'&:first-of-type': {
			marginLeft: 0
		}
	},
	buttonToggleLoading: props => ({
		backgroundColor: props.isLoading ? theme.palette.primary.light : theme.palette.primary.main
	}),
	navBar: {
		padding: 20,
		backgroundColor: theme.palette.primary.dark
	},
	buttonBar: {
		padding: 20,
		backgroundColor: theme.palette.primary.main
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}))

const NavBar = ({ isLoading, onToggleLoading, onClearMessages }) => {
	const classes = useStyles({ isLoading: isLoading })

	return (
		<div position='static' className={classes.wrapper}>
			<div className={classes.navBar}>
				<Typography variant='h6' className={classes.title}>
					Help.com
					<span className={classes.titleSpan}>Message Dashboard</span>
				</Typography>
			</div>
			<div className={classes.buttonBar}>
				<div className={classes.buttons}>
					<Button variant='contained' className={clsx([classes.button, classes.buttonToggleLoading])} onClick={onToggleLoading}>
						{isLoading ? 'Stop Messages' : 'Start Messages'}
					</Button>
					<Button variant='contained' className={classes.button} onClick={onClearMessages}>
						Clear Messages
					</Button>
				</div>
			</div>
		</div>
	)
}

export default NavBar
