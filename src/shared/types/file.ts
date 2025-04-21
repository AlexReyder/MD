import { ISizeCalculationResult } from 'image-size/types/interface'

export interface IUploadedFile{
	url: string
	name: string
	dimension: ISizeCalculationResult
}

export interface IImagesData {
	[x: string] : IUploadedFile[]
}