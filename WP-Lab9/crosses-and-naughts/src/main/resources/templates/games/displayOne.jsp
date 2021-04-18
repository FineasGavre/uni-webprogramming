<%--@elvariable id="game" type="ro.ubbcluj.stud.fineasgavre.crossesandnaughts.Entity.Game"--%>
<%--@elvariable id="board" type="ro.ubbcluj.stud.fineasgavre.crossesandnaughts.GameLogic.GameBoard"--%>
<%--@elvariable id="turnToMove" type="java.lang.Boolean"--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Game ${game.id} | Crosses &amp; Naughts</title>

    <%@ include file="../includes/stylingimports.html" %>
    <style>
        .rectangle {
            height: 200px;
            width: 200px;
            border: black 2px solid;
            font-size: 100px;
        }
    </style>
</head>
<body>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
            <div class="bg-white shadow sm:rounded-lg mt-3">
                <div class="px-4 py-5 sm:p-6">
                    <div class="sm:flex sm:items-start sm:justify-between">
                        <div>
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                <c:choose>
                                    <c:when test="${game.gameStatus.name().equals(\"INGAME\")}">
                                        <span class="font-bold">${game.ownerUser.username}</span> vs. <span class="font-bold">${game.joinerUser.username}</span>
                                    </c:when>
                                    <c:when test="${game.gameStatus.name().equals(\"WAITING\")}">
                                        Waiting for another player to join.
                                    </c:when>
                                    <c:when test="${game.gameStatus.name().equals(\"FINISHED\")}">
                                        <c:choose>
                                            <c:when test="${game.winner.name().equals(\"DRAW\")}">
                                                Game has ended in a draw.
                                            </c:when>
                                            <c:when test="${game.winner.name().equals(\"OWNER\")}">
                                                <span class="font-bold">${game.ownerUser.username}</span> won the game!
                                            </c:when>
                                            <c:when test="${game.winner.name().equals(\"JOINER\")}">
                                                <span class="font-bold">${game.joinerUser.username}</span> won the game!
                                            </c:when>
                                        </c:choose>
                                    </c:when>
                                </c:choose>
                            </h3>
                            <c:choose>
                                <c:when test="${game.gameStatus.name().equals(\"INGAME\") && game.playerTurn.name().equals(\"OWNER\")}">
                                    <div class="mt-2 max-w-xl text-sm text-gray-500">
                                        <p>
                                            It is <span class="font-bold">${game.ownerUser.username}'s turn to move.</span>
                                        </p>
                                    </div>
                                </c:when>
                                <c:when test="${game.gameStatus.name().equals(\"INGAME\") && game.playerTurn.name().equals(\"JOINER\")}">
                                    <div class="mt-2 max-w-xl text-sm text-gray-500">
                                        <p>
                                            It is <span class="font-bold">${game.joinerUser.username}'s</span> turn to move.
                                        </p>
                                    </div>
                                </c:when>
                            </c:choose>
                        </div>
                        <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                            <a href="${pageContext.request.contextPath}/games/" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                                View all games
                            </a>
                            <a href="${pageContext.request.contextPath}/games/${game.id}" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                Refresh page
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 mt-3 gap-y-3">
                <c:forEach var="i" begin="0" end="${board.boardList.size() - 1}">
                    <c:choose>
                        <c:when test="${board.boardList.get(i).name().equals(\"CROSS\")}">
                            <div class="rectangle justify-self-center flex justify-center items-center">
                                X
                            </div>
                        </c:when>
                        <c:when test="${board.boardList.get(i).name().equals(\"NAUGHT\")}">
                            <div class="rectangle justify-self-center flex justify-center items-center">
                                O
                            </div>
                        </c:when>
                        <c:when test="${board.boardList.get(i).name().equals(\"EMPTY\") && game.gameStatus.name().equals(\"INGAME\") && turnToMove}">
                            <form action="${pageContext.request.contextPath}/games/${game.id}/move" method="post">
                                <input type="hidden" name="position" value="${i}">
                                <button type="submit" class="rectangle justify-self-center flex justify-center items-center"></button>
                            </form>
                        </c:when>
                        <c:otherwise>
                            <div class="rectangle justify-self-center flex justify-center items-center"></div>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </div>
        </div>
    </div>
</body>
</html>