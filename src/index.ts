interface IpInfo {
	ip: string;
	continent: string | null;
	asn: number | null;
	country: string | null;
	region: string | null;
	timezone: string | null;
	longitute: string | null;
	latitude: string | null;
	postalCode: string | null;
	city: string | null;
	organization: string | null;
	botScore: number | null;
	requestHeaders: Record<string, string>;
}

type CfRequest = Parameters<NonNullable<ExportedHandler<Env>['fetch']>>[0]

function getInfo(request: CfRequest): IpInfo | null {
	if (!request.cf) return null;
	const cf = request.cf;

	const headerKeys = Array.from(request.headers.keys());
	const headers = headerKeys.map(key => [key, request.headers.get(key)] as const).reduce((obj, [key, value]) => {
		if (value) obj[key] = value;
		return obj;
	}, {} as Record<string, string>);

	return {
		ip: request.headers.get('CF-Connecting-IP') || 'unknown',
		continent: cf.continent || null,
		asn: cf.asn || null,
		country: cf.country || null,
		region: cf.region || null,
		timezone: cf.timezone || null,
		longitute: cf.longitude || null,
		latitude: cf.latitude || null,
		postalCode: cf.postalCode || null,
		city: cf.city || null,
		organization: cf.asOrganization || null,
		botScore: cf.botManagement.score || null,
		requestHeaders: headers,
	};
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const info = getInfo(request);
		return new Response(JSON.stringify(info, null, 2))
	},
} satisfies ExportedHandler<Env>;
