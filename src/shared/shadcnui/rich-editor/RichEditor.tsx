"use client"
import { saveContent } from '@/shared/api/admin/rich-editor'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useQuill } from 'react-quilljs'
import { Button } from '../ui/button'

export const RichEditor = ({content, db, name}: {content: any, db: any, name: string}) => {

  const { quill, quillRef } = useQuill();

	useEffect(() => {
		if (quill) {
			if(content){
				quill.editor.insertContents(0, content)
			}
		}
	}, [quill]);	

	const onSave = async() => {
		const {success, error} = await saveContent(db, name, quill?.getSemanticHTML() as string, quill?.getContents().ops)

		if(success){
					toast.success('Изменения успешно сохранены')
		}
					
		if(error){
					toast.error('Произошла ошибка')
		}
	}

	const bgStyle = name === 'adLine' ? {backgroundColor:'#222'} : {}

  return (
   <div className='w-full h-full px-2 py-2'>
				<div className='flex flex-col gap-2 mb-4 w-full items-end'>
					<Button className='space-x-1' onClick={onSave}>
							<span>Сохранить изменения</span>
					</Button>
				</div>
		<div ref={quillRef} style={bgStyle}/>
			<Toaster
					position="bottom-right"
					reverseOrder={false}
					toastOptions={{duration:3000}}
				/>
	</div>
  );
};