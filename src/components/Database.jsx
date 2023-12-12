import "./Database.css";
import Layout from "./Layout";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "./Container";
import { useState, useEffect } from "react";

function Database(props) {
  const [data, setData] = useState([
    {
      ID: "",
      Message: "",
      Entities: [],
      Sentiment_Score: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/data`);
        let data = await res.json();
        setData(data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [props.form]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Layout>
      <Container>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "80vh", maxWidth: "90vw" }}
        >
          <Table
            sx={{ minWidth: 700, maxWidth: "80vw" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Message</StyledTableCell>
                <StyledTableCell align="right">Entities</StyledTableCell>
                <StyledTableCell align="right">Sentiment_Score</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.ID}>
                  <StyledTableCell component="th" scope="row">
                    {row.ID}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Message}</StyledTableCell>
                  <StyledTableCell align="right">
                    {JSON.stringify(row.Entities)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {JSON.stringify(row.Sentiment_Score)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
}

export default Database;
