<?php
$db_server = "mydatabase.database.windows.net"; // TO BE UPDATED
$db_name = "mydatabase"; // TO BE UPDATED
$connectionString = "sqlsrv:server=$db_server;Database=$db_name;Authentication=ActiveDirectoryMsi;"; // USE SYSTEM-ASSIGNED MANAGED IDENTITY
try {
        $conn_start_time = microtime(TRUE);
        $conn = new PDO($connectionString);
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        $conn_log_time = (microtime(TRUE) - $conn_start_time)*1000;
        $sql_select1 = "SELECT FirstName, LastName, CompanyName from SalesLT.Customer;";
        $sql_select2 = "SELECT c.FirstName, c.LastName, c.CompanyName, a.AddressType FROM SalesLT.Customer c, SalesLT.CustomerAddress a where c.CustomerID = a.CustomerID;";
        $query_start_time = microtime(TRUE);
        $stmt1 = $conn->query($sql_select1);
        $stmt2 = $conn->query($sql_select2);
        $query_log_time = (microtime(TRUE) - $query_start_time)*1000;
        echo $conn_log_time."\n".$query_log_time."\n";
        $stmt1 = null;
        $stmt2 = null;
        $conn = null;
 }
 catch(Exception $e){
        die(var_dump($e));
 }
?>
