import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";
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
import useResizeHook from "../hooks/useResizeHook";
import TableComponent from "../components/TableComponnent";

const FavoritePage = () => {
  const [ShowTable, setShowTable] = useState(false);
  const [ShowCards, setShowCards] = useState(true);
  const searchParams = useQueryParams();
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const TabletSize = useResizeHook();
  const LoggedIn = useLoggedIn();
  const navigate = useNavigate();
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    LoggedIn();

    axios
      .get("http://localhost:8181/api/cards")
      .then(({ data }) => {
        filterFunc(data);
      })

      .catch((err) => {
        console.log("err from axios", err);
      });
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
  if (!payload) {
    return;
  }
  const idUser = payload._id;
  if (!idUser) {
    return;
  }
  if (!cardsArr) {
    return <CircularProgress />;
  }

  const moveToCardPage = (id) => {
    console.log("id", id);
    navigate(`/card/${id}`);
  };
  const moveToEditPage = (id) => {
    navigate(`/edit/${id}`);
  };
  const changeTableToCards = () => {
    setShowTable(true);
    setShowCards(false);
  };
  const changeCardsToTable = () => {
    setShowTable(false);
    setShowCards(true);
  };
  const addToFavorites = async (id) => {
    await axios.patch(`/cards/${id}`);
    try {
      const { data } = await axios.get("/cards");
      setCardsArr(data);
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };
  const deleteCardFromInitialCardsArr = async (id) => {
    try {
      console.log("id", id);
      setCardsArr((cardsArr) => cardsArr.filter((item) => item._id != id));
      console.log("cardsArr", cardsArr);
      await axios.delete("cards/" + id);
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };
  return (
    <Box>
      <CssBaseline />
      <h1>Favorite</h1>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {cardsArr.filter((item) => item.likes.includes(idUser)).length ===
          0 ? (
            <h2>Your favorite cards cart is empty</h2>
          ) : (
            <h2>Here You Can See All Your Favorite Cards</h2>
          )}
        </div>

        <SortHeader
          onNumAscending={() => setCardsArr(numAscending(cardsArr))}
          onNumDescending={() => setCardsArr(numDescending(cardsArr))}
          onStrAscending={() => setCardsArr(strAscending(cardsArr))}
          onStrDescending={() => setCardsArr(strDescending(cardsArr))}
          onChangeTableToCards={() => changeTableToCards()}
          onChangeCardsToTable={() => changeCardsToTable()}
        />
      </Box>
      {/* {cardsArr.filter((item) => item.likes == idUser).length == 0 ? (
        <h2>Your favorite cards cart is empty</h2>
      ) : (
        <h2>Here You Can See All Your Favorite Cards</h2>
      )}
      <SortHeader
        onNumAscending={() => setCardsArr(numAscending(cardsArr))}
        onNumDescending={() => setCardsArr(numDescending(cardsArr))}
        onStrAscending={() => setCardsArr(strAscending(cardsArr))}
        onStrDescending={() => setCardsArr(strDescending(cardsArr))}
      /> */}
      <Grid container spacing={2}>
        {cardsArr &&
          cardsArr
            .filter((item) => item.likes.includes(idUser))
            .map((item) => (
              <Grid item xs={12} key={item._id + Date.now()}>
                {" "}
                {ShowTable && !TabletSize && (
                  <TableComponent
                    likes={item.likes}
                    idUser={idUser}
                    onClick={moveToCardPage}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    stock={item.stock}
                    category={item.category}
                    color={item.colors}
                    img={item.image.url}
                    onEdit={moveToEditPage}
                    onDelete={deleteCardFromInitialCardsArr}
                    onFavorites={addToFavorites}
                    canEdit={payload && (payload.isBusiness || payload.isAdmin)}
                    canDelete={payload && payload.isAdmin}
                    canUser={payload && payload._id}
                    cardIdUser={item.user_id}
                  />
                )}
              </Grid>
            ))}
        {cardsArr &&
          cardsArr
            .filter((item) => item.likes.includes(idUser))
            .map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id + Date.now()}>
                {ShowCards || (!ShowCards && TabletSize) ? (
                  <CardComponent
                    likes={item.likes}
                    idUser={idUser}
                    onClick={moveToCardPage}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    stock={item.stock}
                    category={item.category}
                    colors={item.colors}
                    img={item.image.url}
                    onEdit={moveToEditPage}
                    onDelete={deleteCardFromInitialCardsArr}
                    onFavorites={addToFavorites}
                    canEdit={payload && (payload.isBusiness || payload.isAdmin)}
                    canDelete={payload && payload.isAdmin}
                    canUser={payload && payload._id}
                    cardIdUser={item.user_id}
                  />
                ) : null}
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};
export default FavoritePage;
