import { htmlTemplate } from './template';
import { cssStyles } from './styles';

// TODO: Infer browser information from User-Agent
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

type ResponseHandler = (info: IpInfo) => Promise<Response>;

const respondHeadless: ResponseHandler = async (info: IpInfo) => {
	const headers = new Headers();
	headers.set('Content-Type', 'application/json');
	headers.set('Cache-Control', 'public, max-age=0, s-maxage=30');

	return new Response(JSON.stringify(info, null, 2), {
		headers,
	});
}

const respondHtml: ResponseHandler = async (info: IpInfo) => {
	// Format location string
	const locationParts = [info.city, info.region, info.country].filter(Boolean);
	const location = locationParts.length > 0 ? locationParts.join(', ') : '<span class="null-value">Not available</span>';

	// Format coordinates
	const coordinates = info.latitude && info.longitute
		? `${info.latitude}, ${info.longitute}`
		: '<span class="null-value">Not available</span>';

	// Format headers HTML
	const headersHtml = Object.entries(info.requestHeaders)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `
			<div class="header-item">
				<div class="header-name">${key}:</div>
				<div class="header-value">${value}</div>
			</div>
		`).join('');

	// Create replacement dictionary
	const replacements: Record<string, string> = {
		'{{CSS_CONTENT}}': cssStyles,
		'{{IP}}': info.ip,
		'{{LOCATION}}': location,
		'{{CONTINENT}}': info.continent || '<span class="null-value">Not available</span>',
		'{{TIMEZONE}}': info.timezone || '<span class="null-value">Not available</span>',
		'{{POSTAL_CODE}}': info.postalCode || '<span class="null-value">Not available</span>',
		'{{COORDINATES}}': coordinates,
		'{{ASN}}': info.asn?.toString() || '<span class="null-value">Not available</span>',
		'{{ORGANIZATION}}': info.organization || '<span class="null-value">Not available</span>',
		'{{BOT_SCORE}}': info.botScore !== null ? info.botScore.toString() : '<span class="null-value">Not available</span>',
		'{{HEADER_COUNT}}': Object.keys(info.requestHeaders).length.toString(),
		'{{HEADERS_HTML}}': headersHtml,
	};

	// Apply all replacements
	const html = Object.entries(replacements).reduce(
		(template, [placeholder, value]) => template.replace(placeholder, value),
		htmlTemplate
	);

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=30',
		},
	});
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const info = getInfo(request);
		if (!info) {
			return new Response('Cloudflare information is not available.', {
				status: 400,
				statusText: 'Bad Request',
			});
		}

		// Rudimentary content negotiation
		const handlersByMimeType: Record<string, ResponseHandler> = {
			'text/html': respondHtml,
			'application/xhtml+xml': respondHtml,
			'application/json': respondHeadless,
			'text/plain': respondHeadless,
		}
		const accept = request.headers.get('accept') || '';
		console.log({ accept })
		const handler = Object.entries(handlersByMimeType).find(([mime]) => accept.toLowerCase().includes(mime.toLowerCase()))?.[1] ?? respondHeadless;

		return handler(info);
	},
} satisfies ExportedHandler<Env>;
