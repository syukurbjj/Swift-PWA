const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const { gql } = require('apollo-server-express');
const cart = require('./cart');

const checkoutSchema = makeExecutableSchema({
    typeDefs: gql`
        ${cart}

        type SetShippingAddressesOnCartOutput {
            cart: Cart!
        }

        type SetBillingAddressOnCartOutput {
            cart: Cart!
        }

        type SetGuestEmailOnCartOutput {
            cart: Cart!
        }

        type SetShippingMethodsOnCartOutput {
            cart: Cart!
        }

        type SetPaymentMethodOnCartOutput {
            cart: Cart!
        }

        type Order {
            order_id: String @deprecated(reason: "The order_id field is deprecated, use order_number instead.")
            order_number: String!
        }

        type PlaceOrderOutput {
            order: Order!
        }

        type ApplyCouponToCartOutput {
            cart: Cart!
        }

        type RemoveCouponFromCartOutput {
            cart: Cart
        }

        input CartAddressInput {
            city: String!
            company: String
            country_code: String!
            firstname: String!
            lastname: String!
            postcode: String
            region: String
            save_in_address_book: Boolean
            street: [String]!
            telephone: String!
        }

        input ShippingAddressInput {
            address: CartAddressInput
            customer_address_id: Int
            customer_notes: String
        }

        input SetShippingAddressesOnCartInput {
            cart_id: String!
            shipping_addresses: [ShippingAddressInput]!
        }

        input SetBillingAddressOnCartInput {
            billing_address: BillingAddressInput!
            cart_id: String!
        }

        input BillingAddressInput {
            address: CartAddressInput
            customer_address_id: Int
          
            """Set billing address same as shipping"""
            same_as_shipping: Boolean
          
            """Deprecated: use same_as_shipping field instead"""
            use_for_shipping: Boolean
        }

        input SetGuestEmailOnCartInput {
            cart_id: String!
            email: String!
        }

        input ShippingMethodInput {
            carrier_code: String!
            method_code: String!
        }

        input SetShippingMethodsOnCartInput {
            cart_id: String!
            shipping_methods: [ShippingMethodInput]!
        }

        input AuthorizenetInput {
            """The last four digits of the credit or debit card"""
            cc_last_4: Int!
          
            """Authorize.Net's description of the transaction request"""
            opaque_data_descriptor: String!
          
            """The nonce returned by Authorize.Net"""
            opaque_data_value: String!
        }

        input BraintreeInput {
            """
            Contains a fingerprint provided by Braintree JS SDK and should be sent with
            sale transaction details to the Braintree payment gateway. Should be specified
            only in a case if Kount (advanced fraud protection) is enabled for Braintree
            payment integration.
            """
            device_data: String
          
            """
            States whether an entered by a customer credit/debit card should be tokenized
            for later usage. Required only if Vault is enabled for Braintree payment integration.
            """
            is_active_payment_token_enabler: Boolean!
          
            """
            The one-time payment token generated by Braintree payment gateway based on
            card details. Required field to make sale transaction.
            """
            payment_method_nonce: String!
        }

        input PaymentMethodInput {
            """Payment method code"""
            code: String!
          
            """Purchase order number"""
            purchase_order_number: String
        }

        input SetPaymentMethodOnCartInput {
            cart_id: String!
            payment_method: PaymentMethodInput!
        }

        input PlaceOrderInput {
            cart_id: String!
        }

        input ApplyCouponToCartInput {
            cart_id: String!
            coupon_code: String!
        }

        input RemoveCouponFromCartInput {
            cart_id: String!
        }

        type Mutation {
            setBillingAddressOnCart(input: SetBillingAddressOnCartInput): SetBillingAddressOnCartOutput
            setGuestEmailOnCart(input: SetGuestEmailOnCartInput): SetGuestEmailOnCartOutput
            setPaymentMethodOnCart(input: SetPaymentMethodOnCartInput): SetPaymentMethodOnCartOutput
            setShippingAddressesOnCart(input: SetShippingAddressesOnCartInput): SetShippingAddressesOnCartOutput
            setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput): SetShippingMethodsOnCartOutput
            placeOrder(input: PlaceOrderInput): PlaceOrderOutput
            applyCouponToCart(input: ApplyCouponToCartInput): ApplyCouponToCartOutput
            removeCouponFromCart(input: RemoveCouponFromCartInput): RemoveCouponFromCartOutput
        }
    `,
});

addMockFunctionsToSchema({ schema: checkoutSchema });

module.exports = checkoutSchema;