const quotes = require('./quotes');

const toSummary = quote => ({
  id: quote.id,
  scenarios: quote.scenarios,
  quoteNumber: quote.quoteNumber,
  statusCode: quote.statusCode,
  lastModifiedAt: quote.lastModifiedAt,
  customerName: quote.customer && quote.customer.name,
  mobilePhoneDescription: quote.mobilePhone && quote.mobilePhone.serialNo,
});

const quotesSummary = quotes.map(toSummary);

module.exports = {
  quotes,
  quotesSummary,
};
