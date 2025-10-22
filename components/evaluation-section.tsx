import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Download, MessageSquare, Award } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function EvaluationSection() {
  const projectMarks = [
    { component: "Code Quality", marks: 18, total: 20 },
    { component: "Documentation", marks: 15, total: 20 },
    { component: "Functionality", marks: 28, total: 30 },
    { component: "UI/UX Design", marks: 17, total: 20 },
    { component: "Testing", marks: 8, total: 10 },
  ]

  const presentationMarks = [
    { component: "Clarity & Communication", marks: 9, total: 10 },
    { component: "Visual Presentation", marks: 8, total: 10 },
    { component: "Technical Explanation", marks: 13, total: 15 },
    { component: "Q&A Performance", marks: 12, total: 15 },
  ]

  const projectTotal = projectMarks.reduce((sum, item) => sum + item.marks, 0)
  const projectMaxTotal = projectMarks.reduce((sum, item) => sum + item.total, 0)
  const presentationTotal = presentationMarks.reduce((sum, item) => sum + item.marks, 0)
  const presentationMaxTotal = presentationMarks.reduce((sum, item) => sum + item.total, 0)
  const overallTotal = projectTotal + presentationTotal
  const overallMaxTotal = projectMaxTotal + presentationMaxTotal
  const percentage = ((overallTotal / overallMaxTotal) * 100).toFixed(1)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Evaluation Summary</h2>
          <p className="text-muted-foreground mt-1">Detailed breakdown of your project assessment</p>
        </div>
        <Badge
          variant="outline"
          className="h-14 px-6 text-lg rounded-full border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10"
        >
          <Award className="mr-2 h-6 w-6 text-primary" />
          Grade: A
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle>Project Marks</CardTitle>
            <CardDescription>Code, documentation, and functionality assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectMarks.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.component}</span>
                  <span className="text-primary font-semibold">
                    {item.marks}/{item.total}
                  </span>
                </div>
                <Progress value={(item.marks / item.total) * 100} className="h-2" />
              </div>
            ))}
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total Project Marks</span>
              <span className="text-primary">
                {projectTotal}/{projectMaxTotal}
              </span>
            </div>
            <div className="text-center pt-2">
              <span className="text-3xl font-bold text-primary">
                {((projectTotal / projectMaxTotal) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle>Presentation Marks</CardTitle>
            <CardDescription>Communication and demonstration skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {presentationMarks.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.component}</span>
                  <span className="text-primary font-semibold">
                    {item.marks}/{item.total}
                  </span>
                </div>
                <Progress value={(item.marks / item.total) * 100} className="h-2" />
              </div>
            ))}
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total Presentation Marks</span>
              <span className="text-primary">
                {presentationTotal}/{presentationMaxTotal}
              </span>
            </div>
            <div className="text-center pt-2">
              <span className="text-3xl font-bold text-primary">
                {((presentationTotal / presentationMaxTotal) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/30 shadow-xl shadow-primary/10 bg-gradient-to-br from-card via-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Combined project and presentation evaluation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Marks Obtained</p>
              <p className="text-4xl font-bold text-primary">
                {overallTotal}/{overallMaxTotal}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-muted-foreground">Percentage</p>
              <p className="text-4xl font-bold text-primary">{percentage}%</p>
            </div>
          </div>
          <Progress value={Number.parseFloat(percentage)} className="h-4" />
        </CardContent>
      </Card>

      <Card className="border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle>Evaluator Feedback</CardTitle>
          <CardDescription>Comments and suggestions from your evaluator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 p-5 space-y-3 border border-primary/10">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <span className="text-primary-foreground text-sm font-semibold">DR</span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Dr. Sarah Johnson</span>
                  <span className="text-xs text-muted-foreground">• 2 days ago</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Excellent work on the e-commerce platform! Your code structure is clean and well-documented. The
                  implementation of the shopping cart functionality is particularly impressive. However, I noticed some
                  areas where error handling could be improved, especially in the payment processing module.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 p-5 space-y-3 border border-accent/10">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                <span className="text-accent-foreground text-sm font-semibold">MK</span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Prof. Michael Kim</span>
                  <span className="text-xs text-muted-foreground">• 1 day ago</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Great presentation skills! You explained the technical concepts clearly and handled the Q&A session
                  confidently. Your demo was smooth and well-prepared. Keep up the excellent work!
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-full text-base hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 animate-button-press bg-transparent"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Feedback
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-full text-base hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 animate-button-press bg-transparent"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Request Clarification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
