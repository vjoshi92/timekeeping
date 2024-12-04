import { useState, useCallback } from 'react';
import axios from 'axios'; // Make sure to install axios
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectData } from './yourReduxSlice'; // Adjust the import path as needed

export const useDataManagement = () => {
  const dispatch = useDispatch();
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = useCallback((field, value, rowId) => {
    const updatedData = projectedData.map(row => 
      row.id === rowId 
        ? { ...row, [field]: value }
        : row
    );

    // Dispatch updated data to Redux store
    dispatch(updateProjectData(updatedData));

    // Optional: Post data to backend
    postRowUpdate(rowId, field, value);
  }, [projectedData, dispatch]);

  const postRowUpdate = async (rowId, field, value) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/update-row/${rowId}`, {
        [field]: value
      });

      // Optionally handle successful update
      console.log('Row updated successfully', response.data);
    } catch (err) {
      setError(err);
      console.error('Error updating row:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewRow = async (newRowData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/add-row', newRowData);
      
      // Assuming the response contains the new row with an ID
      const newRow = response.data;
      
      // Update Redux store
      dispatch(updateProjectData([...projectedData, newRow]));
    } catch (err) {
      setError(err);
      console.error('Error adding new row:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (rowId) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/delete-row/${rowId}`);
      
      // Remove row from Redux store
      const updatedData = projectedData.filter(row => row.id !== rowId);
      dispatch(updateProjectData(updatedData));
    } catch (err) {
      setError(err);
      console.error('Error deleting row:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleInputChange, 
    handleAddNewRow, 
    handleDelete, 
    isLoading, 
    error
  };
};