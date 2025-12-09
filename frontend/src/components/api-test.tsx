'use client'

import { useState, useEffect } from 'react'

export function ApiTest() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [apiData, setApiData] = useState<any>(null)

  useEffect(() => {
    async function testApi() {
      try {
        console.log('Testing API connection...')
        
        // Test basic endpoint
        const response = await fetch('http://localhost:8000/')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('API Response:', data)
        
        // Test API endpoint
        const testResponse = await fetch('http://localhost:8000/api/v1/test')
        if (!testResponse.ok) {
          throw new Error(`HTTP error! status: ${testResponse.status}`)
        }
        
        const testData = await testResponse.json()
        console.log('API Test Response:', testData)
        
        setApiData({ root: data, test: testData })
        setApiStatus('success')
      } catch (error) {
        console.error('API Test failed:', error)
        setApiStatus('error')
      }
    }

    testApi()
  }, [])

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">API Connection Test</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          {apiStatus === 'loading' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Testing...
            </span>
          )}
          {apiStatus === 'success' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✅ Connected
            </span>
          )}
          {apiStatus === 'error' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              ❌ Connection Failed
            </span>
          )}
        </div>

        {apiStatus === 'success' && apiData && (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Root Endpoint Response:</h3>
              <pre className="mt-1 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                {JSON.stringify(apiData.root, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Test Endpoint Response:</h3>
              <pre className="mt-1 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                {JSON.stringify(apiData.test, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {apiStatus === 'error' && (
          <div className="text-sm text-red-600">
            <p>❌ Unable to connect to backend API (http://localhost:8000)</p>
            <p className="mt-1 text-xs text-gray-500">
              Make sure the backend server is running on port 8000
            </p>
          </div>
        )}

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Next Steps:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Frontend: Running on localhost:3000</li>
            <li className={apiStatus === 'success' ? 'text-green-600' : 'text-gray-600'}>
              {apiStatus === 'success' ? '✅' : '⏳'} Backend: API server on localhost:8000
            </li>
            <li>⏳ Database: SQLite ready for testing</li>
            <li>⏳ Authentication: JWT endpoints ready</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
