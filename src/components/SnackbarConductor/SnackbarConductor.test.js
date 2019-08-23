// It only displays error messages
// It closes the current error when close button is clicked
// It automatically closes after 2 seconds
// It replaces the current text if a new error appears


import React from 'react'
import { createMount } from '@material-ui/core/test-utils'
import { act } from 'react-dom/test-utils'
// Test Helpers
import {
	createMessage,
	mountWithTheme
} from 'test/helpers'
// Components
import SnackbarConductor from './SnackbarConductor'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'

describe('<SnackbarConductor/>', () => {
	let wrapper

	beforeEach(() => {
		wrapper = mountWithTheme(
			<SnackbarConductor messages={[]} />
		)
	})

	it('starts with no Snackbar', () => {
		expect(wrapper.find(Snackbar)).toHaveLength(0)
	})

	it('only displays error messages', () => {
		expect(wrapper.find(Snackbar)).toHaveLength(0)
		// Fire off two that shouldn't count
		wrapper.setProps({ messages: [createMessage({ priority: 2 })] })
		expect(wrapper.find(SnackbarConductor).props().messages).toHaveLength(1)
		wrapper.update()
		expect(wrapper.find(Snackbar)).toHaveLength(0)
		// Now fire one that should
		const errorMessage = createMessage({ priority: 1 })
		wrapper.setProps({ messages: [errorMessage] })
		expect(wrapper.find(SnackbarConductor).props().messages).toHaveLength(1)
		// Rerender our UI
		wrapper.update()
		// Make sure we're displaying the snackbar now
		expect(wrapper.find(Snackbar)).toHaveLength(1)
		expect(wrapper.find(Snackbar).find(Typography).at(0).text()).toEqual(errorMessage.text)
	})

	describe('after a snackbar is open', () => {
		beforeEach(() => {
			// Make sure we use fake timers here
			jest.useFakeTimers()

			expect(wrapper.find(Snackbar)).toHaveLength(0)
			// Display an error message
			wrapper.setProps({
				messages: [
					createMessage({
						text: 'first error',
						priority: 1
					})
				]
			})
			// Rerender our UI
			wrapper.update()
			// Make sure it's open
			expect(wrapper.find(Snackbar)).toHaveLength(1)
		})

		it('closes when a user clicks the close button', () => {
			// Make sure it's open
			expect(wrapper.find(Snackbar).prop('open')).toEqual(true)
			// Click the close button
			wrapper.find(IconButton).simulate('click')
			wrapper.update()
			// Make sure it's closed now
			expect(wrapper.find(Snackbar).prop('open')).toEqual(false)
		})

		it('stays open for 2 seconds', () => {
			// Make sure it's open
			expect(wrapper.find(Snackbar).prop('open')).toEqual(true)
			// Make sure it's still open after 1.5 seconds
			act(() => jest.advanceTimersByTime(1500))
			wrapper.update()
			expect(wrapper.find(Snackbar).prop('open')).toEqual(true)
			// Then make sure it's closed after 600 more ms :)
			act(() => jest.advanceTimersByTime(600))
			wrapper.update()
			expect(wrapper.find(Snackbar).prop('open')).toEqual(false)
		})

		it('resets timer and replaces text if new message is added ', () => {
			// Make sure it's open
			expect(wrapper.find(Snackbar).prop('open')).toEqual(true)
			// Make sure it's still open after 1.5 seconds
			act(() => jest.advanceTimersByTime(1500))
			wrapper.update()
			expect(wrapper.find(Snackbar).prop('open')).toEqual(true)
			expect(wrapper.find(Snackbar).find(Typography).at(0).text()).toEqual('first error')
			// Set the state to a new message
			wrapper.setProps({
				messages: [
					createMessage({
						priority: 1,
						text: 'second error'
					})
				]
			})
			// Make sure it's still open after another 1.5 seconds (reset the timer)
			act(() => jest.advanceTimersByTime(1500))
			wrapper.update()
			expect(wrapper.find(Snackbar).prop('open')).toEqual(true)
			expect(wrapper.find(Snackbar).find(Typography).at(0).text()).toEqual('second error')
			// Then make sure it's closed after 600 more ms :)
			act(() => jest.advanceTimersByTime(600))
			wrapper.update()
			expect(wrapper.find(Snackbar).prop('open')).toEqual(false)
		})
	})
})
