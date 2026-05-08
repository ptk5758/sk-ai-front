import { useActionState } from 'react'
import Title from './components/Title'

type ChatItem = {
    message: string
    owner: 'AI' | 'HUMAN'
}

type ChatState = {
    chatList: ChatItem[]
}

function getString(formDataEntryValue: FormDataEntryValue | null): string {
    return typeof formDataEntryValue === 'string' ? formDataEntryValue : ''
}

function chatRequest(message: string) {
    return fetch('http://127.0.0.1:8000/ingredient/agent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    }).then((res) => res.json())
}

async function formActionReducer(prev: ChatState, formData: FormData): Promise<ChatState> {
    const message = getString(formData.get('message')) ?? ''
    const response = await chatRequest(message)
    const messages: { id: string; content: string; [key: string]: any }[] = response.messages
    return {
        ...prev,
        chatList: [...prev.chatList, ...messages.map<ChatItem>((item) => ({ message: item.content, owner: 'HUMAN' }))],
    }
    // console.log(response)
    // return {
    //     ...prev,
    //     chatList: [...prev.chatList, { message: message, owner: 'HUMAN' }],
    // }
}
function App() {
    const [state, action, pending] = useActionState(formActionReducer, { chatList: [] })

    return (
        <div>
            <Title title="냉장고 관리 Agent" />
            <ul>
                {state.chatList.length > 0 &&
                    state.chatList.map((chat, index) => {
                        return (
                            <li key={index}>
                                {chat.owner}:{chat.message}
                            </li>
                        )
                    })}
            </ul>
            <form action={action}>
                <input name="message" />
                <button>전송</button>
                {pending && <p>전송중..</p>}
            </form>
        </div>
    )
}

export default App
