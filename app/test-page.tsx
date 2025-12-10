export default function TestPage() {
  return (
    <div style={{ padding: '50px', background: 'lightblue' }}>
      <h1 style={{ color: 'black', fontSize: '32px' }}>Test Page - If you see this, React is working</h1>
      <p style={{ color: 'black', fontSize: '18px' }}>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
}
