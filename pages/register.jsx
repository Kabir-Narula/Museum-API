import { Card, CardContent, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import { registerUser } from "@/lib/authenticate";
import { useRouter } from 'next/router';

export default function Register(props) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [warning, setWarning] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
        <CardContent>
          <h2>Register</h2>
          <p>Register for an account:</p>
          <TextField
            label="User"
            variant="outlined"
            fullWidth
            value={user}
            onChange={(e) => setUser(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Register
          </Button>
        </CardContent>
      </Card>
      {warning && (
        <Alert severity="error" sx={{ maxWidth: 400, mx: 'auto', mt: 2 }}>
          {warning}
        </Alert>
      )}
    </>
  );
}
