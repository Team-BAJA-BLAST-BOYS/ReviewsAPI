// input format
const ingress = [
  "url1.com", "url2.com", "url3.com", "url4.com"
];

// transformation
const photos = ingress.map((url) => ({"url": url}));

// output format
// const photos = [
//   {"url": "url1.com"}
//   {"url": "url2.com"},
//   {"url": "url3.com"},
//   {"url": "url4.com"}
// ]

// what to send to the database
JSON.stringify(photos);