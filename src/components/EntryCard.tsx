import { motion } from "framer-motion"
import { Pencil, Trash, CurrencyCircleDollar, TrendDown } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Entry {
  id: string
  date: string
  amount: number
  memo: string
}

interface EntryCardProps {
  entry: Entry
  index: number
  onEdit: (entry: Entry) => void
  onDelete: (id: string) => void
}

export function EntryCard({ entry, index, onEdit, onDelete }: EntryCardProps) {
  const isIncome = entry.amount > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {isIncome ? (
                <CurrencyCircleDollar weight="duotone" className="text-income flex-shrink-0" size={24} />
              ) : (
                <TrendDown weight="duotone" className="text-destructive flex-shrink-0" size={24} />
              )}
              <Badge variant={isIncome ? "default" : "destructive"} className="rounded-full">
                {isIncome ? "収入" : "支出"}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <p className={`text-lg font-bold ${isIncome ? "text-income-foreground" : "text-destructive"}`}>
                {isIncome ? "+" : ""}¥{Math.abs(entry.amount).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(entry.date), "yyyy年MM月dd日 HH:mm")}
              </p>
              {entry.memo && (
                <p className="text-sm text-foreground mt-2 break-words">{entry.memo}</p>
              )}
            </div>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(entry)}
              className="h-8 w-8 hover:bg-secondary hover:text-secondary-foreground"
            >
              <Pencil size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(entry.id)}
              className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
