import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export default function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-primary/5 via-background to-primary/5 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary)/0.1),transparent)]" />
      
      <CardContent className="relative pt-8">
        {/* Quote icon with floating animation */}
        <QuoteIcon className="absolute -right-4 -top-2 h-24 w-24 text-primary/10 transition-transform duration-500 group-hover:-translate-y-1" />
        
        {/* Animated decorative element */}
        <div className="absolute left-6 top-0 h-[2px] w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        <p className="relative z-10 text-lg font-medium text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
          {quote}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center gap-4 border-t border-primary/10 py-6">
        <div className="relative h-12 w-12">
          {/* Avatar with gradient border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-20" />
          <img 
            src={avatarUrl || "/placeholder.svg"} 
            alt={author} 
            className="relative z-10 h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-base font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {author}
          </h4>
          <p className="text-sm text-muted-foreground/80">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}