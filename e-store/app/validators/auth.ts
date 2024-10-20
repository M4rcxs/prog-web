import vine from '@vinejs/vine'



export const registerValidator = vine.compile(
	vine.object({
		full_name: vine.string().maxLength(100),
		email: vine.string().email().normalizeEmail(),
		passowrd: vine.string().minLength(8),
	})
)