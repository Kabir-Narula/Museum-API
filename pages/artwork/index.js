import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import Error from 'next/error';
import validObjectIDList from '../../public/data/validObjectIDList.json';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Artwork = () => {
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1] || '';
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher);

  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    if (data && data.objectIDs) {
      const validIDs = validObjectIDList.objectIDs.filter(id => data.objectIDs.includes(id));
      const chunks = [];
      for (let i = 0; i < validIDs.length; i += PER_PAGE) {
        chunks.push(validIDs.slice(i, i + PER_PAGE));
      }
      setArtworkList(chunks);
      setPage(1); // Reset to first page when query changes
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;
  if (!data) return <div>Loading...</div>; // You can replace this with any loading component

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Artwork;
