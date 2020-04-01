const responses = require('./responses');

const getCustomReponse = (url, scenarios) => {
  if (!scenarios || scenarios.length === 0) return null;

  return responses.find(
    response => scenarios.includes(response.code) && response.urls.includes(url)
  );
};

const toQuoteSummary = quote => ({
  id: quote.id,
  scenarios: quote.scenarios,
  quoteNumber: quote.quoteNumber,
  statusCode: quote.statusCode,
  lastModifiedAt: quote.lastModifiedAt,
  customerName: quote.customer && quote.customer.name,
  mobilePhoneDescription: quote.mobilePhone && quote.mobilePhone.serialNo,
});

const removeTrailingSlashes = url => url.replace(/\/+$/, '');

module.exports = {
  toQuoteSummary,
  removeTrailingSlashes,
  getCustomReponse,
};
