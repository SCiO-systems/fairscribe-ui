import React from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import Gleap from 'gleap';
import AppWrapper from './AppWrapper';
import './utilities/i18n-next';

if (process.env.REACT_APP_ENVIRONMENT !== 'development') {
	Gleap.initialize('6bJ4qXega4kkTp2dPhy4kxgNC7R01GdL');
}

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
	queries: {
		retry: (_failureCount, error) => {
			if (error?.response?.status === 401) {
				return false;
			}
			return true;
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<AppWrapper />
			</QueryClientProvider>
		</HashRouter>
	</React.StrictMode>
);

// ReactDOM.render(
// 	<HashRouter>
// 		<QueryClientProvider client={queryClient}>
// 			<AppWrapper />
// 		</QueryClientProvider>
// 	</HashRouter>,
// 	document.getElementById('root')
// );
