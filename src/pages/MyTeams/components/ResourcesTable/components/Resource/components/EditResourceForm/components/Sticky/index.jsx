import React, { useEffect, useRef, useState } from 'react';

const Sticky = ({ children, rightOffset }) => {
	const [offset, setOffset] = useState(undefined);
	const [height, setHeight] = useState(0);
	const [style, setStyle] = useState({});
	const elementRef = useRef(null);

	// eslint-disable-next-line
  useEffect(() => {
		if (elementRef.current) {
			const boundingRect = elementRef.current.getBoundingClientRect();
			if (!offset) {
				setOffset(boundingRect.y);
			}

			if (height !== boundingRect.height) {
				setHeight(boundingRect.height);
			}
		}
	});

	useEffect(() => {
		if (offset) {
			setStyle({
				position: 'fixed',
				top: offset,
				zIndex: 1100,
				right: rightOffset,
			});
		}
	}, [offset, rightOffset]);

	return (
		<>
			<div ref={elementRef} style={style}>
				{children}
			</div>
			<div style={{ visibility: 'hidden', height }} />
		</>
	);
};

export default Sticky;
