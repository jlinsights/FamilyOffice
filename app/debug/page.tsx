export default function DebugPage() {
  console.log('Debug page rendering...')
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Debug Page</h1>
        <p className="text-xl text-gray-600">Server is working correctly!</p>
        <p className="text-lg text-gray-500 mt-4">
          현재 시간: {new Date().toLocaleString('ko-KR')}
        </p>
      </div>
    </div>
  )
}