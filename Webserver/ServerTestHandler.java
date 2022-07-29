import java.io.IOException;
import java.io.OutputStream;

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
    
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
    httpExchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    httpExchange.sendResponseHeaders(200, htmlResponse.length);
    OutputStream outputStream = httpExchange.getResponseBody();
    outputStream.write(htmlResponse);
    outputStream.flush();
    outputStream.close();
  }
}

