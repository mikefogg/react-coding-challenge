import React from 'react'
// Test Helpers
import {
	createMessage,
	mountWithTheme
} from 'test/helpers'
// Components
import Message from './Message'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
// Utils
import Priority from 'utils/constants/priority'

const priorities = Object.values(Priority).map(p => [p.id, p.key, p.label])

describe('<Message/>', () => {
	describe.each(priorities)('When testing %%%p messages', (priority, key, label) => {
		describe('with a valid message provided', () => {
			const onRemoveMessage = jest.fn()
			let message
			let wrapper

			beforeAll(() => {
				message = createMessage({ priority })
				wrapper = mountWithTheme(
					<Message message={message} onRemoveMessage={onRemoveMessage}/>
				)
			})

			it('displays the correct message text', () => {
				expect(wrapper.find(Typography)).toHaveLength(2)
				expect(wrapper.find(Typography).at(0).text()).toEqual(message.text)
			})

			it('displays the correct message text', () => {
				expect(wrapper.find(Typography)).toHaveLength(2)
				expect(wrapper.find(Typography).at(1).text()).toEqual(message.createdAt.toLocaleString())
			})

			it('assigns the correct priority class', () => {
				expect(wrapper.find(`div.${key}`).length).toEqual(1)
			})

			it('assigns the correct priority class', () => {
				expect(wrapper.find(`div.${key}`).length).toEqual(1)
			})

			it('fires onRemoveMessage when the close button is clicked', () => {
				expect(onRemoveMessage.mock.calls.length).toEqual(0)
				wrapper.find(IconButton).simulate('click')
				expect(onRemoveMessage.mock.calls.length).toEqual(1)
			})
		})
	})
})
