const { expect } = require('chai');
const sinon = require('sinon');
const dbConnection = require('../dbConnection');
const {
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../tasks');

describe('Task API Tests', () => {
  let dbStub;

  before(() => {
    // Stubbing the query method of dbConnection
    dbStub = sinon.stub(dbConnection, 'query');
  });

  after(() => {
    // Restoring the stub after tests
    dbStub.restore();
  });

  describe('getTaskById', () => {
    it('should return a task by ID for a specific user', (done) => {
      // Mock data for the query result
      const mockTask = { taskId: 1, description: 'Task 1' };
      // Stubbing the query method to return the mockTask
      dbStub.yields(null, [mockTask]);

      // Calling the API function
      getTaskById(1, 1, (err, task) => {
        expect(err).to.be.null;
        expect(task).to.deep.equal(mockTask);
        done();
      });
    });
  });

  describe('createTask', () => {
    it('should create a new task for a specific user', (done) => {
      // Mock data for the task to be created
      const newTask = { description: 'New Task', userId: 1 };
      // Stubbing the query method to return a successful insertion
      dbStub.yields(null, { insertId: 1 });

      // Calling the API function
      createTask(1, newTask, (err, task) => {
        expect(err).to.be.null;
        expect(task).to.deep.equal({ id: 1, ...newTask });
        done();
      });
    });
  });

  describe('updateTask', () => {
    it('should update a task by ID for a specific user', (done) => {
      // Mock data for the updated task
      const updatedTask = { description: 'Updated Task' };
      // Stubbing the query method to return a successful update
      dbStub.yields(null, { affectedRows: 1 });

      // Calling the API function
      updateTask(1, updatedTask, (err, result) => {
        expect(err).to.be.null;
        expect(result).to.have.property('affectedRows', 1);
        done();
      });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by ID for a specific user', (done) => {
      // Stubbing the query method to return a successful deletion
      dbStub.yields(null, { affectedRows: 1 });

      // Calling the API function
      deleteTask(1, 1, (err, result) => {
        expect(err).to.be.null;
        expect(result).to.have.property('affectedRows', 1);
        done();
      });
    });
  });
});
