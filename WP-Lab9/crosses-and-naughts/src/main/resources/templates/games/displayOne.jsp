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
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <div class="sm:flex sm:items-start sm:justify-between">
                        <div>
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                <c:choose>
                                    <c:when test="${game.gameStatus.name().equals(\"INGAME\")}">
                                        ${game.ownerUser.username} vs. ${game.joinerUser.username}
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
                                                ${game.ownerUser.username} won the game!
                                            </c:when>
                                            <c:when test="${game.winner.name().equals(\"JOINER\")}">
                                                ${game.joinerUser.username} won the game!
                                            </c:when>
                                        </c:choose>
                                    </c:when>
                                </c:choose>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3">
                <c:forEach var="i" begin="0" end="${board.boardList.size() - 1}">
                    <c:choose>
                        <c:when test="${board.boardList.get(i).name().equals(\"CROSS\")}">
                            <div class="rectangle">
                                X
                            </div>
                        </c:when>
                        <c:when test="${board.boardList.get(i).name().equals(\"NAUGHT\")}">
                            <div class="rectangle">
                                O
                            </div>
                        </c:when>
                        <c:when test="${board.boardList.get(i).name().equals(\"EMPTY\") && game.gameStatus.name().equals(\"INGAME\") && turnToMove}">
                            <form action="${pageContext.request.contextPath}/games/${game.id}/move" method="post">
                                <input type="hidden" name="position" value="${i}">
                                <button type="submit" class="rectangle"></button>
                            </form>
                        </c:when>
                        <c:otherwise>
                            <div class="rectangle"></div>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </div>
        </div>
    </div>
</body>
</html>