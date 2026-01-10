'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Dar Al-Muzadat INTERNATIONAL 🚀
          </h1>
          <ModeToggle />
        </div>
        
        <Button>Submit Bid</Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Lot #001</CardTitle>
            <CardDescription>Luxury Villa Cairo</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Current bid: $2.5M</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
