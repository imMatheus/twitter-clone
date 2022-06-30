export function unCastArray(value: string | string[] | undefined): string {
	return (Array.isArray(value) ? value[0] : value) || ''
}
