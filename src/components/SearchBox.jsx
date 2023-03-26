import { LocationOn } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export const SearchBox = ({ setSelectPosition }) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchCity = async () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      setLoading(true);
      const resp = await fetch(
        NOMINATIM_BASE_URL + queryString,
        requestOptions
      );
      const data = await resp.json();
      setListPlace(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setSearchText(e.target.value);
    searchCity();
  };

  const selectPositon = (lat, lng) => {
    setSelectPosition([lat, lng]);
    setSearchText("");
  };

  return (
    <Container>
      <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
        <TextField
          value={searchText}
          onChange={handleCityChange}
          placeholder="Santiago, Chile"
          label="City"
          fullWidth
        />
        <Button variant="contained" onClick={searchCity}>
          Search
        </Button>
      </Box>
      <Box>
        <List>
          {loading ? (
            <span>Cargando...</span>
          ) : (
            listPlace.map((place) => (
              <ListItem disablePadding key={place?.place_id}>
                <ListItemButton
                  onClick={() => selectPositon(place.lat, place.lon)}
                >
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary={place?.display_name} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Container>
  );
};
