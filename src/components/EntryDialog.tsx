import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkle } from "@phosphor-icons/react"

interface Entry {
  id: string
  date: string
  amount: number
  memo: string
}

interface EntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (entry: Omit<Entry, "id"> | Entry) => void
  editEntry?: Entry | null
}

export function EntryDialog({ open, onOpenChange, onSubmit, editEntry }: EntryDialogProps) {
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")

  useEffect(() => {
    if (editEntry) {
      setDate(editEntry.date.slice(0, 16))
      setAmount(editEntry.amount.toString())
      setMemo(editEntry.memo)
    } else {
      const now = new Date()
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
      setDate(now.toISOString().slice(0, 16))
      setAmount("")
      setMemo("")
    }
  }, [editEntry, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount)) return

    if (editEntry) {
      onSubmit({
        ...editEntry,
        date: new Date(date).toISOString(),
        amount: parsedAmount,
        memo: memo.trim()
      })
    } else {
      onSubmit({
        date: new Date(date).toISOString(),
        amount: parsedAmount,
        memo: memo.trim()
      })
    }

    onOpenChange(false)
  }

  const isValid = date && amount && !isNaN(parseFloat(amount))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkle weight="duotone" className="text-accent" />
            {editEntry ? "記録を編集" : "新しい記録"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">日時</Label>
            <Input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">金額</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">¥</span>
              <Input
                id="amount"
                type="number"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                required
                className="pl-8 rounded-xl"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              収入はプラス、支出はマイナスで入力してください
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">メモ（任意）</Label>
            <Textarea
              id="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="お買い物の内容など..."
              rows={3}
              className="rounded-xl resize-none"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <Sparkle weight="fill" className="mr-1" />
              {editEntry ? "更新" : "追加"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
