type Mods = Record<string, boolean | string>

export  function cn(...args: string[]): string {
	 return [...arguments].join(' ')
}

export  function cnx(cls: string, mods: Mods = {}, additional: string[] = []): string {
	return [
		cls,
		...additional.filter(Boolean),
		...Object.entries(mods)
			.filter(([_, value]) => Boolean(value))
			.map(([className]) => className),
	]
		.join(' ');
}

// export  function cif(arg1: string, args2: string): string {
// 	return [...arguments].join(' ')
// }