$(document).ready(() => {
    $('#add_button').click(() => {
        window.location = '/genres/create.php'
    })

    requestAllData()
})

function requestAllData() {
    $.ajax({
        type: 'POST',
        url: window.location,
        success: function (data) {
            replaceTableData(data['data'])
        }
    })
}

function requestDeleteOfId(id) {
    $.ajax({
        type: 'POST',
        url: '/genres/delete.php',
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
                    ${entry['genre']}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="requestDeleteOfId(${entry['id']})" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
            </tr>`
}