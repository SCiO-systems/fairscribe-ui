/* eslint-disable */
import React, { createContext, useState } from 'react';

const initialState = {
	content: null,
};

export const ToastContext = createContext(initialState);

export const ToastProvider = ({ children }) => {
	const [toastContent, setToastContent] = useState(initialState);

	// The popup notification hide delay in milliseconds.
	const life = 8000;

	return (
		<ToastContext.Provider
			value={{
				...toastContent,
				clear: () => setToastContent(initialState),
				setError: (summary, detail) =>
					setToastContent({ content: { summary, detail, severity: 'error', life } }),
				setInfo: (summary, detail) =>
					setToastContent({ content: { summary, detail, severity: 'info', life } }),
				setWarn: (summary, detail) =>
					setToastContent({ content: { summary, detail, severity: 'warn', life } }),
				setSuccess: (summary, detail) =>
					setToastContent({
						content: { summary, detail, severity: 'success', life },
					}),
			}}
		>
			{children}
		</ToastContext.Provider>
	);
};
