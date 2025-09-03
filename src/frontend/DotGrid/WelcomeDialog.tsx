interface WelcomeDialogProps {
  show: boolean;
}

export function WelcomeDialog({ show }: WelcomeDialogProps) {
  if (!show) return null;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        backgroundColor: '#f5f5f0', // Same as canvas background
        border: '2px solid #4169e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '4px',
        zIndex: 1000
      }}
    >
      <h1 style={{ 
        margin: 0, 
        fontFamily: '"Courier New", "Consolas", "Monaco", monospace', // Robotic/coding font
        fontSize: '32px',
        color: '#4169e1', // Same blue as dots
        letterSpacing: '2px'
      }}>
        Welcome...
      </h1>
    </div>
  );
}