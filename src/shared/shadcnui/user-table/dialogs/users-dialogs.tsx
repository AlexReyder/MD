"use client"
import { useUsers } from '@/shared/context/users-context'
import { UsersActionDialog } from './users-action-dialog'
import { UsersBonusDialog } from './users-bonus-dialog'
import { UserBonusHistoryDialog } from './users-bonus-history-dialogs'
import { UsersDeleteDialog } from './users-delete-dialog'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
      <UsersActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
         <UsersBonusDialog
            key={`user-bonuses-${currentRow.id}`}
            open={open === 'bonus'}
            onOpenChange={() => {
              setOpen('bonus')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow.Bonus[0]}
          />

          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UserBonusHistoryDialog
            key={`user-bonus-history-${currentRow.id}`}
            open={open === 'userBonusHistory'}
            onOpenChange={() => {
              setOpen('userBonusHistory')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
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