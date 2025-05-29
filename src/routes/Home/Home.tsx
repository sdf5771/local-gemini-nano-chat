import { usePromptAPI } from "../../hooks";

function Home() {
  const { modelSession, isPromptAPISupported, modelLoadState } = usePromptAPI();

  console.log('[Home] modelSession', modelSession);
  console.log('[Home] isPromptAPISupported', isPromptAPISupported);
  console.log('[Home] modelLoadState', modelLoadState);

  return (
    <main>
      
    </main>
  )
}

export default Home;