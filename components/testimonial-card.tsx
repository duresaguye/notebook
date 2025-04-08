import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"
import Image from "next/image"
interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export default function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="pt-6">
        <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-muted-foreground mb-6">{quote}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4 border-t pt-6">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <Image 
            width={48} height={48}
           src={avatarUrl || "/placeholder.svg"} alt={author} 
           className="h-full w-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

