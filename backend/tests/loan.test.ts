import request from 'supertest';
import app from '../app'; // Adjusted path
 // Adjust the import based on your app structure

describe('Loan API', () => {
    let loanId: number; // Variable to store the ID of the created loan for further tests
    // Variable to store the ID of the created loan for further tests

  it('should return all loans', async () => {
    const res = await request(app).get('/loans');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new loan', async () => {
    const res = await request(app)
      .post('/loans')
      .send({ amount: 1000, interestRate: 5 });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.amount).toBe(1000);
    expect(res.body.interestRate).toBe(5);
    
    loanId = res.body.id; // Store the ID for later tests
  });

  it('should get a loan by ID', async () => {
    const res = await request(app).get(`/loans/${loanId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', loanId);
    expect(res.body).toHaveProperty('amount');
    expect(res.body).toHaveProperty('interestRate');
  });

  it('should update an existing loan', async () => {
    const res = await request(app)
      .put(`/loans/${loanId}`)
      .send({ amount: 1200, interestRate: 4.5 });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', loanId);
    expect(res.body.amount).toBe(1200);
    expect(res.body.interestRate).toBe(4.5);
  });

  it('should delete a loan', async () => {
    const res = await request(app).delete(`/loans/${loanId}`);
    expect(res.status).toBe(204); // No Content status

    // Verify that the loan is deleted
    const getRes = await request(app).get(`/loans/${loanId}`);
    expect(getRes.status).toBe(404); // Not Found status
  });

  it('should return 404 for non-existent loan', async () => {
    const res = await request(app).get('/loans/999999'); // Assuming this ID does not exist
    expect(res.status).toBe(404);
  });

  // Add more tests for other edge cases or functionality if needed...
});
