import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, FileCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProgressTimeline() {
  const stages = [
    { 
      label: "Submitted", 
      status: "completed", 
      icon: CheckCircle2, 
      date: "Jan 15, 2025",
      description: "Project successfully submitted" 
    },
    { 
      label: "Under Review", 
      status: "completed", 
      icon: Clock, 
      date: "Jan 16, 2025",
      description: "Review in progress" 
    },
    { 
      label: "Evaluated", 
      status: "current", 
      icon: FileCheck, 
      date: "Jan 18, 2025",
      description: "Final evaluation" 
    },
  ]

  return (
    <Card className="overflow-hidden shadow-md border-t-4 border-t-primary">
      <CardContent className="pt-8 pb-6 px-6">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-border -z-10">
            <div className="h-full bg-primary transition-all duration-700 shadow-glow" style={{ width: "66%" }} />
          </div>

          {stages.map((stage, index) => {
            const Icon = stage.icon
            return (
              <div key={index} className="flex flex-col items-center gap-4 flex-1 group">
                <div
                  className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 shadow-md transform group-hover:scale-110",
                    stage.status === "completed" && "bg-primary border-primary text-primary-foreground",
                    stage.status === "current" && "bg-background border-primary text-primary",
                    stage.status === "pending" && "bg-background border-border text-muted-foreground",
                  )}
                >
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <p className={cn(
                    "text-base font-medium transition-colors", 
                    stage.status === "pending" && "text-muted-foreground",
                    stage.status === "current" && "text-primary font-semibold"
                  )}>
                    {stage.label}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stage.date}</p>
                  <p className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{stage.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
