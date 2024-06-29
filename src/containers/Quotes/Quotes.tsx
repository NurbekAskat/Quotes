import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { ApiQuotes, Quote } from '../../types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<ApiQuotes | null>('/quotes.json');

    const postsResponse = response.data;

    if (postsResponse !== null) {
      const quotes: Quote[] = Object.keys(postsResponse).map((id: string) => {
        return {
          ...postsResponse[id],
          id,
        };
      });
      setQuotes(quotes);
    } else {
      setQuotes([]);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const onDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await axiosApi.delete(`/quotes/${id}.json`);
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong' });
    }
    setIsLoading(false);
  };

  return (
    <Grid
      container
      spacing={2}
      flexWrap="wrap"
      justifyContent="space-around"
      alignItems="center"
    >
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {quotes.length === 0 && !isLoading && (
        <Typography variant="h2">Sorry, UwU</Typography>
      )}
      {quotes.map((quotes) => (
        <Grid item sx={{ width: '50%' }}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {quotes.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {quotes.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {quotes.text}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex' }}>
              <Button
                size="small"
                component={Link}
                to={`/quotes/${quotes.id}/edit`}
                className="ms-auto"
              >
                Edit quote
              </Button>
              <Button
                size="small"
                className=""
                onClick={() => onDelete(quotes.id)}
              >
                Delete quote
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Quotes;

