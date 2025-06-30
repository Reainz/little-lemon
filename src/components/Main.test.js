import { updateTimes, initializeTimes } from './Main';
import { fetchAPI } from '../api';

// Mock the API
jest.mock('../api', () => ({
  fetchAPI: jest.fn()
}));

describe('Main component reducer functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initializeTimes', () => {
    test('returns available times for today', () => {
      const mockTimes = ['17:00', '18:00', '19:00', '20:00'];
      fetchAPI.mockReturnValue(mockTimes);

      const result = initializeTimes();

      expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
      expect(result).toEqual(mockTimes);
    });

    test('calls fetchAPI with current date', () => {
      const mockTimes = ['17:00', '18:00'];
      fetchAPI.mockReturnValue(mockTimes);

      initializeTimes();

      // Verify fetchAPI was called with a Date object representing today
      expect(fetchAPI).toHaveBeenCalledTimes(1);
      const calledWith = fetchAPI.mock.calls[0][0];
      expect(calledWith).toBeInstanceOf(Date);
    });
  });

  describe('updateTimes', () => {
    test('returns new available times for UPDATE_TIMES action', () => {
      const mockTimes = ['17:30', '18:30', '19:30'];
      fetchAPI.mockReturnValue(mockTimes);

      const initialState = ['17:00', '18:00'];
      const action = {
        type: 'UPDATE_TIMES',
        date: '2024-12-25'
      };

      const result = updateTimes(initialState, action);

      expect(fetchAPI).toHaveBeenCalledWith(new Date('2024-12-25'));
      expect(result).toEqual(mockTimes);
    });

    test('returns current state for unknown action type', () => {
      const initialState = ['17:00', '18:00'];
      const action = {
        type: 'UNKNOWN_ACTION',
        date: '2024-12-25'
      };

      const result = updateTimes(initialState, action);

      expect(fetchAPI).not.toHaveBeenCalled();
      expect(result).toEqual(initialState);
    });

    test('handles different date formats correctly', () => {
      const mockTimes = ['19:00', '20:00'];
      fetchAPI.mockReturnValue(mockTimes);

      const initialState = [];
      const action = {
        type: 'UPDATE_TIMES',
        date: '2024-01-01'
      };

      const result = updateTimes(initialState, action);

      expect(fetchAPI).toHaveBeenCalledWith(new Date('2024-01-01'));
      expect(result).toEqual(mockTimes);
    });

    test('maintains function purity by not mutating input state', () => {
      const mockTimes = ['21:00', '22:00'];
      fetchAPI.mockReturnValue(mockTimes);

      const initialState = ['17:00', '18:00'];
      const originalState = [...initialState];
      
      const action = {
        type: 'UPDATE_TIMES',
        date: '2024-12-25'
      };

      const result = updateTimes(initialState, action);

      // Original state should not be mutated
      expect(initialState).toEqual(originalState);
      expect(result).not.toBe(initialState);
      expect(result).toEqual(mockTimes);
    });
  });

  describe('reducer behavior', () => {
    test('updateTimes handles missing date gracefully', () => {
      const initialState = ['17:00'];
      const action = {
        type: 'UPDATE_TIMES'
        // missing date property
      };

      const result = updateTimes(initialState, action);

      // Should still call fetchAPI, but with undefined date (which creates an invalid Date)
      expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
      
      // Verify the date passed is invalid (NaN)
      const calledWith = fetchAPI.mock.calls[0][0];
      expect(isNaN(calledWith.getTime())).toBe(true);
    });

    test('fetchAPI is called exactly once per UPDATE_TIMES action', () => {
      const mockTimes = ['17:00'];
      fetchAPI.mockReturnValue(mockTimes);

      const action = {
        type: 'UPDATE_TIMES',
        date: '2024-12-25'
      };

      updateTimes([], action);

      expect(fetchAPI).toHaveBeenCalledTimes(1);
    });

    test('returns different times for different dates', () => {
      // Mock different return values for different calls
      fetchAPI
        .mockReturnValueOnce(['17:00', '18:00'])
        .mockReturnValueOnce(['19:00', '20:00']);

      const action1 = {
        type: 'UPDATE_TIMES',
        date: '2024-12-25'
      };

      const action2 = {
        type: 'UPDATE_TIMES',
        date: '2024-12-26'
      };

      const result1 = updateTimes([], action1);
      const result2 = updateTimes([], action2);

      expect(result1).toEqual(['17:00', '18:00']);
      expect(result2).toEqual(['19:00', '20:00']);
      expect(fetchAPI).toHaveBeenCalledTimes(2);
    });
  });
}); 