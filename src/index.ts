export default {
	async fetch(request, env, ctx): Promise<Response> {
		const incomingIp = request.headers.get('CF-Connecting-IP') || 'unknown';

		const headerKeys = Array.from(request.headers.keys());
		const headers = headerKeys.map(key => [key, request.headers.get(key)] as const).reduce((obj, [key, value]) => {
			obj[key] = value;
			return obj;
		}, {} as Record<string, string | null>);

		return new Response(`Hello, your IP is ${incomingIp}\n${JSON.stringify(request.cf, null, 2)}\n${JSON.stringify(headers, null, 2)}`);
	},
} satisfies ExportedHandler<Env>;
