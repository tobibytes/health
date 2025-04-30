'use client'

import { FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

const testResults = [
  {
    id: '1',
    date: '2024-03-15',
    type: 'Blood Test',
    status: 'normal',
    content: `# Blood Test Results

## Complete Blood Count (CBC)
- **White Blood Cells (WBC):** 7.5 x 10^9/L (Normal range: 4.5-11.0)
- **Red Blood Cells (RBC):** 4.8 x 10^12/L (Normal range: 4.5-5.5)
- **Hemoglobin (Hgb):** 14.2 g/dL (Normal range: 13.5-17.5)
- **Hematocrit (Hct):** 42% (Normal range: 41-50%)

## Comments
All values are within normal ranges. No further action required.`,
  },
  {
    id: '2',
    date: '2024-03-10',
    type: 'X-Ray',
    status: 'abnormal',
    content: `# Chest X-Ray Results

## Findings
- Small opacity noted in the right lower lobe
- No pleural effusion
- Heart size normal

## Recommendations
- Follow-up CT scan recommended
- Schedule appointment with pulmonologist`,
  },
]

export default function ResultsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Test Results</h1>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {testResults.map((result) => (
          <div
            key={result.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-medium">{result.type}</h2>
                {result.status === 'normal' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(result.date).toLocaleDateString()}
              </span>
            </div>
            <div className="prose prose-sm mt-4 max-w-none">
              <ReactMarkdown>{result.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 