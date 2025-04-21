import { removeAdBanner, uploadAdBanner } from '@/shared/api/admin/upload'
import { cn } from '@/shared/utils'
import { formatBytes } from '@/shared/utils/common'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { IconUpload, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import Dropzone, { DropzoneProps, FileRejection } from 'react-dropzone'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Value of the uploader.
	 * @type File[]
	 * @default undefined
	 * @example value={files}
	 */
	value: string;

	/**
	 * Function to be called when the value changes.
	 * @type React.Dispatch<React.SetStateAction<File[]>>
	 * @default undefined
	 * @example onValueChange={(files) => setFiles(files)}
	 */
	onValueChange?: React.Dispatch<React.SetStateAction<string>>;


	/**
	 * Accepted file types for the uploader.
	 * @type { [key: string]: string[]}
	 * @default
	 * ```ts
	 * { "image/*": [] }
	 * ```
	 * @example accept={["image/png", "image/jpeg"]}
	 */
	accept?: DropzoneProps['accept'];

	/**
	 * Maximum file size for the uploader.
	 * @type number | undefined
	 * @default 1024 * 1024 * 2 // 2MB
	 * @example maxSize={1024 * 1024 * 2} // 2MB
	 */
	maxSize?: DropzoneProps['maxSize'];

	/**
	 * Maximum number of files for the uploader.
	 * @type number | undefined
	 * @default 1
	 * @example maxFiles={5}
	 */
	maxFiles?: DropzoneProps['maxFiles'];
}

export function AdsFileUploader(props: Props) {
	const {
    value: valueProp,
    onValueChange,
    accept = { 'image/*': [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    className,
    ...dropzoneProps
  } = props;

 const [file, setFiles] = useState<string>(props.value)

 	const onDrop = useCallback(
		//@ts-ignore:next/line
		 async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {

			 const {success, error} = await uploadAdBanner(acceptedFiles);
			 if(success){
				 setFiles(success)
				 onValueChange?.(success)
				 toast.success('Файл успешно загружен')
			 }
			 
			 if(error){
					toast.error('Не удалось загрузить файл')
					console.log(error)
			 }
			 
		 },
		 [file, setFiles]
	 );

	async function onRemove(file: string) {
			if (!file) return;
			const {success, error} = await removeAdBanner(file)
			if(success){
				toast.success('Файл успешно удален.')
				setFiles('');
				onValueChange?.('')
			}
			if(error){
				toast.error('Возникла ошибка во время удаления файла')
			}
		}

 return (
		<div className='relative flex flex-col gap-6 overflow-hidden'>
			<Dropzone
			//@ts-ignore:next/line
				onDrop={onDrop}
				accept={accept}
				maxSize={maxSize}
				maxFiles={maxFiles}
			>
				{({ getRootProps, getInputProps, isDragActive }) => (
					<div
						{...getRootProps()}
						className={cn(
							'group border-muted-foreground/25 hover:bg-muted/25 relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition',
							'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
							isDragActive && 'border-muted-foreground/50',
							className
						)}
						{...dropzoneProps}
					>
						<input {...getInputProps()} />
						{isDragActive ? (
							<div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
								<div className='rounded-full border border-dashed p-3'>
									<IconUpload
										className='text-muted-foreground size-7'
										aria-hidden='true'
									/>
								</div>
								<p className='text-muted-foreground font-medium'>
									Перетащите файлы
								</p>
							</div>
						) : (
							<div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
								<div className='rounded-full border border-dashed p-3'>
									<IconUpload
										className='text-muted-foreground size-7'
										aria-hidden='true'
									/>
								</div>
								<div className='space-y-px'>
									<p className='text-muted-foreground font-medium'>
										Перетащите файлы сюда или нажмите чтобы выбрать
									</p>
									<p className='text-muted-foreground/70 text-sm'>
										Вы можете загрузить до
										{maxFiles > 1
											? ` ${maxFiles === Infinity ? 'multiple' : maxFiles}
										 изображений по ${formatBytes(maxSize)} каждый`
											: ` 1 файла размером ${formatBytes(maxSize)}`}
									</p>
								</div>
							</div>
						)}
					</div>
				)}
			</Dropzone>
			{file ? (
				<ScrollArea className='h-fit w-full px-3'>
					<div className='max-h-48  flex flex-wrap gap-8 items-center'>
							<FileCard
								key={0}
								file={file}
								onRemove={() => onRemove(file)}
							/>
					</div>
				</ScrollArea>
			) : null}
		</div>
	);
}

interface FileCardProps {
	file: string;
	onRemove: () => void;
}


function FileCard({ file, onRemove }: FileCardProps) {
	return (
		<>
		{file && (
					<div className='relative flex items-center space-x-2'>
						<div className='flex space-x-4 border p-3 shadow-sm'>
								<Image
									src={file}
									alt={file}
									width={48}
									height={48}
									loading='lazy'
									className='aspect-square shrink-0 rounded-md object-cover'
								/>
						</div>
						<div className='flex items-start gap-2 self-baseline'>
							<Button
								type='button'
								variant='default'
								size='icon'
								onClick={onRemove}
								className='size-8 rounded-full'
							>
								<IconX className='text-muted-foreground text-white' />
								<span className='sr-only'>Удалить</span>
							</Button>
						</div>
				</div>
		)}
		</>
	)
}