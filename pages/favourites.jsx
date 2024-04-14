import { useAtom } from "jotai";
import { favouriteAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { getFavourites } from "@/lib/userData";
import { useEffect } from "react";

const Favourites = () => {
  const [favouritesList, setfavouritesList] = useAtom(favouriteAtom);
  
  // Include setfavouritesList in the dependency array
  useEffect(() => {
    getFavourites().then((data) => {
      setfavouritesList(data);
    });
  }, [setfavouritesList]); // Now `setfavouritesList` is included as a dependency

  if (!favouritesList) return null;

  return (
    <Row className="gy-4">
      {favouritesList.length > 0 ? (
        favouritesList.map((favObjId) => (
          <Col lg={3} key={favObjId}>
            <ArtworkCard objectID={favObjId} />
          </Col>
        ))
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>
              <h4>Nothing Here</h4>
            </Card.Title>
            <Card.Text>Try searching for something else.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Row>
  );
};

export default Favourites;
