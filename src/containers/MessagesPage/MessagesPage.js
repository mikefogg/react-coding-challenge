//
// NOTES: Testing this component was especially difficult because of the way we're loading
// in messages via the generator and that I've wrapped things in a ThemeProvider for consistent
// styling. Since unfortunately we can't use setState in functional components yet in Jest/Enzyme,
// I had to turn this component into a Class based component (which is why it's the only one).
//

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
// API
import MessagesApi from 'utils/api/messages'
// Utilities
import Priority from 'utils/constants/priority'
// Components
import SnackbarConductor from 'components/SnackbarConductor'
import NavBar from 'components/NavBar'
import MessageColumn from 'components/MessageColumn'

// Styles

const styles = theme => ({
	wrapper: {
		margin: 0,
		paddingTop: 148
	},
	panelWrapper: {
		margin: '0 auto',
		display: 'flex',
		height: 'calc(100vh - 148px)'
	}
})

// Component

class MessagesPage extends Component {
	state = {
		isLoading: true,
		messages: []
	}

	componentDidMount() {
		this.messageGenerator.start()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.isLoading === this.state.isLoading){ return }
    this.state.isLoading ? this.messageGenerator.start() : this.messageGenerator.stop()
  }

	// Store a reference to the last id we created
	lastId = 0

	// When we get a new message, handle it
	onMessageReceived = ({ message, priority }) => {
		// If we have an invalid priority or no message... reject it
		if (!message || Object.values(Priority).map(p => p.id).indexOf(priority) === -1) { return }
		// Create a new unique identifier
		this.lastId = this.lastId + 1
		// Combine our message into a nice object with all of our data
		const newMessage = {
			id: this.lastId,
			text: message,
			priority: priority,
			createdAt: new Date()
		}
		// Update our messages
		this.setState(prevState => ({
			messages: [
				newMessage,
				...prevState.messages
			]
		}))
	}

	// Toggle our loading state
	onToggleLoading = () => {
		this.setState(prevState => ({
			isLoading: !prevState.isLoading
		}))
	}

	// Clear the messages
	onClearMessages = () => {
		this.setState({
			messages: []
		})
	}

	// Remove a specific message by id
	onRemoveMessage = id => {
		// Update our messages
		this.setState(prevState => ({
			messages: prevState.messages.filter(message => message.id !== id)
		}))
	}

	// Render our message columns
	renderColumns = () => {
		// Group messages by their priority
		const messageGroups = this.state.messages.reduce((groups, message) => {
			groups[message.priority] = groups[message.priority] || []
			groups[message.priority].push(message)
			return groups
		}, {})

		// Return a messageColumn for each priority type
		return Object.values(Priority).map(priority => (
			<MessageColumn key={priority.id} messages={messageGroups[priority.id] || []} priority={priority.id} onRemoveMessage={this.onRemoveMessage}/>
		))
	}

	// Setup our message generator
	messageGenerator = new MessagesApi({
		messageCallback: this.onMessageReceived
	})

  render() {


		return (
	    <div className={this.props.classes.wrapper}>
				<SnackbarConductor messages={this.state.messages}/>
				<NavBar isLoading={this.state.isLoading} onToggleLoading={this.onToggleLoading} onClearMessages={this.onClearMessages}/>
				<div className={this.props.classes.panelWrapper}>
					{this.renderColumns()}
				</div>
	    </div>
		)
	}
}

export default withStyles(styles)(MessagesPage)
