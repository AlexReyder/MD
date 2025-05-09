import { removeAdBanner, uploadAdBanner } from '@/shared/api/admin/upload'
import { cn } from '@/shared/utils'
import { formatBytes } from '@/shared/utils/common'
import { IconUpload, IconX } from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import Dropzone, { DropzoneProps, FileRejection } from 'react-dropzone'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	onValueChange?: React.Dispatch<React.SetStateAction<string>>;
	accept?: DropzoneProps['accept'];
	maxSize?: DropzoneProps['maxSize'];
	maxFiles?: DropzoneProps['maxFiles'];
	text: string,
}

export function AdsFileUploader(props: Props) {
	const {
    value: valueProp,
    onValueChange,
    accept = { 'image/*': [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    className,
		text,
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
			{file === '' ?
			(
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
							<div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
								<div className='rounded-full border border-dashed p-3'>
									<IconUpload
										className='text-muted-foreground size-7'
										aria-hidden='true'
									/>
								</div>
								<div className='space-y-px'>
									<p className='text-muted-foreground font-medium'>
										Перетащите файлы сюда или нажмите чтобы выбрать картинку для <span className='text-black font-bold'>
											{text}
										</span>
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
					</div>
				)}
			</Dropzone>
			)
			: <></>}


			{file ? (
					<div className='max-h-48  flex align-start gap-8 items-center'>
							<Label className='text-right'>
								Изображение {text}:
							</Label>
							<FileCard
								key={0}
								file={file}
								onRemove={() => onRemove(file)}
							/>
					</div>
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
									width={96}
									height={48}
									loading='lazy'
									style={{objectFit:'contain'}}
									className=' shrink-0 rounded-md object-cover'
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