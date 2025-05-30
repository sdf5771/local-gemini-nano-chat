interface IMessageBoxProps {
    message: string;
    isUser: boolean;
    isStreaming?: boolean;
}

function MessageBox({ message, isUser, isStreaming = false }: IMessageBoxProps) {
    return (
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} rounded-sm p-2 ${isUser ? 'bg-gray-100' : 'bg-gray-800'}`}>
                <span className={`text-sm ${isUser ? 'text-gray-500' : 'text-gray-100'}`}>
                    {message}
                    {isStreaming && !isUser && (
                        <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse">|</span>
                    )}
                </span>
            </div>
        </div>
    )
}

export default MessageBox;