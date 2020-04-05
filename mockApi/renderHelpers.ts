import responses from './responses';

export const getCustomReponse = (url, scenarios) => {
  if (!scenarios || scenarios.length === 0) return null;

  return responses.find(
    response => scenarios.includes(response.code) && response.urls.includes(url)
  );
};

export const toQuoteSummary = quote => ({
  id: quote.id,
  scenarios: quote.scenarios,
  quoteNumber: quote.quoteNumber,
  statusCode: quote.statusCode,
  lastModifiedAt: quote.lastModifiedAt,
  customerName: quote.customer && quote.customer.name,
  mobilePhoneDescription: quote.mobilePhone && quote.mobilePhone.serialNo,
});

export const removeTrailingSlashes = url => url.replace(/\/+$/, '');

