export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
      <p className="text-xl text-gray-600 mb-8">If you can see this, the server is working!</p>
      
      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold">Test 1: Basic Rendering</h2>
          <p>✅ Page renders correctly</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-semibold">Test 2: CSS Loading</h2>
          <p>✅ Tailwind CSS is working</p>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="font-semibold">Test 3: JavaScript</h2>
          <p>✅ React hydration successful</p>
        </div>
      </div>
    </div>
  )
}