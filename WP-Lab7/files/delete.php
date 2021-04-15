<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = new mysqli("localhost", "root", "", "ubbdb");
    if ($conn->connect_error) {
        die("Connection to MySQL database failed.");
    }

    $id = htmlspecialchars($_POST['id']);
    $stmt = $conn->prepare("DELETE FROM ubbdb.files WHERE id = ?");
    $stmt->bind_param("i", $id);
    $result = $stmt->execute();

    $stmt->close();
    $conn->close();

    header('Content-type: application/json');
    echo json_encode(['result' => $result]);
} else {
    echo 'Invalid method.';
}
