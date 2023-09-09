import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/CardComponents";
import ROUTES from "../routes/ROUTES";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import useQueryParams from "../hooks/useQueryParam.js";
import filterFunction from "../utilis/filterFunc.js";
import SortHeader from "../components/Navbar/SortNavBar";
import {
  numAscending,
  numDescending,
  strAscending,
  strDescending,
} from "../utilis/sortFunction";

const MyCardsPage = () => {
  const searchParams = useQueryParams();
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    axios
      .get("cards/my-cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {});
  }, []);
  const filterFunc = (data) => {
    let dataToSearch = originalCardsArr || data;
    if (!dataToSearch) {
      return;
    }
    let searchResult = filterFunction(dataToSearch, searchParams);

    setOriginalCardsArr(dataToSearch);
    setCardsArr(searchResult);
  };
  useEffect(() => {
    filterFunc();
  }, [searchParams.filter]);
  let idUser;
  if (payload) {
    idUser = payload._id;
  }

  if (!cardsArr) {
    return <CircularProgress />;
  }

  const moveToCardPage = (id) => {
    navigate(`/card/${id}`);
  };
  const moveToEditPage = (id) => {
    navigate(`/edit/${id}`);
  };

  const addToFavorite = async (id) => {
    await axios.patch(`/cards/${id}`);
    try {
      const { data } = await axios.get("/cards/my-cards");
      setCardsArr(data);
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };

  const deleteCardFromInitialCardsArr = async (id) => {
    try {
      setCardsArr((cardsArr) => cardsArr.filter((item) => item._id != id));
      await axios.delete("cards/" + id);
      toast.success("you have deleted the card");
    } catch (err) {
      toast.error("The card didn't delete");
      console.log("error when deleting", err.response.data);
    }
  };

  const moveToAddCards = () => {
    navigate(ROUTES.ADDCARD);
  };
  return (
    <Box>
      <CssBaseline />
      <h1 style={{ fontFamily: "Pangolin" }}>Cards Page</h1>
      <h2>Here You Can Find All your Buisness Cards</h2>
      <h3>To add a new card, click on the blue button to your left</h3>
      <SortHeader
        onNumAscending={() => setCardsArr(numAscending(cardsArr))}
        onNumDescending={() => setCardsArr(numDescending(cardsArr))}
        onStrAscending={() => setCardsArr(strAscending(cardsArr))}
        onStrDescending={() => setCardsArr(strDescending(cardsArr))}
      />
      <Grid item xs={4}>
        <Box
          sx={{
            flexGrow: 1,
            position: "fixed",
            bottom: 0,
            left: 25,
            m: 2,
          }}
        >
          <Button
            onClick={moveToAddCards}
            sx={{
              display: "block",
            }}
          >
            <AddCircleIcon
              color="primary"
              fontSize="large"
              sx={{ fontSize: 80 }}
            />
          </Button>
        </Box>
        <Grid container spacing={2}>
          {cardsArr.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id + Date.now()}>
              <CardComponent
                likes={item.likes}
                idUser={idUser}
                onClick={moveToCardPage}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                stock={item.stock}
                colors={item.colors}
                category={item.category}
                img={item.image.url}
                bizNumber={item.bizNumber}
                onEdit={moveToEditPage}
                onDelete={deleteCardFromInitialCardsArr}
                onFavorites={addToFavorite}
                canEdit={payload && payload.isAdmin}
                canDelete={payload && payload.isAdmin}
                canUser={payload && payload._id}
                cardIdUser={item.user_id}
              />
            </Grid>
          ))}{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyCardsPage;
