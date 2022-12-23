import {Client, createClientForHandler} from '@loopback/testlab';
import {RestServer} from '@loopback/rest';
import {Application} from '@loopback/core';
import createApplication from './helper';

/**
 * Testing overall flow of authentication with kratos
 */
describe('Test Kratos Authorization Flow', () => {
  let app: Application;
  let server: RestServer;
  beforeEach(givenServer);

  it('Should return error 401', async () => {
    await whenIMakeRequestTo(server)
      .get('/test')
      .set('Authorization', 'Bearer plI82adpsadp3pd24BuJ7TF25bNfXte6')
      .expect(401);
  });

  it('Should return error 200', async () => {
    await whenIMakeRequestTo(server)
      .get('/test')
      .set('Authorization', 'Bearer of18SyPbs3Odsa23adfFASDASDA31D12')
      .expect(200);
  });

  function whenIMakeRequestTo(restServer: RestServer): Client {
    return createClientForHandler(restServer.requestHandler);
  }

  async function givenServer() {
    app = createApplication();
    server = await app.getServer(RestServer);
  }
});
