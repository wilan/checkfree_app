import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class ServerTestHandler implements HttpHandler {
  @Override    
  public void handle(HttpExchange httpExchange) throws IOException {
    System.out.println(httpExchange.getRequestURI().getQuery());
    if ("GET".equals(httpExchange.getRequestMethod())) {
      handleResponse(httpExchange);
    } else {
      throw new UnsupportedOperationException("Only get request are supported");
    }
  }

  private void handleResponse(HttpExchange httpExchange) throws IOException {
    byte[] htmlResponse = "hello".getBytes();
    
    List<String> list = Arrays.asList("Pork", "Beef", "Chicken", "Fish");
    String delim = "-";

    StringBuilder sb = new StringBuilder();

    int i = 0;
    while (i < list.size() - 1)
    {
        sb.append(list.get(i));
        sb.append(delim);
        i++;
    }
    sb.append(list.get(i));

    String res = sb.toString();
    System.out.println(res); 

    byte[] bytearray = res.getBytes();
    System.out.println(Arrays.toString(bytearray));

    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    httpExchange.sendResponseHeaders(200, htmlResponse.length);
    OutputStream outputStream = httpExchange.getResponseBody();
    outputStream.write(bytearray);
    outputStream.flush();
    outputStream.close();
  }
}

