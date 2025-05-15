import {
	closestCenter,
	DndContext,
	DragEndEvent,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core"
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates
} from "@dnd-kit/sortable"
import { useEffect, useState, useTransition } from 'react'
import GridSortable from './grid'
import ProductSortableItem from './product-image-item'

interface Props {
	data: any
	setImages: any
	setFiles: any
	removeFile: any
	color: any
}

export const ProductImageMover = ({data, setImages, setFiles, removeFile, color}: Props) => {

		const res = Object.keys(data).length > 0  && data?.[color] && data[color]?.originals?.length > 0 ? data[color].thumbnails.map((item: any) => item.url.replace('_thumbnail', '')) : []
		const [activeId, setActiveId] = useState<string | null>(null);
		const [items, setItems] = useState<string[]>(res);
		const [isPending, startTransition] = useTransition();
		const sensors = useSensors(
				useSensor(PointerSensor),
				useSensor(KeyboardSensor, {
					coordinateGetter: sortableKeyboardCoordinates
				})
		);
		
		const handleMoveImagesStart = (event: DragStartEvent) => {
				setActiveId(event.active.id as string);
		};

		const handleMoveImagesEnd = (event: DragEndEvent) => {
					setActiveId(null);
					const { active, over } = event;
			
					if (active.id !== over?.id) {
						setItems((items) => {
							const oldIndex = items.indexOf(active.id as string);
							const newIndex = items.indexOf(over?.id as string);
			
							return arrayMove(items, oldIndex, newIndex);
						});
					}
		};

		useEffect(()=> {
			const originalData = JSON.parse(JSON.stringify(data))
			const filterData = JSON.parse(JSON.stringify(data))
			items.forEach((item, i) => {

				 const imgUrl1 = item.split('.');
    		 imgUrl1[imgUrl1.length - 2] = imgUrl1[imgUrl1.length - 2] + '_original'
    		 const imgOriginal =imgUrl1.join('.');

				 const imgUrl2 = item.split('.');
    		 imgUrl2[imgUrl2.length - 2] = imgUrl2[imgUrl2.length - 2] + '_overview'
    		 const imgOverview =imgUrl2.join('.');

				 const imgUrl3 = item.split('.');
    		 imgUrl3[imgUrl3.length - 2] = imgUrl3[imgUrl3.length - 2] + '_thumbnail'
    		 const imgThumbnail =imgUrl3.join('.');
				const thumbnailName = imgThumbnail.split('https://s3.ru1.storage.beget.cloud/d3f71020d41d-tractable-seth/')[1]
				 const findedEl = filterData[color].originals.filter((el) => el.url === imgOriginal)
	
						originalData[color].originals[i].url = imgOriginal
						originalData[color].originals[i].name = findedEl[0].name
						originalData[color].originals[i].dimension.height = findedEl[0].dimension.height
						originalData[color].originals[i].dimension.width = findedEl[0].dimension.width
						originalData[color].originals[i].dimension.type = findedEl[0].dimension.type
						originalData[color].overviews[i].url = imgOverview
						originalData[color].thumbnails[i].url = imgThumbnail
						originalData[color].thumbnails[i].name = thumbnailName
			})
			startTransition(() => {
				setFiles(originalData)
				setImages(originalData)
			})
		}, [data, items])

		return(
			 <DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragStart={handleMoveImagesStart}
						onDragEnd={handleMoveImagesEnd}
					>
							<SortableContext items={items}>
								<GridSortable rows={Math.ceil(items.length / 5)}>
									{items.map((item) => (
										<ProductSortableItem key={item} id={item} removeFile={removeFile} currentColor={color} />
									))}
								</GridSortable>
							</SortableContext>
				</DndContext>
		)
	
}