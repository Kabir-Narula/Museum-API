import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { TextField, Button, FormGroup, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Box } from '@mui/material';

const AdvancedSearch = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      searchBy: "title",
      geoLocation: null,
      medium: null,
      isOnView: false,
      isHighlight: false,
      q: "",
    },
  });

  const submitForm = async(data) => {
    let queryString = `${data.searchBy}=true`;

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }
    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    if (data.q) {
      queryString += `&q=${data.q}`;
    }

    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Box sx={{ maxWidth: 800, m: 'auto', mt: 3 }}>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextField
          fullWidth
          label="Search Query"
          variant="outlined"
          error={!!errors.q}
          helperText={errors.q ? 'This field is required' : ''}
          {...register("q", { required: true })}
          sx={{ mb: 3 }}
        />
        <FormGroup sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="search-by-label">Search By</InputLabel>
            <Select
              labelId="search-by-label"
              label="Search By"
              defaultValue="title"
              {...register("searchBy")}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="tags">Tags</MenuItem>
              <MenuItem value="artistOrCulture">Artist or Culture</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <TextField
          fullWidth
          label="Geo Location"
          variant="outlined"
          {...register("geoLocation")}
          helperText="Case sensitive (e.g., 'Europe', 'France'). Separate multiple values with '|'."
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Medium"
          variant="outlined"
          {...register("medium")}
          helperText="Case sensitive (e.g., 'Ceramics', 'Paintings'). Separate multiple values with '|'."
          sx={{ mb: 3 }}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...register("isHighlight")} />}
            label="Highlighted"
          />
          <FormControlLabel
            control={<Checkbox {...register("isOnView")} />}
            label="Currently on View"
          />
        </FormGroup>
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AdvancedSearch;
