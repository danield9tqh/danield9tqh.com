import { useState } from 'react';

export function useLandingPassword() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyPassword = async (hash: number): Promise<boolean> => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash }),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return false;
      }
      
      return data.success;
    } catch (err) {
      setError('Failed to verify password');
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    verifyPassword,
    isVerifying,
    error,
  };
}