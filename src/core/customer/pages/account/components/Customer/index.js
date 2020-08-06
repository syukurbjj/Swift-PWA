// Library
import React from 'react';

import { modules } from '@config';
import gqlService from '../../../../services/graphql';

const Customer = (props) => {
    const {
        t, Skeleton, CustomerView, storeConfig, isLogin,
    } = props;
    let userData = {};
    let wishlist = [];
    const { data, loading, error } = gqlService.getCustomer();
    const { data: customerNotificationList } = gqlService.customerNotificationList();
    const totalUnread = customerNotificationList
        && customerNotificationList.customerNotificationList
        && customerNotificationList.customerNotificationList.totalUnread;

    if (!data || loading || error) return <Skeleton />;
    if (data) {
        userData = data;
        wishlist = data.customer && data.customer.wishlist && data.customer.wishlist.items.map(({ product }) => ({
            ...product,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url,
            price: product.price_range.minimum_price.regular_price.value,
            showWishlistAction: false,
        }));
    }

    const pushIf = (condition, ...elements) => (condition ? elements : []);

    const menu = [
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/customer/account/profile', title: t('customer:menu:myAccount') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        ...pushIf(wishlist.length <= 0, {
            href: '/wishlist', title: 'Wishlist',
        }),
        ...pushIf(modules.giftcard.enabled, {
            href: '/awgiftcard/card', title: 'Gift Card',
        }),
        ...pushIf(modules.storecredit.enabled, {
            href: '/customer/account/storecredit', title: t('customer:menu:storeCredit'),
        }),
        { href: '/inboxnotification/notification', title: t('notification:notification') },
        { href: '/customer/setting', title: t('customer:menu:setting') },
        { href: '/rma/customer', title: t('customer:menu:return') },
    ];

    return (
        <CustomerView
            t={t}
            modules={modules}
            menu={menu}
            userData={userData}
            totalUnread={totalUnread}
            wishlist={wishlist}
            storeConfig={storeConfig}
            isLogin={isLogin}
        />
    );
};

export default Customer;
