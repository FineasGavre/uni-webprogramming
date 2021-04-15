<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Multimedia File Manager</title>

    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/stylesheets/genres.css"/>
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
                                Multimedia File Manager
                            </h3>
                        </div>
                        <div class="ml-4 mt-2 flex-shrink-0">
                            <a type="button" href="/genres"
                                    class="disabled:bg-gray-600 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Genres
                            </a>
                            <a type="button" href="/files"
                               class="disabled:bg-gray-600 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Files
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="/assets/scripts/display_genres.js"></script>
</body>
</html>