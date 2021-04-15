<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = new mysqli("localhost", "root", "", "ubbdb");
    if ($conn->connect_error) {
        die("Connection to MySQL database failed.");
    }

    $condition = '';

    if (isset($_POST['id'])) {
        $condition = " WHERE files.id = " . htmlspecialchars($_POST['id']);
    }

    $result = $conn->query("SELECT ubbdb.files.id, title, format, file_path, g.name, g.id as genre_id FROM ubbdb.files INNER JOIN ubbdb.genres g on files.genre_id = g.id" . $condition);
    $data = array();



    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($data, ['id' => $row['id'], 'genre_id' => $row['genre_id'], 'genre_name' => $row['name'], 'title' => $row['title'], 'format' => $row['format'], 'file_path' => $row['file_path']]);
        }
    }

    $conn->close();

    header('Content-type: application/json');
    echo json_encode(['data' => $data]);
} else {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Files - Multimedia File Manager</title>

        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/assets/stylesheets/files.css"/>
    </head>
    <body>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div class="px-4 py-5 sm:px-6">
                    <div class="bg-white">
                        <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <div class="ml-4 mt-2">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    Files
                                </h3>
                            </div>
                            <div class="ml-4 mt-2 flex-shrink-0">
                                <a type="button" href="/"
                                   class="disabled:bg-gray-600 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Back
                                </a>
                                <button id="add_button" type="button"
                                        class="disabled:bg-gray-600 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Add a new file
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-5 sm:p-6">
                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="mb-8">
                                    <span class="font-medium">Filter by Genre</span>
                                    <select id="genre" name="genre" class="mt-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                        <option value="0">Show all</option>
                                    </select>
                                </div>
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Genre
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Format
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                File Path
                                            </th>
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200" id="table_body">
                                        <tr id="default_row">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                Loading
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" aria-disabled="true" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="/assets/scripts/display_files.js"></script>
    </body>
    </html>
    <?php
}
?>