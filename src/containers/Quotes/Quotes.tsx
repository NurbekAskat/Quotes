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
import { Link, NavLink, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);

    let categoryURL = '';
    if (category) {
      categoryURL = `?orderBy="category"&equalTo="${category}"`;
    }

    const response = await axiosApi.get<ApiQuotes | null>(
      '/quotes.json' + categoryURL,
    );

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
  }, [category]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const onDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await axiosApi.delete(`/quotes/${id}.json`);
      fetchPosts();
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong' });
    }
    setIsLoading(false);
  };

  return (
    <div className="main">
      <Grid direction="column" sx={{ width: '300px' }}>
        <Grid item>
          <Button
            component={NavLink}
            to="/"
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            All
          </Button>
          <Button
            component={NavLink}
            to="/quotes/star-wars"
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            Star wars
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={NavLink}
            to="/quotes/humour"
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            humour
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={NavLink}
            to="/quotes/saying"
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            saying
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={NavLink}
            to="/quotes/famous-people"
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            Famous people
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={NavLink}
            to="/quotes/motivational"
            variant="contained"
            fullWidth
          >
            Motivational
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        sx={{ ml: 1 }}
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
          <Typography variant="h2">Sorry, No quotes</Typography>
        )}
        {quotes.map((quotes) => (
          <Grid item sx={{ width: '50%' }} key={quotes.id}>
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
                  variant="contained"
                >
                  Delete quote
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Quotes;
