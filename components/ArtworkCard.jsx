import useSWR from "swr";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "@mui/material";
import Error from "next/error";

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : data ? (
        <Card>
          <CardMedia
            component="img"
            alt={data.title || "N/A"}
            height="375"
            image={data.primaryImageSmall || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {data.title || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Date:</strong> {data.objectDate || "N/A"}<br />
              <strong>Classification:</strong> {data.classification || "N/A"}<br />
              <strong>Medium:</strong> {data.medium || "N/A"}<br />
            </Typography>
            <Link href={`/artwork/${objectID}`} passHref>
              <Button variant="contained" color="primary">
                <strong>ID:</strong> {objectID}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default ArtworkCard;
