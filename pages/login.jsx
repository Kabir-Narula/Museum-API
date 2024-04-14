import { Card, CardContent, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import { authenticateUser, readToken } from "@/lib/authenticate";
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouriteAtom, searchHistoryAtom, tokenAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";

export default function Login(props) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [warning, setWarning] = useState("");
  const [password, setPassword] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouriteAtom);
  const [token, setToken] = useAtom(tokenAtom);

  async function updateAtoms() {
    setSearchHistory(await getHistory());
    setFavouritesList(await getFavourites());
    setToken(readToken());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();

      router.push("/");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
        <CardContent>
          <h2>Login</h2>
          <p>Enter your login information below:</p>
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
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Login
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
