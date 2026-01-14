import { motion } from "framer-motion"
import { Sparkle } from "@phosphor-icons/react"

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-center py-16 px-4"
    >
      <div className="relative inline-block mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2"
        >
          <Sparkle weight="fill" className="text-accent" size={32} />
        </motion.div>
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-2">
        まだ記録がありません
      </h3>
      <p className="text-muted-foreground max-w-sm mx-auto">
        最初の記録を追加して、魔法のお小遣い帳を始めましょう！
      </p>
    </motion.div>
  )
}
