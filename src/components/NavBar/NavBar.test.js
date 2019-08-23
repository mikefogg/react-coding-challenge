// When messages are being loaded
// - It displays 'Stop Messages' on the toggle button
// - It stops loading messages when the toggle button is clicked

// When messages are not being loaded
// - It displays 'Start Messages' on the toggle button
// - It starts loading messages when the toggle button is clicked

// It clears messages when the Clear button is clicked

import React from 'react'
// Test Helpers
import {
	createMessage,
	mountWithTheme
} from 'test/helpers'
// Components
import NavBar from './NavBar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

describe('<NavBar/>', () => {
	const onToggleLoading = jest.fn()
	const onClearMessages = jest.fn()
	let wrapper

	beforeAll(() => {
		wrapper = mountWithTheme(
			<NavBar isLoading={false} onToggleLoading={onToggleLoading} onClearMessages={onClearMessages}/>
		)
	})

	it("fires the 'onToggleLoading' function on toggle button click", () => {
		expect(onToggleLoading.mock.calls.length).toEqual(0)
		wrapper.find(Button).at(0).simulate('click')
		expect(onToggleLoading.mock.calls.length).toEqual(1)
	})

	it("fires the 'onClearMessages' function on clear button click", () => {
		expect(onClearMessages.mock.calls.length).toEqual(0)
		wrapper.find(Button).at(1).simulate('click')
		expect(onClearMessages.mock.calls.length).toEqual(1)
	})

	describe('when items are not being loaded', () => {
		it("displays 'Start Messages' on the toggle button", () => {
			expect(wrapper.find(Button).at(0).text()).toEqual('Start Messages')
		})
	})

	describe('when items are not being loaded', () => {
		beforeAll(() => {
			wrapper = mountWithTheme(
				<NavBar isLoading={true} onToggleLoading={onToggleLoading} onClearMessages={onClearMessages}/>
			)
		})

		it("displays 'Stop Messages' on the toggle button", () => {
			expect(wrapper.find(Button).at(0).text()).toEqual('Stop Messages')
		})
	})
})
