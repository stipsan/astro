import { expect } from '@playwright/test';
import { testFactory } from './test-utils.js';

const test = testFactory(import.meta.url, {
	root: './fixtures/server-client-address/',
});

test.describe('Server access to client address', () => {
	test.describe('Development', () => {
		let devServer;

		test.beforeAll(async ({ astro }) => {
			devServer = await astro.startDevServer({
				logLevel: 'debug',
				vite: {
					logLevel: 'debug',
				}
			});
		});

		test.afterAll(async () => {
			await devServer.stop();
		});

		test('Load a page using client address', async ({ page, astro }) => {
			await page.goto(astro.resolveUrl('/'));
			let el = page.locator('div#address');
			await el.click();

			await expect(el, 'element rendered').toBeVisible();
			await expect(el, 'should have content').toHaveText('true');
		});

		test('Load an endpoint using client address', async ({ page, astro }) => {
			await page.goto(astro.resolveUrl('/endpoint'));
			const res = await astro.fetch('/endpoint');
			const content = await res.json();

			expect(content).toEqual({ clientAddress: true });
		});

		test('Load a POST endpoint using client address', async ({ page, astro }) => {
			await page.goto(astro.resolveUrl('/endpoint'));
			const res = await astro.fetch('/endpoint', {method: 'POST'});
			const content = await res.json();

			expect(content).toEqual({ clientAddress: true });
		});
	});
});
