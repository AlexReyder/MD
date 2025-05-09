"use server"
import { IImagesData, IUploadedFile } from '@/shared/types/file'
import { addProps } from '@/shared/utils/common'
import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { imageSize } from 'image-size'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3Client({
	region: 'ru-central-1',
	endpoint: 'https://s3.ru1.storage.beget.cloud',
	credentials: {
			accessKeyId: '44P303W7XMV30M6HMDV1',
			secretAccessKey: 'tF15CI94HsJ08JmQou0dPhnRODalJXUI1dW4GOE5'
	}})
const bucketName = 'd3f71020d41d-tractable-seth'	

export async function getPresignedUrl(filename: string){
	const presignedUrl = await getSignedUrl(
		s3Client,
			new PutObjectCommand({
					Bucket: bucketName,
					Key: filename,
			}),
			{ expiresIn: 60 },
	);
	console.log(filename)
	return presignedUrl
}

 export async function getPresignedUrls(output: IUploadedFile[]){
	const presignedUrls: string[] = [];
	console.log(output)
	for (let i = 0; i < output.length ; i++) {
    const presignedUrl = await getSignedUrl(
			s3Client,
        new PutObjectCommand({
            Bucket: bucketName,
            Key: output[i].name,
        }),
        { expiresIn: 60 },
    );
		console.log(output[i])
		console.log(presignedUrl)
		presignedUrls.push(presignedUrl);

 	}

	return presignedUrls;
 }

	export async function uploadFileProducts(files:File[], diff: string): Promise<IImagesData>{
	const images:IImagesData = {}
	const response = await Promise.all(files.map(async (file) => {
			const preBody = await file.arrayBuffer()
			const fileBuffer = Buffer.from(preBody)
			const dimension = imageSize(fileBuffer)
			const fileName = uuidv4() +  '.' + dimension.type
			const command = 
				new PutObjectCommand({
					Bucket: bucketName,
					Key: fileName,
				})
			const presignUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

			await fetch(presignUrl, {
				method: "PUT",
				body: fileBuffer,
			});
			

			const output: IUploadedFile = {
				url: `https://s3.ru1.storage.beget.cloud/${bucketName}/${fileName}`,
				dimension,
				name:file.name,
			}

			const isDiff = images.hasOwnProperty(diff);

			if(!isDiff){
				images[diff] = [output]
			} else {
				images[diff].push(output)
			}
	}))
	return images
	}
	
	export async function deleteFile(file: any){
		console.log('KEY:::: ',file)
		const aws = await s3Client.send(
			new DeleteObjectCommand({
				Bucket: bucketName,
				Key: file,
			}),
		);
		console.log(aws)
	}

	export async function deleteFiles(files: string[]){
		console.log(files)
		await Promise.all(files.map(async (file) => {
			const filename = file.split(`${bucketName}/`)[1]
			console.log(filename)
			const aws = await s3Client.send(
				new DeleteObjectCommand({
					Bucket: bucketName,
					Key: filename,
				}),
			);
			console.log(aws)
		}))
	}

	export async function uploadAdBanner(file: File[]){
		const cfile = file[0]
		const preImage = await cfile.arrayBuffer()
		const imageBuffer = Buffer.from(preImage)
		try{
			const command =
				new PutObjectCommand({
					Bucket: bucketName,
					Key: cfile.name,
				})

			const presignUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
			await fetch(presignUrl, {
				method: "PUT",
				body: imageBuffer,
			});
			const output = `https://s3.ru1.storage.beget.cloud/${bucketName}/${cfile.name}`
			
			return{
				success: output,
				error: null
			}
		} catch(e){
			return {
				success: null,
				error: e as string
			}
		}
	}
	
	export async function removeAdBanner(filename:string){
		try{
			const file = filename.split(`${bucketName}/`)[1]
			const deletedFile = await s3Client.send(
				new DeleteObjectCommand({
					Bucket: bucketName,
					Key: file,
				}),
			);
			console.log(deletedFile)
			return {
				success: true,
				error: null
			}
		} catch(e){
			return {
				success: false,
				error: e as string
			}
		}

	}


	export async function optimazeUploadedFiles(files: File[], color: string | undefined){

		let result: any = {
			originals: [],
			overviews: [],
			thumbnails: [],
		}

		let output: any = {
		}

		await Promise.all(
			files.map( async (file) => {
				const arrayBuffer = await file.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer)

				await sharp(buffer)
				.jpeg({quality: 90})
				.toBuffer({resolveWithObject: true})
				.then( async (img) => {
					const dimension = imageSize(img.data)
					const filename =  uuidv4() + '_original' + '.' + dimension.type
					const presignedUrl = await getSignedUrl(
						s3Client,
							new PutObjectCommand({
									Bucket: bucketName,
									Key: filename,
									ContentType:'image/jpeg'
							}),
							{ expiresIn: 60 },
					);
					await fetch(presignedUrl, {
						method: "PUT",
						body: img.data,
					});

					//  await s3Client.send(new PutObjectCommand({
					// 	Bucket: bucketName,
					// 	Key: filename,
					// 	Body: img.data
					// }))

					const data = {
						url: `https://s3.ru1.storage.beget.cloud/d3f71020d41d-tractable-seth/${filename}`,
						name: filename,
						dimension
					}

					const isColor = output.hasOwnProperty(color);
						if(!isColor){
							addProps(output, [color, 'originals'], [data])
							// output[color!]["originals"] = [data]
						} else {
							output[color!]["originals"].push(data)
						}
					
				})

				await sharp(buffer)
				.resize({
						fit: sharp.fit.contain,
						width: 1280
				})
				.jpeg({quality: 75})
				.toBuffer({resolveWithObject: true})
				.then( async (img) => {
					const dimension = imageSize(img.data)
					const filename =  uuidv4() + '_overview' + '.' + dimension.type

					const presignedUrl = await getSignedUrl(
						s3Client,
							new PutObjectCommand({
									Bucket: bucketName,
									Key: filename,
									ContentType:'image/jpeg'
							}),
							{ expiresIn: 60 },
					);
					await fetch(presignedUrl, {
						method: "PUT",
						body: img.data,
					});

					const data = {
						url: `https://s3.ru1.storage.beget.cloud/d3f71020d41d-tractable-seth/${filename}`,
						name: filename,
						dimension
					}

					const isColor = output.hasOwnProperty(color);
						if(!isColor){
							addProps(output, [color, 'overviews'], [data])
						} else {
							if(output[color!].hasOwnProperty("overviews")){
								output[color!]["overviews"].push(data)
							} else {
								addProps(output, [color, 'overviews'], [data])
							}
						}
				})

				await sharp(buffer)
				.resize({
					fit: sharp.fit.contain,
					width: 200
				})
				.jpeg({quality: 75})
				.toBuffer({resolveWithObject: true})
				.then( async (img) => {
					const dimension = imageSize(img.data)
					const filename =  uuidv4() + '_thumbnail' + '.' + dimension.type

						const presignedUrl = await getSignedUrl(
						s3Client,
							new PutObjectCommand({
									Bucket: bucketName,
									Key: filename,
									ContentType:'image/jpeg'
							}),
							{ expiresIn: 60 },
					);
					await fetch(presignedUrl, {
						method: "PUT",
						body: img.data,
					});

					const data = {
						url: `https://s3.ru1.storage.beget.cloud/d3f71020d41d-tractable-seth/${filename}`,
						name: filename,
						dimension
					}

					const isColor = output.hasOwnProperty(color);
						if(!isColor){
							addProps(output, [color, 'thumbnails'], [data])
						} else {
							if(output[color!].hasOwnProperty("thumbnails")){
								output[color!]["thumbnails"].push(data)
							} else {
								addProps(output, [color, 'thumbnails'], [data])
							}
						}
				})


			})
		)

		// await Promise.all(files.map( async (file) => {
		// 	const arrBuff = await file.arrayBuffer();
		// 	const buffer = Buffer.from(arrBuff)

		// 	const dimension = imageSize(buffer)
		// 	const filename =  uuidv4() +  '.' + dimension.type

		// 	const originalImage = await sharp(buffer).jpeg({quality: 90}).toBuffer({resolveWithObject: true})

		// 	const overviewImage = await sharp(buffer)
		// 	.resize({
		// 			fit: sharp.fit.contain,
		// 			width: 1280
		// 	})
		// 	.jpeg({ quality: 75 })
		// 	.toBuffer({resolveWithObject: true})

		// 	const thumbnailImage = await sharp(buffer)
		// 	.resize({
		// 		fit: sharp.fit.contain,
		// 		width: 200
		// 	})
		// 	.jpeg({quality: 75})
		// 	.toBuffer({resolveWithObject: true})

		// 	const previewImage = await sharp(buffer)
		// 	.resize({
		// 			fit: sharp.fit.contain,
		// 			width: 720
		// 	})
		// 	.jpeg({ quality: 75 })
		// 	.toBuffer({resolveWithObject: true})
	
			

		// 	const url = `https://s3.ru1.storage.beget.cloud/d3f71020d41d-tractable-seth/${filename}`

		// 	const data = {
		// 		url,
		// 		dimension,
		// 		name: filename
		// 	}


		// 	const isColor = output.hasOwnProperty(color);
    //     if(!isColor){
    //       output[color!] = [data]
    //     } else {
    //       output[color!].push(data)
    //     }

		// 	const presignedUrl = await getSignedUrl(
		// 		s3Client,
		// 			new PutObjectCommand({
		// 					Bucket: bucketName,
		// 					Key: filename,
		// 					ContentType:'image/jpeg'
		// 			}),
		// 			{ expiresIn: 60 },
		// 	);

		// 	await fetch(presignedUrl, {
		// 		method: "PUT",
		// 		body: imageBuff.data,
		// 	});

		// }))
		return JSON.stringify({
			output
		})
	}

