import request from 'supertest';
import app from '../../../../src/app';
// import { uploadFile } from '../../../../src/services/upload';

const testFileName = 'test_filename.txt';
// const testFileBody = 'testFileBody';

describe('POST /upload', () => {
  it('returns error for no filename ', async () => {
    await request(app)
      .post('/api/deduction-files')
      .send()
      .expect(500);
  });

  it('returns error for no filebody ', async () => {
    await request(app)
      .post('/api/deduction-files')
      .accept('application/json')
      .send({ filename: testFileName })
      .expect(500);
  });

  /* it('returns 200 for created  file ', async () => {
    const mock = jest.spyOn(uploadFile, 'uploadFile');
    mock.mockReturnValue(Promise.resolve({ returnCode: 200, filename: 'abc123' }));

    expect(await request(app)
      .post('/api/deductions/upload')
      .set('Accept', 'application/json')
      .send({ filename: testFileName, filebody: testFileBody }))
      .toEqual(expect.objectContaining({ text: '{"returnCode":200,"filename":"abc123"}' }));
  }); */
});
