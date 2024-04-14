import { getToken } from "./authenticate";

export async function addToFavourites(id) {
  const token = getToken();
  if (!token) return [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ id: id }),
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${token}`,
      },
    }
  );
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
export async function removeFromFavourites(id) {
  const token = getToken();
  if (!token) return [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `JWT ${token}`,
      },
    }
  );
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
export async function getFavourites() {
  const token = getToken();
  if (!token) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
export async function addToHistory(id) {
  const token = getToken();
  if (!token) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id: id }),
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return true;
  } else {
    return [];
  }
}
export async function removeFromHistory(id) {
  const token = getToken();
  if (!token) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return true;
  } else {
    return [];
  }
}

export async function getHistory() {
  const token = getToken();
  if (!token) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
