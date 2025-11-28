import {
  Tabs as MuiTabs,
  Tab,
  Box,
  styled,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DownloadPDFIcon } from "../../assets";
import axiosInstance from "../../config/axios-instance";

export default function Tabs({ tabs = [] }) {
  const [query, setQuery] = useState(tabs[0].param);
  const [loading, setLoading] = useState(false);
  const [downloadTime, setDownloadTime] = useState(0); // время в секундах

  const navigate = useNavigate();
  const location = useLocation();
  const { details } = useSelector((state) => state.productDetails);

  useEffect(() => {
    const route = location.pathname.split("/").pop();
    setQuery(route);
  }, [location.pathname]);

  const handleChange = (_, newParam) => {
    setQuery(newParam);
    navigate(newParam);
  };

  const downloadPDFFileHandler = async () => {
    try {
      setLoading(true);
      setDownloadTime(0);

      const startTime = performance.now();

      const response = await axiosInstance.get(
        `/api/images/download-pdf/${details.id}`,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        }
      );

      const endTime = performance.now();
      setDownloadTime(((endTime - startTime) / 1000).toFixed(2)); // время в секундах

      // скачивание файла
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      toast.error("Что-то не так с сервером или данными");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BoxStyled>
        <TabsStyled
          value={query}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          classes={{ root: "root", flexContainer: "flex" }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              label={<Link to={tab.param}>{tab.label}</Link>}
              value={tab.param}
              className="tab"
            />
          ))}
        </TabsStyled>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          className="download_wrapper"
        >
          <Typography
            variant="body1"
            className="download_pdf flex gap pointer"
            onClick={downloadPDFFileHandler}
          >
            <DownloadPDFIcon />
            Скачать документ.pdf
          </Typography>

          {loading && <CircularProgress size={24} />}
          {!loading && downloadTime > 0 && (
            <Typography variant="body2">{downloadTime} сек</Typography>
          )}
        </Box>
      </BoxStyled>
    </>
  );
}

export const BoxStyled = styled(Box)(() => ({
  borderBottom: "1px solid #CDCDCD",
  display: "flex",
  justifyContent: "space-between",
  gap: "100px",
  "& .download_pdf": {
    padding: 5,
    alignSelf: "flex-end",
    display: "flex",
    alignItems: "center",
  },
}));

export const TabsStyled = styled(MuiTabs)(() => ({
  "& .flex": {
    display: "flex",
    gap: "1.8rem",
  },
  "& .tab": {
    fontFamily: "Inter",
    textTransform: "none",
    color: "#292929",
    fontSize: "18px",
    fontWeight: "500",
  },
}));
