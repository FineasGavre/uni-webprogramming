<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = new mysqli("localhost", "root", "", "ubbdb");
    if ($conn->connect_error) {
        die("Connection to MySQL database failed.");
    }

    $id = htmlspecialchars($_POST['id']);
    $genre = htmlspecialchars($_POST['genre']);
    $title = htmlspecialchars($_POST['title']);
    $format = htmlspecialchars($_POST['format']);
    $file_path = htmlspecialchars($_POST['file_path']);

    $stmt = $conn->prepare("UPDATE ubbdb.files SET title = ?, format = ?, file_path = ?, genre_id = ? WHERE id = ?");
    $stmt->bind_param("sssii", $title, $format, $file_path, $genre, $id);
    $result = $stmt->execute();

    $stmt->close();
    $conn->close();

    header('Content-type: application/json');
    echo json_encode([ 'result' => $result ]);
} else {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Update File - Multimedia File Manager</title>

        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/assets/stylesheets/files.css"/>
    </head>
    <body>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div class="max-w-5xl mx-auto">
            <div id="error_alert" class="rounded-md bg-red-50 p-4 mb-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">
                            An error occured while attempting to update the file. Please try again!
                        </h3>
                    </div>
                </div>
            </div>
            <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div class="px-4 py-5 sm:px-6">
                    <div class="bg-white">
                        <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <div class="ml-4 mt-2">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    Update a file
                                </h3>
                            </div>
                            <div class="ml-4 mt-2 flex-shrink-0">
                                <button id="cancel_button" type="button" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Cancel
                                </button>
                                <button id="save_button" type="button" class="disabled:bg-gray-600 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-5 sm:p-6">
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <div class="mt-1">
                            <input type="text" name="title" id="title" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="ExampleFile">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="format" class="block text-sm font-medium text-gray-700">Format</label>
                        <div class="mt-1">
                            <input type="text" name="format" id="format" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="MP3">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="file_path" class="block text-sm font-medium text-gray-700">File Path</label>
                        <div class="mt-1">
                            <input type="text" name="file_path" id="file_path" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="C:/Files/examplefile.mp3">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
                        <div class="mt-1">
                            <select id="genre" name="genre" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">

                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="/assets/scripts/update_files.js"></script>
    </body>
    </html>
    <?php
}
?>