import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Row, Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { getHistory, removeFromHistory } from "@/lib/userData";
import { useEffect } from "react";
import { searchHistoryAtom } from "@/store";

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Initialize searchHistory as an array if it is not already
  if (!Array.isArray(searchHistory)) {
    setSearchHistory([]);
  }

  useEffect(() => {
    getHistory().then((data) => setSearchHistory(data));
  }, [setSearchHistory]);

  const historyClicked = (index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // Prevent click event propagation
    await removeFromHistory(searchHistory[index]);
    const updatedHistory = await getHistory();
    setSearchHistory(updatedHistory);
  };

  // Handle if searchHistory is null, undefined, or not an array
  if (!searchHistory || !Array.isArray(searchHistory)) {
    return null;
  }

  // Map through searchHistory
  const parsedHistory = searchHistory.map((historyItem) => {
    const params = new URLSearchParams(historyItem);
    return Object.fromEntries(params);
  });

  return (
    <>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={() => historyClicked(index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Row className="gy-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Nothing Here</h4>
              </Card.Title>
              <Card.Text>Try searching for something else.</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      )}
    </>
  );
};

export default History;
