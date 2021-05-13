const listNestedFiles = require('@src/listNestedFiles');
describe('listNestedFiles', () => {
  it('should list all files from a directories', (done) => {
    listNestedFiles('.',
        (err, files) => {
          expect(err).toEqual(null);
          expect(files).toContain('test/listNestedFiles.spec.js');
          done();
        });
  });
});
