"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Github, ExternalLink, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SubmissionSection() {
  const [projectTitle, setProjectTitle] = useState("E-Commerce Platform")
  const [githubLink, setGithubLink] = useState("https://github.com/student/ecommerce-project")
  const [isValidLink, setIsValidLink] = useState(true)

  const submissionStatus = "submitted"
  const submissionDate = "2025-01-15 14:30:00"
  const deadline = "2025-01-20 23:59:59"

  return (
    <Card className="border-primary/20 shadow-lg shadow-primary/5 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Project Submission</CardTitle>
            <CardDescription className="mt-1.5">Submit your project repository and documentation</CardDescription>
          </div>
          <Badge
            variant={
              submissionStatus === "submitted" ? "default" : submissionStatus === "late" ? "destructive" : "secondary"
            }
            className="h-9 px-4 rounded-full text-sm"
          >
            {submissionStatus === "submitted" && <CheckCircle2 className="mr-1.5 h-4 w-4" />}
            {submissionStatus === "late" && <AlertCircle className="mr-1.5 h-4 w-4" />}
            {submissionStatus === "not-submitted" && <Clock className="mr-1.5 h-4 w-4" />}
            {submissionStatus === "submitted"
              ? "Submitted"
              : submissionStatus === "late"
                ? "Late Submission"
                : "Not Submitted"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-primary/5 border-primary/20">
          <Clock className="h-4 w-4 text-primary" />
          <AlertDescription className="text-foreground">
            <span className="font-medium">Deadline:</span> {deadline}
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="project-title">Project Title (Optional)</Label>
            <Input
              id="project-title"
              placeholder="Enter project title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="focus-visible:ring-primary/50 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submission-date">Submission Date & Time</Label>
            <Input id="submission-date" value={submissionDate} disabled className="bg-muted" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-link">GitHub Repository Link</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="github-link"
                placeholder="https://github.com/username/repository"
                value={githubLink}
                onChange={(e) => {
                  setGithubLink(e.target.value)
                  setIsValidLink(e.target.value.includes("github.com"))
                }}
                className="pl-10 focus-visible:ring-primary/50 transition-all duration-300"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 bg-transparent"
              asChild
            >
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          {!isValidLink && <p className="text-sm text-destructive">Please enter a valid GitHub repository URL</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload Additional Files (Optional)</Label>
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-foreground mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">PDF, ZIP, or other documentation (Max 50MB)</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1 h-12 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 animate-button-press">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Update Submission
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-full text-base hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 animate-button-press bg-transparent"
          >
            View Submission
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
