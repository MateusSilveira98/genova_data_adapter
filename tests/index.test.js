const service = require('../services/index')

test('Should show JSON', () => {
    expect(service.getEmpresas().length > 0).toBe(true);
});