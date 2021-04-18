<%@ page import="java.util.Enumeration" %>
<pre>
<%

    for (Enumeration<String> enumeration = request.getAttributeNames(); enumeration.hasMoreElements();) {
        String attributeName = enumeration.nextElement();
        Object attribute = request.getAttribute(attributeName);
        out.println(attributeName + " -> " + attribute.getClass().getName() + ":" + attribute.toString());
    }

%>
</pre>