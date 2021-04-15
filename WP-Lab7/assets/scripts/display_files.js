let tableData = []
const genreInput = $('#genre')

$(document).ready(() => {
    $('#add_button').click(() => {
        window.location = '/files/create.php'
    })

    $.ajax({
        type: 'POST',
        url: '/genres/index.php',
        success: function (data) {
            data['data'].forEach((elem) => {
                genreInput.append(`
                    <option value="${elem.id}">${elem.genre}</option>
                `)
            })

            pullFromLocalStorage()
            handleGenreChange()
        }
    })

    genreInput.change(handleGenreChange)

    requestAllData()
})

function requestAllData() {
    $.ajax({
        type: 'POST',
        url: window.location,
        success: function (data) {
            tableData = data['data']
            replaceTableData(tableData)
        }
    })
}

function pullFromLocalStorage() {
    if (localStorage.getItem('filter_id') != null) {
        genreInput.val(localStorage.getItem('filter_id'))
    } else {
        genreInput.val(0)
    }
}

function handleGenreChange() {
    const val = genreInput.val()
    localStorage.setItem('filter_id', val)

    if (Number(val) === 0) {
        replaceTableData(tableData)
    } else {
        replaceTableData(tableData.filter((value) => {
            return value['genre_id'] === val
        }))
    }
}

function requestDeleteOfId(id) {
    $.ajax({
        type: 'POST',
        url: '/files/delete.php',
        data: {
            id
        },
        success: function (data) {
            if (data['result']) {
                requestAllData()
            }
        }
    })
}

function requestEditOfId(id) {
    window.location = '/files/update.php?id=' + id;
}

function replaceTableData(data) {
    const tableBody = $('#table_body');

    tableBody.empty()
    data.forEach((elem) => {
        tableBody.append(createTableRowFromEntry(elem))
    })
}

function createTableRowFromEntry(entry) {
    return `<tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${entry['title']}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${entry['genre_name']}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${entry['format']}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${entry['file_path']}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="requestEditOfId(${entry['id']})" class="mr-3 text-blue-600 hover:text-blue-900">Edit</button>
                    <button onclick="requestDeleteOfId(${entry['id']})" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
            </tr>`
}