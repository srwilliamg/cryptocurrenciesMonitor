'use strict';

const CoinGeckoUtils = require('@utils/CoinGeckoUtils');
const { NotFoundError } = require('@utils/ErrorUtils');
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
    id, symbol, name, last_updated: lastUpdated, market_data: { current_price: currentPrice }, image
  } = coinDetail;

  const preferredCurrentPrice = currentPrice[userPreferredCurrency];

  const createdCoin = await CoinModel.create({
    user_id: user.id, coin_id: id, symbol, price: preferredCurrentPrice, name, image: JSON.stringify(image), last_updated: lastUpdated
  });

  return createdCoin;
};

CurrencyServices.deleteCoin = async ({ user_id: userId }, coinId) => {
  const userCoin = await CoinModel.findOne({ user_id: userId, id: coinId });

  if (!userCoin) throw new NotFoundError('Coin not found');

  return userCoin.destroy();
};
