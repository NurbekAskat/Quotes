import React, { useCallback, useEffect, useState } from 'react';
import { Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import axiosApi from '../../axiosApi';
import { Quotes } from '../../types';


const initialState = {
  author: '',
  category: '',
  text: '',
};

const MutateQuotes = () => {
  const [quoteMutation, setQuoteMutation] = useState<Quotes>(initialState);

  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const fetchOnePost = useCallback(async (id: string) => {
    setIsLoading(true);
    const response = await axiosApi.get<Quotes | null>(`/quotes/${id}.json`);
    if (response.data) {
      setQuoteMutation(response.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      void fetchOnePost(id);
    } else {
      setQuoteMutation(initialState);
    }
  }, [fetchOnePost, id]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuoteMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const quoteData = {
        ...quoteMutation,
      };

      if (id) {
        await axiosApi.put(`/quotes/${id}.json`, quoteData);
      } else {
        await axiosApi.post('/quotes.json', quoteData);
      }

      navigate('/');
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid
      container
      component="form"
      direction="column"
      spacing={2}
      onSubmit={onSubmit}
    >
      <Grid item>
        <Typography variant="h5">
          {id ? 'Edit a quote' : 'Create a new quote'}
        </Typography>
      </Grid>
      <Grid item>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          name="category"
          value={quoteMutation.category}
          onChange={onFieldChange}
          fullWidth
          required
        >
          <MenuItem value="star-wars">Star Wars</MenuItem>
          <MenuItem value="famous-people">Famous people</MenuItem>
          <MenuItem value="saying">Saying</MenuItem>
          <MenuItem value="humour">Humour</MenuItem>
          <MenuItem value="motivational">Motivational</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <TextField
          label="author"
          variant="outlined"
          name="author"
          value={quoteMutation.author}
          onChange={onFieldChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item>
        <TextField
          label="text"
          multiline
          minRows={3}
          variant="outlined"
          name="text"
          value={quoteMutation.text}
          onChange={onFieldChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item>
        <LoadingButton loading={isLoading} variant="contained" type="submit">
          Save
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default MutateQuotes;
