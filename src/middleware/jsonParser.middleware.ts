export const jsonParserMiddleware = (req, res, next) => {
  const contentType = req.header('content-type');

  if (contentType && contentType.includes('application/json')) {
    let body = '';
    // 监听请求数据流的 data 事件，累积数据
    req.on('data', (chunk) => {
      body += chunk.toString(); // 将数据块转换为字符串并累加
    });

    // 监听 end 事件，表示数据流已结束
    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body); // 手动解析 JSON 数据
        req.body = parsedBody; // 将解析后的 JSON 数据赋值给 req.body
        next();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid JSON format',
          error: err.message,
        });
      }
    });
    return;
  }
  next();
};
