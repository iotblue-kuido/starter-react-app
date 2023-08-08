import { render } from 'react-dom';
import { messageTypes } from '../../models';
import AppsTheme from '../../Theme/theme';
import FeedbackContainer from '../../components/NotificationCenter';
import React from 'react';

export const notify = (
	type: messageTypes,
	message: string,
	verticalPosition?: 'bottom' | 'top',
): void => {
	const div = document.createElement('div');
	render(
		<AppsTheme>
			<FeedbackContainer
				type={type}
				message={message}
				verticalPosition={verticalPosition}
			/>
		</AppsTheme>,
		div,
	);
	document.body.appendChild(div);
};
