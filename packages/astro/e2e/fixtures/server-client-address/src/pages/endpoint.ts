export const GET = (ctx) => {
	return Response.json({
		clientAddress: ctx.clientAddress !== undefined
	});
}

export const POST = (ctx) => {
	return Response.json({
		clientAddress: ctx.clientAddress !== undefined
	});
}
