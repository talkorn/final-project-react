import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import useQueryParams from "../hooks/useQueryParam.js";
import filterFunction from "../utilis/filterFunc.js";
import { toast } from "react-toastify";
import Slideshow from "../components/SlideComponenet";
import SortHeader from "../components/Navbar/SortNavBar";
import {
  numAscending,
  numDescending,
  strAscending,
  strDescending,
} from "../utilis/sortFunction";
import TableComponent from "../components/TableComponnent";
import useResizeHook from "../hooks/useResizeHook";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [ShowTable, setShowTable] = useState(false);
  const [ShowCards, setShowCards] = useState(true);
  const navigate = useNavigate();
  const TabletSize = useResizeHook();
  const searchParams = useQueryParams();
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    axios
      .get("http://localhost:8181/api/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error(err.response.data);
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
  const changeTableToCards = () => {
    setShowTable(true);
    setShowCards(false);
  };
  const changeCardsToTable = () => {
    setShowTable(false);
    setShowCards(true);
  };
  const addToFavorite = async (id) => {
    await axios.patch(`/cards/${id}`);
    try {
      const { data } = await axios.get("http://localhost:8181/api/cards");
      setCardsArr(data);
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };

  const deleteCardFromInitialCardsArr = async (id) => {
    try {
      setCardsArr((cardsArr) => cardsArr.filter((item) => item._id !== id));
      await axios.delete("cards/" + id);
      toast.success("you have deleted the card");
    } catch (err) {
      toast.error("The card didn't delete");
      console.log("error when deleting", err.response.data);
    }
  };
  return (
    <Box>
      <CssBaseline />
      <h1 style={{ fontFamily: "Pangolin" }}>Welcome To Tal's Jewelry</h1>
      <h2>Here You Can Find Our Uniqe and Hand Made Jewelry</h2>
      <Slideshow />
      <SortHeader
        onNumAscending={() => setCardsArr(numAscending(cardsArr))}
        onNumDescending={() => setCardsArr(numDescending(cardsArr))}
        onStrAscending={() => setCardsArr(strAscending(cardsArr))}
        onStrDescending={() => setCardsArr(strDescending(cardsArr))}
        onChangeTableToCards={() => changeTableToCards()}
        onChangeCardsToTable={() => changeCardsToTable()}
      />
      <Grid container spacing={0.5}>
        {cardsArr.map((item) => (
          <Grid item xs={12} key={item._id + Date.now()}>
            {ShowTable && !TabletSize && (
              <TableComponent
                category={item.category}
                colors={item.colors}
                likes={item.likes}
                idUser={idUser}
                cardIdUser={item.user_id}
                onClick={moveToCardPage}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                stock={item.stock}
                img={item.image.url}
                bizNumber={item.bizNumber}
                onEdit={moveToEditPage}
                onDelete={deleteCardFromInitialCardsArr}
                onFavorites={addToFavorite}
                canEdit={payload && payload.isAdmin}
                canDelete={payload && payload.isAdmin}
                canUser={payload && payload._id}
              />
            )}
          </Grid>
        ))}
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item._id + Date.now()}>
            {" "}
            {ShowCards || (!ShowCards && TabletSize) ? (
              <CardComponent
                category={item.category}
                colors={item.colors}
                likes={item.likes}
                idUser={idUser}
                cardIdUser={item.user_id}
                onClick={moveToCardPage}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                stock={item.stock}
                img={item.image.url}
                bizNumber={item.bizNumber}
                onEdit={moveToEditPage}
                onDelete={deleteCardFromInitialCardsArr}
                onFavorites={addToFavorite}
                canEdit={payload && payload.isAdmin}
                canDelete={payload && payload.isAdmin}
                canUser={payload && payload._id}
              />
            ) : null}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};
export default HomePage;
