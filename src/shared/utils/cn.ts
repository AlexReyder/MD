import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type Mods = Record<string, boolean | string>

export  function cnn(...args: string[]): string {
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



 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export  function cif(arg1: string, args2: string): string {
// 	return [...arguments].join(' ')
// }