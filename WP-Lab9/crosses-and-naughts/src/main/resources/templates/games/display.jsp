<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Games | Crosses &amp; Naughts</title>

    <%@ include file="../includes/stylingimports.html" %>
</head>
<body>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
            <form action="${pageContext.request.contextPath}/games/create" method="post">
                <div class="bg-white shadow sm:rounded-lg mt-3">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="sm:flex sm:items-start sm:justify-between">
                            <div>
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    Create a new game
                                </h3>
                                <div class="mt-2 max-w-xl text-sm text-gray-500">
                                    <p>
                                        Play your own game of Crosses &amp; Naughts with a friend (or stranger).
                                    </p>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                    Create game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="flex flex-col mt-3">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Game ID
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        State
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Owner
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <%--@elvariable id="games" type="java.lang.Iterable<ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Game>"--%>
                                <c:forEach items="${games}" var="game">
                                    <tr class="bg-white">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${game.id.toString()}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${game.gameStatus.toString()}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${game.ownerUser.username}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <c:choose>
                                                <c:when test="${game.gameStatus.name().equals(\"WAITING\")}">
                                                    <form action="${pageContext.request.contextPath}/games/${game.id}/join" method="post">
                                                        <button type="submit" class="text-indigo-600 hover:text-indigo-900">Join</button>
                                                    </form>
                                                </c:when>
                                                <c:otherwise>
                                                    <a href="${pageContext.request.contextPath}/games/${game.id}" class="text-indigo-600 hover:text-indigo-900">View</a>
                                                </c:otherwise>
                                            </c:choose>

                                        </td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>