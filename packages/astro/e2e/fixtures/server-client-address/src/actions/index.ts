import { defineAction } from 'astro:actions';

export const server = {
	address: defineAction({
		accept: 'form',
		handler: async (_, ctx) => {
			console.log('Actions executed');
			return ctx.clientAddress;
		}
	})
}
