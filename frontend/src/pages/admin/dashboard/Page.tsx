import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SupportForm } from "@/features/support/components/SupportForm"
import { FeedbackForm } from "@/features/support/components/FeedbackForm"
import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

export default function Page() {
  const [activeSection, setActiveSection] = useState('dashboard')

  // Function to get breadcrumb title based on active section
  const getBreadcrumbTitle = () => {
    switch(activeSection) {
      case 'support':
        return 'Support'
      case 'feedback':
        return 'Feedback'
      default:
        return 'Data Fetching'
    }
  }

  // Function to render main content based on active section
  const renderMainContent = () => {
    switch(activeSection) {
      case 'support':
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
            </div>
            <SupportForm />
          </div>
        )
      case 'feedback':
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
            </div>
            <FeedbackForm />
          </div>
        )
      default:
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Dashboard Cards - Using SectionCards component */}
            <SectionCards />
            
            {/* Quick Access Cards for Support & Feedback */}
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div 
                onClick={() => setActiveSection('support')}
                className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Support Center</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Submit support tickets, report issues, and get help from our team
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium">
                  Submit a ticket →
                </div>
              </div>

              <div 
                onClick={() => setActiveSection('feedback')}
                className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Share Feedback</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Help us improve by sharing your thoughts, suggestions, and feature requests
                </p>
                <div className="mt-4 text-green-600 text-sm font-medium">
                  Give feedback →
                </div>
              </div>
            </div>
            <ChartAreaInteractive />
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onSectionChange={setActiveSection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {renderMainContent()}
      </SidebarInset>
    </SidebarProvider>
  )
}
