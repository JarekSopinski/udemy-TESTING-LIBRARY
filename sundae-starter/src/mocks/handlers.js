import { http, HttpResponse, delay } from 'msw';

export const handlers = [

  // Intercept the "GET /scoops" request.
  http.get('http://localhost:3030/scoops', () => {
    return HttpResponse.json([
      { name: 'Chocolate', imagePath: '/images/chocolate.png' },
      { name: 'Vanilla', imagePath: '/images/vanilla.png' },
    ]);
  }),

  // Intercept the "GET /toppings" request.
  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      { name: 'Cherries', imagePath: '/images/cherries.png' },
      { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
      { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' }
    ])
  }),

  http.post('http://localhost:3030/order', async () => {
    // add a 100ms pause here to give the test a change to see the 'loading' state
    await delay(100);
    return HttpResponse.json({
      orderNumber: 123455676
    }, { status: 201 });
  })
];