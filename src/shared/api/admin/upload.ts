"use server"
import { IImagesData, IUploadedFile } from '@/shared/types/file'
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
		console.log('KEY:::: ',file.name)
		const aws = await s3Client.send(
			new DeleteObjectCommand({
				Bucket: bucketName,
				Key: file.name,
			}),
		);
		console.log(aws)
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
			await s3Client.send(
				new DeleteObjectCommand({
					Bucket: bucketName,
					Key: filename,
				}),
			);
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
		let presignedUrls: string[] = []
		let resizedFiles: any[] = []
		let output: any = {}

		await Promise.all(files.map( async (file) => {
			console.log(file)
			const arrBuff = await file.arrayBuffer();
			const buffer = Buffer.from(arrBuff)
			const dimension = imageSize(buffer)
			const filename =  uuidv4() +  '.' + dimension.type
			const imageBuff = await sharp(buffer)
			.resize({
					fit: sharp.fit.contain,
					width: 1920
			})
			.jpeg({ quality: 80 })
			.toBuffer({resolveWithObject: true})
	
			
			resizedFiles.push(imageBuff)


			const url = `https://s3.ru1.storage.beget.cloud/d3f71020d41d-tractable-seth/${filename}`

			const data = {
				url,
				dimension,
				name: filename
			}


			const isColor = output.hasOwnProperty(color);
        if(!isColor){
          output[color!] = [data]
        } else {
          output[color!].push(data)
        }

			const presignedUrl = await getSignedUrl(
				s3Client,
					new PutObjectCommand({
							Bucket: bucketName,
							Key: filename,
							ContentType:'image/jpeg'
					}),
					{ expiresIn: 60 },
			);
			presignedUrls.push(presignedUrl)

			await fetch(presignedUrl, {
				method: "PUT",
				body: imageBuff.data,
			});

		}))
		return JSON.stringify({
			presignedUrls,
			resizedFiles,
			output
		})
	}