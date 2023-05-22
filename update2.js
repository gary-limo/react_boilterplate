import React, { useCallback, useMemo, useState } from 'react';

const Example = () => {
  const [tableData, setTableData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSaveRowEdits = useCallback(
    (rowIndex) => {
      if (!Object.keys(validationErrors).length) {
        setEditingRow(null);
        setTableData((prevData) => {
          const updatedData = [...prevData];
          updatedData[rowIndex].isEditing = false;
          return updatedData;
        });
        setFilteredData((prevData) => {
          const updatedData = [...prevData];
          updatedData[rowIndex].isEditing = false;
          return updatedData;
        });
      }
    },
    [validationErrors]
  );

  const handleCancelRowEdits = useCallback(
    (rowIndex) => {
      setEditingRow(null);
      setTableData((prevData) => {
        const updatedData = [...prevData];
        updatedData[rowIndex].isEditing = false;
        return updatedData;
      });
      setFilteredData((prevData) => {
        const updatedData = [...prevData];
        updatedData[rowIndex].isEditing = false;
        return updatedData;
      });
      setValidationErrors({});
    },
    []
  );

  const handleEditRow = useCallback(
    (rowIndex) => {
      setEditingRow(rowIndex);
      setTableData((prevData) => {
        const updatedData = [...prevData];
        updatedData[rowIndex].isEditing = true;
        return updatedData;
      });
      setFilteredData((prevData) => {
        const updatedData = [...prevData];
        updatedData[rowIndex].isEditing = true;
        return updatedData;
      });
    },
    []
  );

  const handleDeleteRow = useCallback(
    (rowIndex) => {
      if (!window.confirm(`Are you sure you want to delete ${tableData[rowIndex].firstName}?`)) {
        return;
      }
      setTableData((prevData) => {
        const updatedData = [...prevData];
        updatedData.splice(rowIndex, 1);
        return updatedData;
      });
      setFilteredData((prevData) => {
        const updatedData = [...prevData];
        updatedData.splice(rowIndex, 1);
        return updatedData;
      });
    },
    [tableData]
  );

  const handleSearch = useCallback(
    (event) => {
      const { value } = event.target;
      setSearchQuery(value);
      const filteredData = tableData.filter(
        (row) =>
          row.id.toString().includes(value) ||
          row.firstName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredData);
    },
    [tableData]
  );

  const handleInputChange = useCallback(
    (event, rowIndex, columnKey) => {
      const { value } = event.target;
      setTableData((prevData) => {
        const updatedData = [...prevData];
        updatedData[rowIndex][columnKey] = value;
        return updatedData;
      });
      setFilteredData((prevData) => {
        const updatedData = [...prevData];
        updatedData[rowIndex][columnKey] = value;
        return updatedData;
      });
    },
    []
  );

  const getCommonEditInputProps = useCallback(
    (cell, rowIndex) => {
      return {
        className: validationErrors[cell.id] ? 'error' : '',
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors((prevState) => ({
              ...prevState,
              [cell.id]: `${cell.column.header} is required`,
            }));
          } else {
            setValidationErrors((prevState) => ({
              ...prevState,
              [cell.id]: undefined,
            }));
          }
        },
        value: tableData[rowIndex][cell.column.accessorKey] || '',
        onChange: (event) => handleInputChange(event, rowIndex, cell.column.accessorKey),
      };
    },
    [tableData, handleInputChange, validationErrors]
  );

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID', size: 80 },
      { accessorKey: 'firstName', header: 'First Name', size: 140 },
    ],
    []
  );

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessorKey}>{column.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.accessorKey}>
                  {row.isEditing ? (
                    <input
                      type="text"
                      {...getCommonEditInputProps({ id: column.accessorKey, column }, rowIndex)}
                    />
                  ) : (
                    row[column.accessorKey]
                  )}
                </td>
              ))}
              <td>
                {row.isEditing ? (
                  <>
                    <button onClick={() => handleSaveRowEdits(rowIndex)}>Save</button>
                    <button onClick={() => handleCancelRowEdits(rowIndex)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
                    <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const data = [
  { id: 1, firstName: 'John', isEditing: false },
  { id: 2, firstName: 'Jane', isEditing: false },
  { id: 3, firstName: 'Mike', isEditing: false },
];

const validateRequired = (value) => !!value.length;

export default Example;
