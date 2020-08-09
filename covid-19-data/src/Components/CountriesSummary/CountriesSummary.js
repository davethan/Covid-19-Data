import React from "react";
import useStyles from "./Styles.js";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

export default function CountriesSummary(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(90);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={1} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow hover role="checkbox" tabIndex={-1}>
              {Object.keys(props.CountriesSummary[0]).map(function (
                key,
                index
              ) {
                if (index === 1) {
                  return <React.Fragment key={index}></React.Fragment>;
                } else if (index === 2) {
                  return <TableCell key={index}>New Cases</TableCell>;
                } else if (index === 3) {
                  return <TableCell key={index}>Total Cases</TableCell>;
                } else if (index === 4) {
                  return <TableCell key={index}>New Deaths</TableCell>;
                } else if (index === 5) {
                  return <TableCell key={index}>Total Deaths</TableCell>;
                } else if (index === 6) {
                  return <TableCell key={index}>New Recovered</TableCell>;
                } else if (index === 7) {
                  return <TableCell key={index}>Total Recovered</TableCell>;
                } else {
                  return <TableCell key={index}>{key}</TableCell>;
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.CountriesSummary.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((countries, index1) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index1}>
                  {Object.keys(
                    props.CountriesSummary[page * rowsPerPage + index1]
                  ).map(function (key, index2) {
                    return index2 !== 1 ? (
                      <TableCell key={index2}>
                        <Link
                          to={`/Covid-19-Data/country:${
                            props.CountriesSummary[page * rowsPerPage + index1]
                              .Slug
                          }`}
                          className={classes.link}
                        >
                          {
                            props.CountriesSummary[page * rowsPerPage + index1][
                              key
                            ]
                          }
                        </Link>
                      </TableCell>
                    ) : (
                      <React.Fragment key={index2}></React.Fragment>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[70, 90, 130]}
        component="div"
        count={props.CountriesSummary.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}