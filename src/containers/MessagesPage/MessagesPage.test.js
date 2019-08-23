import React from 'react'
import { shallow } from 'enzyme'
import { unwrap } from "@material-ui/core/test-utils"
// Test Helpers
import {
	createMessage,
	mountWithTheme
} from 'test/helpers'
// Components
import MessagesPage from './MessagesPage'
import MessageColumn from 'components/MessageColumn'
import SnackbarConductor from 'components/SnackbarConductor'
import NavBar from 'components/NavBar'

// Unwrap the component from the withStyles call we wrap it in for theming
const NakedMessagesPage = unwrap(MessagesPage)

describe('<MessagesPage/>', () => {
	let wrapper

	const setMessages = messages => wrapper.setState({ messages })

	beforeAll(() => {
		wrapper = shallow(
			<NakedMessagesPage classes={{}}/>
		)
	})

	it('starts loading when the page is loaded', () => {
		expect(wrapper.state('isLoading')).toEqual(true)
		expect(wrapper.instance().messageGenerator.isStarted()).toEqual(true)
	})

	it('displays a table for each priority', () => {
		expect(wrapper.find(MessageColumn)).toHaveLength(3)
		expect(wrapper.find(MessageColumn).at(0).prop('priority')).toEqual(1)
		expect(wrapper.find(MessageColumn).at(1).prop('priority')).toEqual(2)
		expect(wrapper.find(MessageColumn).at(2).prop('priority')).toEqual(3)
	})

	it('groups new messages based on their priority', () => {
		setMessages([
			// Create 3 errors
			createMessage({ priority: 1 }),
			createMessage({ priority: 1 }),
			createMessage({ priority: 1 }),
			// Create 2 warnings
			createMessage({ priority: 2 }),
			createMessage({ priority: 2 }),
			// Create 1 info
			createMessage({ priority: 3 })
		])
		expect(wrapper.find(MessageColumn).at(0).prop('messages')).toHaveLength(3)
		expect(wrapper.find(MessageColumn).at(1).prop('messages')).toHaveLength(2)
		expect(wrapper.find(MessageColumn).at(2).prop('messages')).toHaveLength(1)
	})

	describe('when firing event handlers', () => {
		describe("when receiving messages in onMessageReceived", () => {
			beforeEach(() => {
				wrapper.setState({
					messages: []
				})
				expect(wrapper.state('messages')).toEqual([])
			})

			describe('when messages are valid', () => {
				it('accepts valid messages', () => {
					wrapper.instance().onMessageReceived({
						message: 'Testing valid',
						priority: 1
					})
					expect(wrapper.state('messages')[0].text).toEqual('Testing valid')
				})

				it('sorts messages with newest first', () => {
					wrapper.instance().onMessageReceived({
						message: 'Testing one',
						priority: 3
					})
					wrapper.instance().onMessageReceived({
						message: 'Testing two',
						priority: 3
					})
					expect(wrapper.state('messages').map(m => m.text)).toEqual(['Testing two', 'Testing one'])
				})
			})

			it('rejects messages that don\'t have message text', () => {
				wrapper.instance().onMessageReceived({
					message: null,
					priority: 1
				})
				expect(wrapper.state('messages')).toEqual([])
			})

			it('rejects messages that don\'t have a correct priority', () => {
				wrapper.instance().onMessageReceived({
					message: 'Testing valid',
					priority: 4
				})
				expect(wrapper.state('messages')).toEqual([])
			})
		})

		it("toggles the loading state when 'onToggleLoading' is called", () => {
			expect(wrapper.state('isLoading')).toEqual(true)
			expect(wrapper.instance().messageGenerator.isStarted()).toEqual(true)
			wrapper.instance().onToggleLoading()
			expect(wrapper.state('isLoading')).toEqual(false)
			expect(wrapper.instance().messageGenerator.isStarted()).toEqual(false)
		})

		it("removes all messages when 'onClearMessages' is called", () => {
			setMessages([
				// Create 2 Errors
				createMessage({ id: 1, priority: 1 }),
				createMessage({ id: 2, priority: 1 })
			])
			expect(wrapper.find(MessageColumn).at(0).prop('messages')).toHaveLength(2)
			wrapper.instance().onClearMessages()
			expect(wrapper.find(MessageColumn).at(0).prop('messages')).toHaveLength(0)
		})

		it("removes a message when 'onRemoveMessage' is called", () => {
			setMessages([
				// Create 2 Errors
				createMessage({ id: 1, priority: 1 }),
				createMessage({ id: 2, priority: 1 })
			])
			expect(wrapper.find(MessageColumn).at(0).prop('messages')).toHaveLength(2)
			wrapper.instance().onRemoveMessage(1)
			expect(wrapper.find(MessageColumn).at(0).prop('messages')).toHaveLength(1)
		})
	})
})
