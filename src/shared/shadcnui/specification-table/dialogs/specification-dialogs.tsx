"use client"
import { SpecificationType, useSpecification } from '@/shared/context/specifications-context'
import { useEffect } from 'react'
import { SpecActionDialog } from './specification-action-dialog'
import { SpecDeleteDialog } from './specification-delete-dialog'

export function SpecificationDialogs({spec}:{spec: SpecificationType}) {
  const { open, setOpen, currentRow, setCurrentRow, specType, setSpecType } = useSpecification()
  useEffect(()=>{
    setSpecType(spec)
  },[spec])
  console.log(specType)
  return (
    <>
    {spec && (
     <SpecActionDialog
     key='spec-add'
     specType={specType}
     open={open === 'add'}
     onOpenChange={() => setOpen('add')}
  />
    )}
    
          
      {currentRow && (
        <>
         <SpecActionDialog
            key={`spec-edit-${currentRow.id}`}
            specType={specType}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <SpecDeleteDialog
            key={`spec-delete-${currentRow.id}`}
            specType={specType}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}