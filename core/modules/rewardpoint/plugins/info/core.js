/* eslint-disable no-nested-ternary */
import { getRewardPoint } from '../../services/graphql';

export default ({ Content, t }) => {
    const { data, loading, error } = getRewardPoint({
        pageSize: 1,
        currentPage: 1,
    });
    return <Content t={t} data={data} loading={loading} error={error} />;
};