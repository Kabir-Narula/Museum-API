import useSWR from "swr";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouriteAtom } from "@/store";
import { useEffect, useState } from "react";

import { addToFavourites, removeFromFavourites } from "@/lib/userData";

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );
  const [favouritesList, setFavouritesList] = useAtom(favouriteAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouriteClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setShowAdded(true);
      setFavouritesList(await addToFavourites(objectID));
    }
  };

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : data ? (
        <>
          <Card>
            {data.primaryImage && (
              <CardMedia
                component="img"
                alt={data.title || "N/A"}
                image={data.primaryImage}
              />
            )}
            <CardContent>
              <Typography variant="h6">
                <strong>{data.title || "N/A"}</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Date: </strong>{data.objectDate || "N/A"}
                <br />
                <strong>Classification: </strong>{data.classification || "N/A"}
                <br />
                <strong>Medium: </strong>{data.medium || "N/A"}
                <br />
                <br />
                <strong>Artist: </strong>
                {data.artistDisplayName ? (
                  <span>
                    {data.artistDisplayName}
                    <a
                      href={data.artistWikidata_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      wiki
                    </a>
                  </span>
                ) : "N/A"}
                <br />
                <strong>Credit Line: </strong>{data.creditLine || "N/A"}
                <br />
                <strong>Dimensions: </strong>{data.dimensions || "N/A"}
                <br />
              </Typography>
              <Button
                variant={showAdded ? "contained" : "outlined"}
                color={showAdded ? "secondary" : "primary"}
                onClick={favouriteClicked}
              >
                + Favourite {showAdded ? " (added)" : ""}
              </Button>
            </CardContent>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default ArtworkCardDetail;
