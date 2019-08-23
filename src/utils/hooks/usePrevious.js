//
// Custom Hook: usePrevious
// - Used to store a previous value (usually used in a useEffect) call similar to
// - the old `prevState`
//

import { useEffect, useRef } from 'react'

// Custom hook to return the previous value
const usePrevious = value => {
	const ref = useRef()

	// Update our ref when value changes
	useEffect(() => {
		ref.current = value
	}, [value])

	// This is returned before useEffect updates the value
	return ref.current
}

export default usePrevious
