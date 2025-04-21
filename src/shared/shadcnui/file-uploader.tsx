'use client';

import { IconUpload, IconX } from '@tabler/icons-react'
import * as React from 'react'
import Dropzone, {
  type DropzoneProps,
  type FileRejection
} from 'react-dropzone'
import { toast } from 'sonner'

import { Button } from '@/shared/shadcnui/ui/button'
import { ScrollArea } from '@/shared/shadcnui/ui/scroll-area'
import { cn } from '@/shared/utils'
import { formatBytes } from '@/shared/utils/common'
import { useEffect, useState } from 'react'
import { deleteFile, optimazeUploadedFiles } from '../api/admin/upload'
import { IImagesData, IUploadedFile } from '../types/file'

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value: IUploadedFile[] | [];


  /**
   * Function to be called when the value changes.
   * @type React.Dispatch<React.SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: React.Dispatch<React.SetStateAction<IUploadedFile[]>>;

  diff?: string
  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

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

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    diff,
    progresses,
    accept = { 'image/*': [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  
  const [files, setFiles] = useState<IImagesData | {}>(props.value)
  
  useEffect(() => {}, [props.diff, files])
  const onDrop = 
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast.error('Cannot upload more than 1 file at a time');
        return;
      }

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`);
        });
      }

      const dataServer = await optimazeUploadedFiles(acceptedFiles, diff)
      const data = JSON.parse(dataServer)
      // console.log('ITS DATA: ', data)
      //   const response = await Promise.all( 
      // data.resizedFiles.map(async (buffer, i) => {
      //   const fetched = await fetch(data.presignedUrls[i], {
      //               method: "PUT",
      //               body: buffer,
      //             });
      //    console.log(fetched)         
      // }))
      const prevState = props.value;
      if(prevState.hasOwnProperty(diff)){
        prevState[diff] = prevState[diff].concat(data.output[diff])
      } else {
        prevState[diff] = data.output[diff]
      }
      console.log(data.output)
      console.log(prevState)
      // if(Object.keys(prevState).length === 0) {
      //   setFiles(data.output)
      //   onValueChange?.(data.output)
      // } else {
      //   let currentState = null;
      //   for (const prop in prevState) {
      //     if(data.output.hasOwnProperty(prop)){
      //       currentState = prevState[diff].concat(data.output[diff!])
      //     }
      //   }
      //   if(!currentState){
      //     prevState[diff] = data.output[diff]
      //     currentState = prevState
      //   }

        // const result = prevState[diff!].concat(data.output[diff!])
        setFiles(prevState)
        onValueChange?.(prevState)
      // }

      
    }


  async function onRemove(file: IUploadedFile) {
    if (!files) return;
    await deleteFile(file)
    const remainField = files[diff].filter((f, i) => JSON.stringify(f) !== JSON.stringify(file));
    const copyPrevState = JSON.parse(JSON.stringify(files));
    copyPrevState[diff] = remainField;

    setFiles(copyPrevState);
    onValueChange?.(copyPrevState)
  }


  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

  return (
    <div className='relative flex flex-col gap-6 overflow-hidden'>
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              'group border-muted-foreground/25 hover:bg-muted/25 relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition',
              'ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
              isDragActive && 'border-muted-foreground/50',
              isDisabled && 'pointer-events-none opacity-60',
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
                      : ` a file with ${formatBytes(maxSize)}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {Array.isArray(files[diff]) ? (
        <ScrollArea className='h-fit w-full px-3'>
          <div className='max-h-48  flex flex-wrap gap-8 items-center'>
            {files[diff].map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(file)}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: IUploadedFile;
  onRemove: () => void;
}

function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <>
    {file && (
          <div className='relative flex items-center space-x-2'>
            <div className='flex space-x-4 border p-3 shadow-sm'>
                <img
                  src={file.url}
                  alt={file.name}
                  width={48}
                  height={48}

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
