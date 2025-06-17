"use client"

import { useEffect, useState } from "react"

export default function WeeklyReport({ isVisible, onClose, data }) {
  const [report, setReport] = useState("")
  const [loading, setLoading] = useState(false)

  const generateReport = () => {
    if (!data) return "No data available for report generation."

    const currentDate = new Date().toLocaleDateString()

    return `
📊 WEEKLY BUSINESS REPORT
Generated on: ${currentDate}

🏪 RESTAURANT PERFORMANCE SUMMARY
═══════════════════════════════════

📈 REVENUE ANALYSIS
• Revenue Growth: ${data.revenue.current || 0}% vs last week
• Performance Period: May 1-12, 2025
• Status: ${Number.parseFloat(data.revenue.current) > 0 ? "📈 Growing" : "📉 Declining"}

⭐ CUSTOMER SATISFACTION RATINGS
• Hygiene Rating: ${data.ratings.hygiene || 0}%
• Food Taste Rating: ${data.ratings.foodTaste || 0}%
• Packaging Rating: ${data.ratings.packaging || 0}%
• Overall Average: ${data.averageRating || 0}%

🍽️ MOST POPULAR ITEMS
${
  data.mostOrdered?.map((item, index) => `${index + 1}. ${item.name} - IDR ${item.price}`).join("\n") ||
  "No popular items data available"
}

📦 ORDER STATISTICS
• Total Orders This Period: ${data.totalOrders || 0}
• Order Distribution: Morning, Afternoon, Evening

🎯 KEY INSIGHTS & RECOMMENDATIONS

${
  Number.parseFloat(data.revenue.current) > 0
    ? "✅ Revenue is growing compared to last week - maintain current strategies"
    : "⚠️ Revenue declined - consider promotional campaigns or menu optimization"
}

${
  data.averageRating > 80
    ? "✅ Customer satisfaction is excellent - keep up the quality standards"
    : data.averageRating > 60
      ? "⚠️ Customer satisfaction is moderate - focus on improvement areas"
      : "🚨 Customer satisfaction needs immediate attention"
}

📋 ACTION ITEMS
• Monitor ${data.ratings.hygiene < 70 ? "hygiene standards" : "current hygiene excellence"}
• ${data.ratings.foodTaste < 70 ? "Improve food quality and taste" : "Maintain food quality standards"}
• ${data.ratings.packaging < 70 ? "Enhance packaging quality" : "Continue excellent packaging"}
• Focus on promoting top-performing items
• Analyze peak ordering times for staff optimization

═══════════════════════════════════
Report generated automatically from dashboard data
    `.trim()
  }

  useEffect(() => {
    if (isVisible && data) {
      setLoading(true)
      // Simulate API call delay for better UX
      setTimeout(() => {
        const generatedReport = generateReport()
        setReport(generatedReport)
        setLoading(false)
      }, 1500)
    }
  }, [isVisible, data])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">📊 AI-Generated Weekly Report</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2">
            ×
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <div className="text-lg text-gray-600">Analyzing your business data...</div>
            <div className="text-sm text-gray-500 mt-2">Generating comprehensive report</div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {report || "No report available"}
            </pre>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(report)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                📋 Copy Report
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([report], { type: "text/plain" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `weekly-report-${new Date().toISOString().split("T")[0]}.txt`
                  a.click()
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
              >
                💾 Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
