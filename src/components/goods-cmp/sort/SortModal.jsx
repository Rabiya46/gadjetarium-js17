import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, MenuItem, styled } from "@mui/material";
import { actionGoodSlice } from "../../../redux/slices/goods-slice";
import useDropDown from "../../../hooks/useDropDown";
import DropDown from "../../UI/DropDown";
import { ITEM_SORT } from "../../../utils/constants";

const SortModal = ({ anchorElCatalog, handleCloseCatalog }) => {
  const { params } = useSelector((state) => state.goods);
  const { sort } = params;
  const dispatch = useDispatch();

  const [subMenuCatalog, setSubMenuCatalog] = useState([]);
  const [anchorEl, setAnchorEl] = useDropDown();
  const open = Boolean(anchorEl);

  const closeHandler = useCallback(() => {
    handleCloseCatalog();
    setAnchorEl(null);
    setSubMenuCatalog([]);
  }, [handleCloseCatalog, setAnchorEl]);

  const clickSortHandler = useCallback(
    (value, e) => {
      const selectedSort = ITEM_SORT.find(
        (item) => item.value === value || item.title === value
      );

      if (selectedSort?.subcategories?.length) {
        setSubMenuCatalog(selectedSort.subcategories);
        setAnchorEl(e);
        return;
      }

      handleCloseCatalog();

      if (sort === selectedSort.value) {
        dispatch(actionGoodSlice.changeParams({ key: "sort", value: null }));
        return;
      }

      dispatch(
        actionGoodSlice.changeParams({ key: "sort", value: selectedSort.value })
      );
    },
    [handleCloseCatalog, sort, dispatch, setAnchorEl]
  );

  const clickSubSortHandler = useCallback(
    (subValue) => {
      dispatch(actionGoodSlice.changeParams({ key: "sort", value: subValue }));
      closeHandler();
    },
    [dispatch, closeHandler]
  );

  const handleSubMenuCatalog = useCallback(
    (subcategories) => (e) => {
      if (subcategories.length) {
        setSubMenuCatalog(subcategories);
        setAnchorEl(e);
      } else {
        setAnchorEl(null);
      }
    },
    [setAnchorEl]
  );

  return (
    <StyledMenuCatalog onMouseLeave={closeHandler}>
      <Grid container className="grid_container">
        <Grid item xs={6}>
          <StyledDropDown
            open={Boolean(anchorElCatalog)}
            anchorEl={anchorElCatalog}
            handleClose={handleCloseCatalog}
            PopoverClasses={{ paper: "paper" }}
            classes={{ paper: "paper" }}
            horizontal="right"
            vertical="top"
          >
            {ITEM_SORT.map((catalog) => (
              <MenuItem
                key={catalog.id}
                onMouseEnter={handleSubMenuCatalog(catalog.subcategories ?? [])}
                onClick={(e) => clickSortHandler(catalog.value, e)}
                className={sort === catalog.value ? "selectedSortField" : ""}
              >
                {catalog.title}
              </MenuItem>
            ))}
          </StyledDropDown>
        </Grid>

        {subMenuCatalog.length > 0 && (
          <Grid item xs={6}>
            <StyledDropDown
              open={open}
              anchorEl={anchorEl}
              handleClose={setAnchorEl}
              classes={{ paper: "subpaper" }}
            >
              <Grid container spacing={1} display="grid">
                {subMenuCatalog.map((sub) => (
                  <Grid item xs={12} key={sub.id}>
                    <MenuItem
                      className={sort === sub.value ? "selectedSortField" : ""}
                      onClick={() => clickSubSortHandler(sub.value)}
                    >
                      {sub.title}
                    </MenuItem>
                  </Grid>
                ))}
              </Grid>
            </StyledDropDown>
          </Grid>
        )}
      </Grid>
    </StyledMenuCatalog>
  );
};

export default SortModal;

const StyledMenuCatalog = styled(Box)(() => ({
  position: "absolute",
  "& .grid_container": {
    position: "relative",
    display: "flex",
    width: "390px",
    background: "red",
  },
}));

const StyledDropDown = styled(DropDown)(() => ({
  position: "relative",
  width: "10rem",
  maxHeight: "62px",
  "& .paper": {
    top: "22px !important",
    left: "-90px !important",
    minHeight: "206px",
    minWidth: "220px",
    padding: "4px 8px",
    display: "flex",
  },
  "& .subpaper": {
    zIndex: 0,
    left: "-265% !important",
    minWidth: "140px",
    display: "flex",
    justifyContent: "center",
    minHeight: "150px",
    textAlign: "center",
    borderRadius: "4px 0px 0px 4px",
  },
  "& .MuiBackdrop-root": {
    position: "relative",
  },
  "& .selectedSortField": {
    background: "#CB11AB",
    "&.MuiMenuItem-root": {
      "&.selectedSortField": {
        background: "#CB11AB",
      },
      color: "black !important",
      ":hover": { background: "none", color: "#CB11AB !important" },
    },
  },
}));
