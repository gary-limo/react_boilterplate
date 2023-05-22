import React, { useCallback, useMemo, useState } from 'react';

const Example = () => {
  const [tableData, setTableData] = useState(data);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSaveRowEdits = async ({ row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const updatedData = tableData.map((item, index) =>
        index === row.index ? values : item
      );
      setTableData(updatedData);
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback((row) => {
    if (!window.confirm(`Are you sure you want to delete ${row.firstName}?`)) {
      return;
    }
    const updatedData = tableData.filter((item, index) => index !== row.index);
    setTableData(updatedData);
  }, [tableData]);

  const getCommonEditInputProps = useCallback(
    (cell) => {
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
      };
    },
    [validationErrors]
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
          {tableData.map((row, rowIndex) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.accessorKey}>
                  <input
                    type="text"
                    value={row[column.accessorKey]}
                    {...getCommonEditInputProps({
                      id: column.accessorKey,
                      column,
                    })}
                    onChange={(event) => {
                      const { value } = event.target;
                      setTableData((prevData) => {
                        const updatedData = [...prevData];
                        updatedData[rowIndex][column.accessorKey] = value;
                        return updatedData;
                      });
                    }}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => handleSaveRowEdits({ row, values: row })}>
                  Save
                </button>
                <button onClick={handleCancelRowEdits}>Cancel</button>
                <button onClick={() => handleDeleteRow({ index: rowIndex, ...row })}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const data = [
  { id: 1, firstName: 'John' },
  { id: 2, firstName: 'Jane' },
  { id: 3, firstName: 'Mike' },
];

const validateRequired = (value) => !!value.length;

export default Example;
