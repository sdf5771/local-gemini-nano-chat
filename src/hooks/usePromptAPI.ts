import { useEffect, useRef, useState } from "react";

// Chrome Prompt API 타입 정의
declare global {
    interface Window {
        LanguageModel?: {
            availability(): Promise<string>;
            create(options?: Record<string, unknown>): Promise<LanguageModelSession>;
        };
    }
    const LanguageModel: {
        availability(): Promise<string>;
        create(options?: Record<string, unknown>): Promise<LanguageModelSession>;
    };
}

interface LanguageModelSession {
    promptStreaming(input: string): Promise<string>;
    destroy(): void;
}

interface IModelLoadState {
    isLoading: boolean;
    loaded: number;
    error: Error | null;
}

function usePromptAPI(){
    const sessionRef = useRef<LanguageModelSession | null>(null);
    const [isPromptAPISupported, setIsPromptAPISupported] = useState(false);
    const [modelLoadState, setModelLoadState] = useState<IModelLoadState>({
        isLoading: false,
        loaded: 0,
        error: null,
    })

    useEffect(() => {
        if(sessionRef.current) return;

        const initializePromptAPI = async () => {
            if('LanguageModel' in self) {
                setIsPromptAPISupported(true);

                try {
                    const availability = await LanguageModel.availability();
                    console.log('[usePromptAPI] LanguageModel availability:', availability);

                    if(availability === 'unavailable') {
                        setModelLoadState({
                            isLoading: false,
                            loaded: 0,
                            error: new Error('LanguageModel is unavailable'),
                        })
                        return
                    }
                    
                    sessionRef.current = await LanguageModel.create({
                        monitor(m: any){
                            m.addEventListener('downloadprogress', (event: any) => {
                                console.log('event ', event);
                                setModelLoadState({
                                    isLoading: true,
                                    loaded: event.loaded * 100,
                                    error: null,
                                });
                            })
                        }
                    });

                    setModelLoadState({
                        isLoading: false,
                        loaded: 100,
                        error: null,
                    });
                } catch(error) {
                    console.error(error);
                    if(error instanceof Error) {
                        setModelLoadState({
                            isLoading: false,
                            loaded: 0,
                            error: error,
                        })
                    }
                }
            }
        };

        initializePromptAPI();
    }, [sessionRef.current])
    

    return {
        modelSession: sessionRef.current,
        isPromptAPISupported,
        modelLoadState
    }

}

export default usePromptAPI;