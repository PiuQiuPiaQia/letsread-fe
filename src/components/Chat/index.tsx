import { ProChat } from '@ant-design/pro-chat';
import {getMessages} from '@/services/question';
import { useTheme } from 'antd-style';

const ChatComponent = () => {
  const theme = useTheme();
  const handleStream = async (inputMessages) => {
    try {
      const res = await getMessages(JSON.stringify({ question: inputMessages[inputMessages.length - 1]?.content }))
      // 确保响应体是ReadableStream
      if (!res.body) {
        throw new Error('Response body is not a ReadableStream');
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();

      // 创建一个 ReadableStream
      const readableStream = new ReadableStream({
        async pull(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }
            const chunkText = decoder.decode(value, { stream: true });
            console.log("chunkText:" + chunkText)
            let errorFlag = false//记录是否有报错信息
            const newMessages = chunkText.split('\n\n').map((chunk) => {
              const match = chunk.match(/data: (.*)/);
              if (match) {
                const data = match[1];
                console.log("data:" + data)
                if (data !== '[DONE]') {
                  const data_parse = JSON.parse(data)
                  if ("error" in data_parse) {
                    errorFlag = true
                    return data_parse["error"]
                  } else {
                    return JSON.parse(data);
                  }
                }
              }
              return null;
            }).filter((msg) => msg !== null);
            const newText = errorFlag?JSON.stringify(newMessages):newMessages.map(item => item.content).join('')
            controller.enqueue(encoder.encode(newText));
          }
        },
        cancel(err) {
          console.error('ReadableStream cancelled', err);
          
        },
      });

      return new Response(readableStream);
    } catch (error) {
      console.error("请求或处理流数据时发生错误", error);
      return new Response("Error: " + error);
    }
  };

  return (
    <ProChat
      style={{ height: "100%", width: "100%",paddingBottom:"72px",background: theme.colorBgLayout }}
      request={handleStream}
    />
  );
};

export default ChatComponent;