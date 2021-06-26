
interface IProps {
    value: string
    selectedMenu: string
    state: string
    selected: string
    setState: (value: any) => void
    setSelected: (value: string) => void
}

function Option({ value, selectedMenu, state, setState, selected, setSelected }: IProps) {
    return (
        <li className="flex">
            <input type="radio" name="answer" id={`answer-${value}`} checked={selected === value ? true : false} data-color={selectedMenu.toLowerCase()} onChange={() => setSelected(value)} />
            <label htmlFor={`answer-${value}`} data-label={value.toUpperCase()} />
            <input type="text" value={state} onChange={e => setState(prev => {
                return { ...prev, [value]: e.target.value }
            })} />
        </li>
    )
}

export default Option