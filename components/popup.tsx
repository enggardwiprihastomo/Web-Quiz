
interface IButton {
    label: string
    action: () => void
}

interface IProps {
    message: string
    buttons: IButton[]
    refOutside: any
}

function Popup({ message, buttons, refOutside }: IProps) {
    return (
        <section className="popup flex centerX centerY">
            <div ref={refOutside}>
                <p>{message}</p>
                <div>
                    {buttons.map((button, idx) => (
                        <button key={`btn-popup-${idx}`} onClick={button.action}>{button.label}</button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Popup