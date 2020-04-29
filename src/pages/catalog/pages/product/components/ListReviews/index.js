/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import Button from '@components/Button';
import Typography from '@components/Typography';
import classNames from 'classnames';
import React from 'react';
import Toast from '@components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCountReview } from '../../redux/action';
import { getReviews } from '../../services/graphql';
import * as Schema from '../../services/graphql/reviewSchema';
import useStyles from '../../style';
import AddReviewDialog from '../AddReviewDialog';
import CustomerReview from '../CustomerReview';

export default (props) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product);

    const [openReview, setOpenReview] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [loadMore, setLoadMore] = React.useState(false);
    const [reviewParams] = React.useState({
        sku: props.data.sku || '',
        pageSize: 2,
        currentPage: 1,
    });

    const { loading, fetchMore, data } = getReviews(reviewParams);

    const handleOpenReview = ({ message }) => {
        setOpenReview(!openReview);
        if (
            message
            && (message === 'success' || message.toLowerCase() === 'success')
        ) setShowMessage(true);
    };

    const handleLoad = () => {
        setLoadMore(true);
        return fetchMore({
            query: Schema.getReview({
                ...reviewParams,
                currentPage:
                    reviewParams.currentPage + 1,
            }),
            updateQuery: (
                previousResult,
                { fetchMoreResult },
            ) => {
                setLoadMore(false);
                const prevItems = previousResult.getProductReviews;
                const newItems = fetchMoreResult.getProductReviews;
                return {
                    getProductReviews: {
                        // eslint-disable-next-line no-underscore-dangle
                        __typename: newItems.__typename,
                        totalCount: newItems.totalCount,
                        message: prevItems.message,
                        items: [
                            ...prevItems.items,
                            ...newItems.items,
                        ],
                    },
                };
            },
        });
    };

    React.useEffect(() => {
        if (!loading && data.getProductReviews && (!productState.review.rating || !productState.review.totalCount
            || productState.review.totalCount !== data.getProductReviews.totalCount
            || productState.review.rating !== data.getProductReviews.items.length)
        ) {
            let rating = 0;
            let qtyRate = 0;
            data.getProductReviews.items.map((items) => {
                let totalRate = 0;
                items.ratings.map((rate) => {
                    if (rate.rating_name === 'Rating') {
                        totalRate += rate.value;
                        qtyRate += 1;
                    }
                });
                rating += totalRate;
            });
            dispatch(setCountReview({ totalCount: data.getProductReviews.totalCount, rating: rating / qtyRate }));
        }
    }, [data]);

    let review = {};
    review = data && data.getProductReviews ? data.getProductReviews : {
        items: [],
        totalCount: 0,
    };

    return (
        <>
            <AddReviewDialog
                open={openReview}
                setOpen={handleOpenReview}
                {...props}
            />
            <Toast
                open={showMessage}
                setOpen={setShowMessage}
                message={props.t('product:addRateSuccess')}
            />
            <div className={styles.body}>
                <div className={styles.titleContainer}>
                    <div className={styles.titlePriceContainer}>
                        <Typography
                            variant="span"
                            type="bold"
                            letter="uppercase"
                            className={classNames(
                                'clear-margin-padding',
                                styles.title,
                            )}
                        >
                            {props.t('product:customerReview')}
                        </Typography>
                        <Typography
                            type="regular"
                            variant="p"
                            letter="capitalize"
                            className="clear-margin-padding"
                        >
                            {(review && review.totalCount) || 0}
                            {' '}
                            {props.t('produc:review')}
                        </Typography>
                    </div>
                    <div className={styles.shareContainer}>
                        <Button
                            onClick={() => setOpenReview(true)}
                            variant="outlined"
                        >
                            {props.t('product:writeReview')}
                        </Button>
                    </div>
                </div>
                <div className={styles.reviewContainer}>
                    {
                        review && review.items.map((item, index) => (
                            <CustomerReview key={index} {...item} />
                        ))
                    }
                    <div className={styles.btnLoadReview}>
                        {
                            review && review.totalCount > review.items.length
                            && (
                                <Button
                                    variant="text"
                                    onClick={handleLoad}
                                    disabled={loading || loadMore}
                                >
                                    <Typography
                                        variant="span"
                                        type="regular"
                                        letter="capitalize"
                                    >
                                        {loadMore || loading
                                            ? 'Loading ...'
                                            : props.t('product:moreReview')}
                                    </Typography>
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};