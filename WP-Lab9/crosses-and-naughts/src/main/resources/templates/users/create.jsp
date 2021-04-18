<html>
    <head>
        <title>Sign-Up | Crosses &amp; Naughts</title>
    </head>
    <body>
        <form action="${pageContext.request.contextPath}/user/create" method="post">
            <label>
                Username
                <input name="username" type="text"/>
            </label>
            <label>
                Password
                <input name="password" type="password">
            </label>
            <button type="submit">Create account</button>
        </form>
    </body>
</html>