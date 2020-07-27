import Button from '@common_button';
import Typography from '@common_typography';
import formatDate from '@helpers/date';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import Router from 'next/router';
import useStyles from './styles';

const HistoryContent = (props) => {
    const {
        loading, data, t, pageSize, page, handleChangePage, handleChangePageSize,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.tableOuterContainer}>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left">{t('rma:table:returnId')}</TableCell>
                            <TableCell align="left">{t('rma:table:orderId')}</TableCell>
                            <TableCell align="left">{t('rma:table:products')}</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">{t('rma:table:createdAt')}</TableCell>
                            <TableCell align="left">{t('rma:table:updatedAt')}</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && data.getCustomerRequestAwRma.items.length > 0 ? (
                            <>
                                {
                                    data.getCustomerRequestAwRma.items.map((val, index) => (
                                        <TableRow className={styles.tableRowResponsive} key={index}>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('rma:table:returnId')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:returnId')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{val.increment_id}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('rma:table:orderId')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:orderId')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{val.order_number}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('rma:table:products')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:products')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        {
                                                            val.items.map((item) => `${item.name}, `)
                                                        }
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        Status
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            Status
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{val.status.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('rma:table:createdAt')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:createdAt')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>{formatDate() }</div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('rma:table:updatedAt')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            {t('rma:table:updatedAt')}
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        {formatDate() }
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        Actions
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography align="center" type="bold" letter="capitalize">
                                                            Actions
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Button
                                                            variant="text"
                                                            className="clear-margin-padding"
                                                            onClick={() => Router.push(
                                                                '/rma/customer/view/id/[id]',
                                                                `/rma/customer/view/id/${val.increment_id}`,
                                                            )}
                                                        >
                                                            <Typography
                                                                className="clear-margin-padding"
                                                                variant="span"
                                                            >
                                                                {t('rma:table:view')}
                                                            </Typography>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                    ))
                                }
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                        colSpan={6}
                                        count={data.getCustomerRequestAwRma.total_count || 0}
                                        rowsPerPage={pageSize}
                                        page={page}
                                        labelRowsPerPage="Limit"
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangePageSize}
                                    />
                                </TableRow>
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Alert severity="warning">{t('rma:empty')}</Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default HistoryContent;