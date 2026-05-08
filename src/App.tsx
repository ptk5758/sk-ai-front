import { useActionState } from 'react'
import Title from './components/Title'
async function reducerAction(prev: { foo: string }, formData: FormData) {
    const value = await new Promise((resolve, reject) => {
        setTimeout(() => resolve(formData.get('message')), 1000)
    })
    return {
        ...prev,
        foo: prev.foo + value,
    }
}
function App() {
    const [state, action, pending] = useActionState(reducerAction, { foo: '' })
    return (
        <div>
            <Title title="냉장고 관리 Agent" />
            <h2>{pending}</h2>
            <h3>{state.foo}</h3>
            <form action={action}>
                {pending && <p>전송중...</p>}
                <input name="message" />
                <button type="submit">전송</button>
            </form>
        </div>
    )
}

export default App
