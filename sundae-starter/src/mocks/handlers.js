import { http, HttpResponse } from 'msw';
 
export const handlers = [

  // Intercept the "GET /scoops" request.
  http.get('http://localhost:3030/scoops', () => {
    return HttpResponse.json([
        {name: 'Chocolate', imagePath: '/images/chocolate.png'},
        {name: 'Vanilla', imagePath: '/images/vanilla.png'},
    ]);
  }),

  // Intercept the "GET /toppings" request.
  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      {name: 'Cherries', imagePath: '/images/cherries.png'},
      {name: 'M&Ms', imagePath: '/images/m-and-ms.png'},
      {name: 'Hot fudge', imagePath: '/images/hot-fudge.png'}
    ])
  })
];