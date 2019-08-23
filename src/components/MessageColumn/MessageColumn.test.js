// It displays the correct label

// Without any messages in the queue
// - It displays 0 for the message count

// With messages in the queue
// - It displays the correct length for the message count
// - It displays a Message component for each message

import React from 'react'
// Test Helpers
import {
	createMessage,
	mountWithTheme
} from 'test/helpers'
// Components
import Message from 'components/Message'
import MessageColumn from './MessageColumn'
import Typography from '@material-ui/core/Typography'
// Utils
import Priority from 'utils/constants/priority'

const priorities = Object.values(Priority).map(p => [p.id, p.key, p.label])

describe('<MessageColumn/>', () => {
	describe.each(priorities)('When testing %%%p messages', (priority, key, label) => {
		const onRemoveMessage = jest.fn()
		let wrapper

		beforeAll(() => {
			wrapper = mountWithTheme(
				<MessageColumn messages={[]} priority={priority} onRemoveMessage={onRemoveMessage}/>
			)
		})

		it('displays the correct header', () => {
			expect(wrapper.find(Typography).at(0).text()).toEqual(label)
		})

		describe('without any messages in the queue', () => {
			it('does not display any messages', () => {
				expect(wrapper.find(Message)).toHaveLength(0)
			})

			it('displays the message count', () => {
				expect(wrapper.find(Typography).at(1).text()).toEqual(`0 Messages`)
			})
		})

		describe('with messages in the queue', () => {
			let messages

			beforeAll(() => {
				messages = [...Array(10)].map((n, i) => (
					createMessage({ id: i, priority })
				))
				wrapper = mountWithTheme(
					<MessageColumn messages={messages} priority={priority} onRemoveMessage={onRemoveMessage}/>
				)
			})

			it('displays 10 messages', () => {
				expect(wrapper.find(Message)).toHaveLength(10)
			})

			it('displays the message count', () => {
				expect(wrapper.find(Typography).at(1).text()).toEqual(`10 Messages`)
			})
		})
	})
})
