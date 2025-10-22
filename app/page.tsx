import { Header } from "@/components/header"
import { SubmissionSection } from "@/components/submission-section"
import { EvaluationSection } from "@/components/evaluation-section"
import { ProgressTimeline } from "@/components/progress-timeline"

export default function StudentPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-24">
          <section id="dashboard" className="pt-10 scroll-mt-16">
            <h2 className="text-2xl font-bold mb-6 text-foreground/80 flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-2">📊</span>
              Dashboard
            </h2>
            <ProgressTimeline />
          </section>
          <section id="submissions" className="pt-10 scroll-mt-16">
            <h2 className="text-2xl font-bold mb-6 text-foreground/80 flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-2">📝</span>
              Submissions
            </h2>
            <SubmissionSection />
          </section>
          <section id="evaluation" className="pt-10 scroll-mt-16">
            <h2 className="text-2xl font-bold mb-6 text-foreground/80 flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-2">🏆</span>
              Evaluation
            </h2>
            <EvaluationSection />
          </section>
        </div>
      </main>
      <footer className="border-t border-border mt-16 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Student Portal. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Support
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Help Center
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
