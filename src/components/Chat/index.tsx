import { ProChat, ProChatInstance  } from '@ant-design/pro-chat';
import {getMessages} from '@/services/question';
import { useTheme } from 'antd-style';
import { useRef } from 'react';
import { Dropdown,MenuProps,Space} from 'antd';
import { useLocation } from 'react-router-dom';
interface menuType{
  key:string,
  label:string
}

const ChatComponent = () => {
  const theme = useTheme();
  // const [items,setItems] = useState<MenuProps['items']>([])
  //ref获取
  const proChatRef = useRef<ProChatInstance>();
  //获取url中的paperid参数
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paperId = params.get('paper_id');
  console.log("location.search:" + JSON.stringify(location.search) +"     paperId:" + paperId)

  // useEffect(()=>{
  //   //需要将请求包装成方法
  //   async function getInitMess(){

  //     const initMessage = await getInitMessages()
  //     const messages = initMessage.tips.map((item,index)=>{
  //       return {label:item,key:(index+1).toString()}
  //     })
  //     setItems(messages)
  //   }
  //   getInitMess()
  // },[])
  //给下拉列表添加内容
  const items: MenuProps['items'] = [
    {
      label: '论文的研究问题是什么？',
      key: '1',
    },
    {
      label: '论文中使用了哪些研究方法？',
      key: '2',
    },
    {
      label: '论文的主要发现有哪些？',
      key: '3',
    },
    {
      label: '论文的结论是什么？',
      key: '4',
    },
    {
      label: '论文的研究结果对相关领域有何意义？',
      key: '5',
    },
    {
      label: '论文中有哪些重要的理论贡献？',
      key: '6',
    },
    {
      label: '论文的作者是如何定义研究问题的？',
      key: '7',
    },
    {
      label: '论文的研究局限性是什么？',
      key: '8',
    },
    {
      label: '论文中有哪些关键的数据或统计结果？',
      key: '9',
    },
    {
      label: '论文的研究结果对实践有何启示？',
      key: '10',
    },
  ];
  //选择下拉列表里的一项，名字只能叫onClick?改了后就会报错
  const onClick: MenuProps['onClick'] = ({key}) => {
    console.log("items:" + JSON.stringify(items))
    console.log("key:" + key)
    const itemWithKey= items?.find(menuItem => menuItem!.key === key) as menuType;
    // 如果找到了，打印 label 属性
    if (itemWithKey) {
      //message.info(`Click on item ${itemWithKey.label}`);
      proChatRef.current!.sendMessage(itemWithKey.label);

    } else {
      console.log('没有找到为key的项');
    }
  };
  const handleStream = async (inputMessages) => {
    try {
      // const res = await getMessages(JSON.stringify({ question: inputMessages[inputMessages.length - 1]?.content }))
      const res = await getMessages(JSON.stringify({ question: inputMessages[inputMessages.length - 1]?.content, 
        paper_id:[paperId]}))
      
      // // 确保响应体是ReadableStream
      if (!res.body) {
        throw new Error('Response body is not a ReadableStream');
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();

      const readableStream = new ReadableStream({
        async pull(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }
            const chunkText = decoder.decode(value, { stream: true });
            const chunks = chunkText.split('\n\n').map((chunk) => {
              const match = chunk.match(/data: (.*)/);
              if (match) {
                const data = match[1];
                return data;
              }
              return null;
            }).filter((chunk) => chunk !== null);
            
            for (const chunk of chunks) {
              console.log("chunk:" + chunk)
              if (chunk === '[DONE]') {
                controller.close();
                return; // 退出pull函数
              }
              const data_parse = JSON.parse(chunk!);
              if ("error" in data_parse) {
                controller.enqueue(encoder.encode(data_parse.error));
                // controller.close();
                // return; // 退出pull函数
              } else {
                controller.enqueue(encoder.encode(data_parse.content)); // 只发送有效消息内容
              }
            }
          }
        },
        cancel(err) {
          console.error('ReadableStream cancelled', err);
        },
      });
  
      return new Response(readableStream);
    } catch (error) {
      console.error("请求或处理流数据时发生错误", error);
      return new Response("请求或处理流数据时发生错误Error: " + error);
    }
  };

  return (
    <ProChat
      style={{ height: "100%", width: "100%",paddingBottom:"10px",background: theme.colorBgLayout }}
      request={handleStream}
      chatRef={proChatRef}
      actions={{
        render: (defaultDoms) => {
          return [
            <Dropdown menu={{ items, onClick}}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  推荐问题参考
                </Space>
              </a>
            </Dropdown>,
              ...defaultDoms,
          ];
        },
        flexConfig: {
          gap: 24,
          direction: 'horizontal',
          justify: 'space-between',
        },
      }}
    />
  );
};

export default ChatComponent;