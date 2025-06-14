// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';

// export default function WeeklyReport() {
//    const [report, setReport] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/api/weekly-report")
//       .then(res => res.json())
//       .then(data => setReport(data.report))
//       .catch(err => console.error("Error:", err));
//   }, []);

//   return (
//     <div className="report">
//       <h2>AI-Generated Weekly Report</h2>
//       <p>{report}</p>
//     </div>
//   );
// }

"use client"
import { useEffect } from "react"
import { useState } from "react"

export default function WeeklyReport({ isVisible, onClose }) {
  const [report, setReport] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setLoading(true)
      fetch("http://localhost:5000/api/weekly-report")
        .then((res) => res.json())
        .then((data) => {
          setReport(data.report)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error:", err)
          setLoading(false)
        })
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">AI-Generated Weekly Report</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ×
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-lg">Generating report...</div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{report || "No report available"}</div>
        )}
      </div>
    </div>
  )
}
