'use strict';

const CoinGeckoUtils = require('@utils/CoinGeckoUtils');
const { coin: CoinModel } = require('@models/index');

const CurrencyServices = module.exports;

CurrencyServices.getCoinsList = async () => {
  const coinsList = await CoinGeckoUtils.getAllCoins();
  return coinsList;
};

CurrencyServices.createCoin = async (user, coinId) => {
  const coinDetail = await CoinGeckoUtils.getCoinDetail(coinId);

  const { preferred_currency: userPreferredCurrency } = user;
  const {
    symbol, name, last_updated: lastUpdated, market_data: { current_price: currentPrice }, image
  } = coinDetail;

  const preferredCurrentPrice = currentPrice[userPreferredCurrency];

  const createdCoin = await CoinModel.create({
    user_id: user.id, symbol, price: preferredCurrentPrice, name, image: JSON.stringify(image), last_updated: lastUpdated
  });

  return createdCoin;
};
