import React, { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import Error_404 from './404';
import Error_403 from './403';
import Error_500 from './500';
import {
	FallbackProps,
	ErrorBoundary as GenericErrorBoundary,
} from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const ErrorPage = useMemo(() => {
		let errorMessage;
		try {
			if (typeof error === 'string') {
				//@ts-ignore
				errorMessage = JSON.parse(error.message);
			} else {
				errorMessage = error;
			} // eslint-disable-next-line no-empty
		} catch (e) { }

		switch (errorMessage?.code) {
			case 403:
				return Error_403;
			case 4031:
				return Error_403;
			case 4041:
				return Error_404;
			default:
				return Error_500;
		}
	}, [error]);

	return <ErrorPage onReset={resetErrorBoundary} showButton={true} />;
}

const ErrorBoundary = (props: any) => {
	return (
		<GenericErrorBoundary FallbackComponent={ErrorFallback}>
			{props?.children}
		</GenericErrorBoundary>
	);
};

export default ErrorBoundary;
export { Error_403, Error_404 };
