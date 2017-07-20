import callApi from './callApi';
import { mapObject } from './util';

export default function veritoneApi(
	{
		token,
		baseUrl = 'https://api.veritone.com',
		version = 1,
		maxRetries = 1,
		retryIntervalMs = 1000
	},
	apis = {}
) {
	if (!token) {
		throw new Error('Token is required');
	}

	return mapObject(apis, ns =>
		mapObject(ns, handler =>
			callApi(
				{
					token,
					baseUrl: `${baseUrl}/v${version}`,
					maxRetries,
					retryIntervalMs
				},
				handler
			)
		)
	);
}
