'use strict';

const CoinGeckoUtils = require('@utils/CoinGeckoUtils');
const { NotFoundError } = require('@utils/ErrorUtils');
const { coin: CoinModel } = require('@models/index');

const CurrencyServices = module.exports;

CurrencyServices.getCoinsList = async () => {
  const coinsList = await CoinGeckoUtils.getAllCoins();
  return coinsList;
};

CurrencyServices.createCoin = async ({ id: userId }, requestCoinId) => {
  const coinDetail = await CoinGeckoUtils.getCoinDetail(requestCoinId);

  const {
    id: coinId, symbol, name, last_updated: lastUpdated, market_data: { current_price: currentPrice }, image
  } = coinDetail;

  const { eur: priceEur, usd: priceUsd, ars: priceArs } = currentPrice;

  const coinToCreate = {
    user_id: userId,
    coin_id: coinId,
    symbol,
    price_eur: priceEur,
    price_usd: priceUsd,
    price_ars: priceArs,
    name,
    image: JSON.stringify(image),
    last_updated: lastUpdated
  };

  const createdCoin = await CoinModel.create(coinToCreate);

  return createdCoin;
};

CurrencyServices.deleteCoin = async ({ user_id: userId }, coinId) => {
  const userCoin = await CoinModel.findOne({ user_id: userId, id: coinId });

  if (!userCoin) throw new NotFoundError('Coin not found');

  return userCoin.destroy();
};
