import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function CountriesSummary(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow hover role="checkbox" tabIndex={-1}>
              {Object.keys(props.CountriesSummary[0]).map(function (
                key,
                index
              ) {
                return <TableCell key={index}>{key}</TableCell>;
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
                    return (
                      <TableCell key={index2}>
                        <Link
                          to={`/country:${
                            props.CountriesSummary[page * rowsPerPage + index1]
                              .Slug
                          }`}
                        >
                          {
                            props.CountriesSummary[page * rowsPerPage + index1][
                              key
                            ]
                          }
                        </Link>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
