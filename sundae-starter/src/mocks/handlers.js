import { http } from 'msw';
 
export const handlers = [
  // Intercept the "GET /resource" request.
  http.get('http://localhost:3030/scoops', () => {
    return new Response([
        {name: 'Chocolate', imagePath: '/images/chocolate.png'},
        {name: 'Vanilla', imagePath: '/images/vanilla.png'},
    ]);
  })
];