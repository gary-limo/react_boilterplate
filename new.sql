CREATE OR REPLACE PROCEDURE Execute_And_Store()
  RETURNS STRING 
  LANGUAGE JAVASCRIPT
  EXECUTE AS CALLER
AS
$$
  var sql_command = `SELECT * FROM your_first_table`;  // Replace with your actual table name
  var stmt = snowflake.createStatement({sqlText: sql_command});
  var res = stmt.execute();

  while (res.next()) 
  {
    var col1 = res.getColumnValue(1);
    var col2 = res.getColumnValue(2);
    var col3 = res.getColumnValue(3);
    var dynamic_sql = res.getColumnValue(4);
    
    // Execute the dynamic SQL
    var dynamic_stmt = snowflake.createStatement({sqlText: dynamic_sql});
    var dynamic_res = dynamic_stmt.execute();

    // Only insert into the second table if the dynamic SQL returned a result
    if (dynamic_res.next()) {
      var dynamic_sql_result = dynamic_res.getColumnValue(1); // Assuming the dynamic SQL returns only one column. Adjust accordingly if it returns more.
      var insert_sql = `INSERT INTO your_second_table (col1, col2, col3, result) VALUES (?, ?, ?, ?)`;
      
      var insert_stmt = snowflake.createStatement({
        sqlText: insert_sql,
        binds: [col1, col2, col3, dynamic_sql_result]
      });
      
      insert_stmt.execute();
    } else {
      return 'The dynamic SQL did not return a result: ' + dynamic_sql;
    }
  }
  return 'Done!';
$$;

CALL Execute_And_Store();
