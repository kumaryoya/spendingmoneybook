import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EntryCard } from "@/components/EntryCard"
import { EntryDialog } from "@/components/EntryDialog"
import { EmptyState } from "@/components/EmptyState"
import { toast } from "sonner"

interface Entry {
  id: string
  date: string
  amount: number
  memo: string
}

function App() {
  const [entries, setEntries] = useKV<Entry[]>("allowance-entries", [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editEntry, setEditEntry] = useState<Entry | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const balance = (entries || []).reduce((sum, entry) => sum + entry.amount, 0)

  const handleAddEntry = (entryData: Omit<Entry, "id"> | Entry) => {
    if ("id" in entryData) {
      setEntries((currentEntries) =>
        (currentEntries || []).map((e) => (e.id === entryData.id ? entryData : e))
      )
      toast.success("✨ 記録を更新しました")
      setEditEntry(null)
    } else {
      const newEntry: Entry = {
        ...entryData,
        id: `${Date.now()}-${Math.random()}`
      }
      setEntries((currentEntries) => [newEntry, ...(currentEntries || [])])
      toast.success("✨ 記録を追加しました")
    }
  }

  const handleEdit = (entry: Entry) => {
    setEditEntry(entry)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setEntries((currentEntries) => (currentEntries || []).filter((e) => e.id !== deleteId))
      toast.success("🗑️ 記録を削除しました")
      setDeleteId(null)
    }
  }

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditEntry(null)
    }
  }

  const sortedEntries = [...(entries || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen sparkle-bg">
      <div className="star-pattern min-h-screen">
        <div className="container max-w-3xl mx-auto px-4 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-2 tracking-tight">
              ✨ お小遣い帳 ✨
            </h1>
            <p className="text-muted-foreground">魔法のように楽しく記録しよう</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-primary to-accent rounded-3xl p-6 mb-6 text-center shadow-xl"
          >
            <p className="text-primary-foreground/80 text-sm font-medium mb-1">現在の残高</p>
            <motion.p
              key={balance}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold text-primary-foreground"
            >
              ¥{balance.toLocaleString()}
            </motion.p>
            {balance > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2"
              >
                <Sparkle weight="fill" className="inline text-primary-foreground/60" size={20} />
              </motion.div>
            )}
          </motion.div>

          <div className="mb-20">
            {sortedEntries.length === 0 ? (
              <EmptyState />
            ) : (
              <ScrollArea className="h-[calc(100vh-400px)] pr-4">
                <div className="space-y-3">
                  <AnimatePresence>
                    {sortedEntries.map((entry, index) => (
                      <EntryCard
                        key={entry.id}
                        entry={entry}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              onClick={() => setDialogOpen(true)}
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-all hover:scale-110"
            >
              <Plus size={28} weight="bold" />
            </Button>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-primary opacity-30 blur-lg -z-10"
            />
          </motion.div>

          <EntryDialog
            open={dialogOpen}
            onOpenChange={handleDialogClose}
            onSubmit={handleAddEntry}
            editEntry={editEntry}
          />

          <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>記録を削除しますか？</AlertDialogTitle>
                <AlertDialogDescription>
                  この操作は取り消せません。本当に削除してもよろしいですか？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">キャンセル</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="rounded-full bg-destructive hover:bg-destructive/90"
                >
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default App