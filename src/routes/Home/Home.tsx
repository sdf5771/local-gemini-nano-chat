import { useState } from "react";
import { usePromptAPI } from "../../hooks";
import {BlurryBlob} from "@/components/animata/background";
import {AnimatedGradientText, TypingText} from "@/components/animata/text";
import {ArrowButton} from "@/components/animata/button";
import { MessageBox } from "@/components/chat";

type TMessage = {
  message: string;
  isUser: boolean;
  isStreaming?: boolean;
}

function Home() {
  const { modelSession, isPromptAPISupported, modelLoadState } = usePromptAPI();
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSendMessage = async (userMessage: string) => {
    if(userMessage.trim() === "" || isGenerating) return;

    // 사용자 메시지 추가
    const newMessages = [...messages, { message: userMessage, isUser: true }];
    setMessages(newMessages);
    setTextAreaValue("");
    setIsGenerating(true);

    // AI 응답을 위한 빈 메시지 추가 (스트리밍 표시용)
    const aiMessageIndex = newMessages.length;
    setMessages([...newMessages, { message: "", isUser: false, isStreaming: true }]);

    try {
      const stream = await modelSession?.promptStreaming(userMessage);
      
      if (stream) {
        let accumulatedResponse = '';
        let previousChunk = '';

        // Chrome Prompt API의 스트리밍 방식에 맞게 처리
        // 각 청크는 누적된 전체 응답이므로, 이전 청크와의 차이만 추출
        for await (const chunk of stream) {
          const newChunk = chunk.startsWith(previousChunk) 
            ? chunk.slice(previousChunk.length) 
            : chunk;
          
          accumulatedResponse += newChunk;
          previousChunk = chunk;
          
          // 실시간으로 메시지 업데이트
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            updatedMessages[aiMessageIndex] = {
              message: accumulatedResponse,
              isUser: false,
              isStreaming: true
            };
            return updatedMessages;
          });
        }

        // 스트리밍 완료 후 최종 상태로 변경
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          updatedMessages[aiMessageIndex] = {
            message: accumulatedResponse,
            isUser: false,
            isStreaming: false
          };
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('[Home] Error sending message:', error);
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        updatedMessages[aiMessageIndex] = {
          message: 'Error sending message',
          isUser: false,
          isStreaming: false
        };
        return updatedMessages;
      });
    } finally {
      setIsGenerating(false);
    }
  }

  console.log('[Home] modelSession', modelSession);
  console.log('[Home] isPromptAPISupported', isPromptAPISupported);
  console.log('[Home] modelLoadState', modelLoadState);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen w-screen">
      <BlurryBlob className="absolute top-50 left-100 translate-x-[-50%] translate-y-[-50%]" firstBlobColor="bg-purple-400" secondBlobColor="bg-blue-400" />
      <BlurryBlob className="absolute top-100 left-200 translate-x-[-50%] translate-y-[-50%]" firstBlobColor="bg-red-400" secondBlobColor="bg-purple-400" />
      <section className="absolute top-0 left-0 flex flex-col item-center justify-center w-full h-full">
        <div className="flex flex-col w-full h-full">
          <div className="mt-20 flex flex-col items-center justify-center">
            <AnimatedGradientText className="text-4xl font-bold">Local Gemini Nano Chat</AnimatedGradientText>
            <div className="mt-5 min-w-96 max-w-400 rounded-sm bg-gray-800 px-4 py-2 text-yellow-400 shadow-lg">
              <TypingText className="w-160 text-center" text="> Talk to AI built into your device that doesn't have the risk of personal information leakage." />
            </div>
          </div>
          <div className="mt-20 flex flex-col w-full h-full pl-10 pr-10 gap-10 overflow-y-auto overflow-x-hidden">
            {
              messages.map((message, index) => (
                <MessageBox 
                  key={index} 
                  message={message.message} 
                  isUser={message.isUser} 
                  isStreaming={message.isStreaming}
                />
              ))
            }
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex justify-center bg-gray-100 w-full h-[100px] gap-10 p-4 rounded-t-lg">
              <textarea 
                onChange={(event) => setTextAreaValue(event.target.value)} 
                value={textAreaValue} 
                className="w-full h-[calc(100%-30px)] outline-none resize-none" 
                placeholder={isGenerating ? "AI가 응답 중입니다..." : "메시지를 입력하세요..."} 
                disabled={isGenerating}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey && !isGenerating) {
                    event.preventDefault();
                    handleSendMessage(textAreaValue);
                  }
                }}
              />
              {/* <div className="mt-2">
                <ArrowButton text="Send" onClick={(event:React.MouseEvent<HTMLButtonElement>) => {console.log(event)}} />
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home;